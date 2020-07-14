/**
 * @license
 * Copyright 2019 Balena Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createHash, Hash } from 'crypto';
import { debug as debug$ } from 'debug';
import { read } from 'fs';
import { Readable } from 'stream';

import { BlockMap } from './blockmap';
import { Chunk } from './chunk';
import { Range } from './range';
import { ReadRange, ReadRangeError } from './read-range';

const debug = debug$('blockmap:readstream');

export type ReadFunction = (
	buffer: Buffer,
	offset: number,
	length: number,
	position: number,
) => Promise<{ bytesRead: number; buffer: Buffer }>;

export class ReadStream extends Readable {
	/** Range being currently processed */
	public currentRange?: ReadRange;
	/** Number of block map ranges read */
	public rangesRead = 0;
	/** Number of block map ranges verified */
	public rangesVerified = 0;
	/** Number of blocks read */
	public blocksRead = 0;
	/** Number of bytes read */
	public bytesRead = 0;
	/** Current offset in bytes */
	public position = 0;
	/** Hash stream to calculate range checksums */
	private _hash?: Hash;
	/** Ranges to be read from the image */
	public ranges: ReadRange[];
	private readFn: ReadFunction;

	constructor(
		fdOrReadFn: number | ReadFunction,
		public readonly blockMap: BlockMap,
		public readonly verify = true,
		public readonly generateChecksums = false,
		public readonly start = 0,
		public readonly end = Infinity,
		public readonly chunkSize = 64 * 1024,
	) {
		super({ objectMode: true });
		if (verify && generateChecksums) {
			throw new Error(
				'verify and generateChecksums options are mutually exclusive',
			);
		}
		if (start < 0) {
			throw new Error('Start must not be negative');
		}

		if (start > end) {
			throw new Error('Start must be less or equal to end');
		}

		if (verify || generateChecksums) {
			this._hash = createHash(blockMap.checksumType);
		}

		this.ranges = this._prepareRanges();
		if (typeof fdOrReadFn === 'number') {
			this.readFn = (
				buf: Buffer,
				offset: number,
				length: number,
				position: number,
			) => {
				return new Promise((resolve, reject) => {
					read(
						fdOrReadFn,
						buf,
						offset,
						length,
						position,
						(error: Error | null, bytesRead: number, buffer: Buffer) => {
							if (error) {
								reject(error);
							} else {
								resolve({ bytesRead, buffer });
							}
						},
					);
				});
			};
		} else {
			this.readFn = fdOrReadFn;
		}
	}

	/**
	 * Preprocess the `blockMap`'s ranges into byte-ranges
	 * with respect to the `start` offset, and an `offset`
	 * for tracking chunked range reading
	 */
	private _prepareRanges(): ReadRange[] {
		return this.blockMap.ranges
			.map(
				(range: Range): ReadRange => {
					const readRange = new ReadRange(range, this.blockMap.blockSize);

					// Account for readstream's start offset
					readRange.start += this.start;
					readRange.end += this.start;

					return readRange;
				},
			)
			.filter((readRange) => {
				return readRange.end <= this.end + this.start;
			});
	}

	/**
	 * Verify a fully read range's checksum against
	 * the range's checksum from the blockmap
	 */
	private _verifyRange() {
		if (this.currentRange === undefined || this._hash === undefined) {
			return;
		}
		const digest = this._hash.digest('hex');
		debug('verify:checksum', this.currentRange.checksum);
		debug('verify:digest  ', digest);
		this._hash = createHash(this.blockMap.checksumType);
		if (this.verify && this.currentRange.checksum !== digest) {
			const error = new ReadRangeError(
				`Invalid checksum for range [${this.currentRange.startLBA},${this.currentRange.endLBA}], bytes ${this.currentRange.start}-${this.currentRange.end}`,
				this.currentRange,
				digest,
			);
			this.emit('error', error);
		}
		if (this.generateChecksums) {
			this.currentRange.range.checksum = digest;
		} else {
			this.rangesVerified++;
		}
	}

	/**
	 * Read the current range (or a chunk thereof),
	 * update state and emit the read block
	 */
	private async _readBlock() {
		if (this.currentRange === undefined) {
			return;
		}
		const length = Math.min(
			this.currentRange.length - this.currentRange.offset,
			this.chunkSize,
		);
		const position = this.currentRange.start + this.currentRange.offset;
		const chunk = new Chunk(Buffer.allocUnsafe(length), position);

		debug('read-block:position', position);
		debug('read-block:length', length);

		try {
			const { bytesRead } = await this.readFn(
				chunk.buffer,
				0,
				length,
				position,
			);
			if (bytesRead !== length) {
				throw new Error(`Bytes read mismatch: ${bytesRead} != ${length}`);
			}
			this.currentRange.offset += bytesRead;

			this.blocksRead += bytesRead / this.blockMap.blockSize;
			this.bytesRead += bytesRead;
			this.position += bytesRead;

			debug('read-block:blocksRead', this.blocksRead);

			// Feed the hash if we're verifying
			if (this._hash !== undefined) {
				this._hash.update(chunk.buffer);
			}

			this.push(chunk);
		} catch (error) {
			this.emit('error', error);
		}
	}

	/**
	 * Advance to next the Range if there is one then read a block;
	 * else end the stream;
	 * @see https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream
	 */
	private async _advanceRange() {
		if (this.ranges.length > 0) {
			this.currentRange = this.ranges.shift();
			this.rangesRead++;
			debug('read:range %O', this.currentRange);
			await this._readBlock();
		} else {
			this.push(null);
		}
	}

	/**
	 * Initiate a new read, advancing the range if necessary,
	 * and verifying checksums, if enabled
	 * @see https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream
	 */
	public async _read() {
		if (this.currentRange === undefined) {
			await this._advanceRange();
		} else if (this.currentRange.offset === this.currentRange.length) {
			this._verifyRange();
			await this._advanceRange();
		} else {
			await this._readBlock();
		}
	}
}

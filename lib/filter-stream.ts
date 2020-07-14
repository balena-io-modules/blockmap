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
import { Transform } from 'stream';

import { BlockMap } from './blockmap';
import { Chunk } from './chunk';
import { ReadRange, ReadRangeError } from './read-range';

const debug = debug$('blockmap:filterstream');

export class FilterStream extends Transform {
	/** Number of block map ranges read */
	public rangesRead = 0;
	/** Number of block map ranges verified */
	public rangesVerified = 0;
	/** Number of blocks read */
	public blocksRead = 0;
	/** Number of bytes read */
	public bytesRead = 0;
	/** Number of bytes written */
	public blocksWritten = 0;
	/** Number of bytes written */
	public bytesWritten = 0;
	/** Current offset in bytes */
	public position = 0;
	/** @type {Array<Object>} Ranges */
	public ranges: ReadRange[];
	/** Range being currently processed */
	public currentRange?: ReadRange;
	/** Hash stream to calculate range checksums */
	private _hash?: Hash;
	private _chunks: Buffer[] = [];
	private _bytes = 0;

	constructor(
		public readonly blockMap: BlockMap,
		public readonly verify = true,
		public readonly generateChecksums = false,
		public readonly chunkSize = 64 * 1024,
	) {
		super({ readableObjectMode: true });
		if (verify && generateChecksums) {
			throw new Error(
				'verify and generateChecksums options are mutually exclusive',
			);
		}
		this.ranges = this._getByteRangesFromBlockMap();
		this.currentRange = this.ranges.shift();
		debug('range:next', this.currentRange);
		if (verify || generateChecksums) {
			this._hash = createHash(this.blockMap.checksumType);
		}
	}

	/**
	 * Preprocess the `blockMap`'s ranges into byte-ranges
	 * with respect to the `start` offset, and an `offset`
	 * for tracking chunked range reading
	 */
	private _getByteRangesFromBlockMap() {
		return this.blockMap.ranges.map((range) => {
			return new ReadRange(range, this.blockMap.blockSize);
		});
	}

	/**
	 * Verify a fully read range's checksum against
	 * the range's checksum from the blockmap
	 * or calculate the range's checksum and update the blockmap
	 * if options.generateChecksums is true.
	 */
	private _verifyRange() {
		if (this._hash === undefined || this.currentRange === undefined) {
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
			return;
		}
		if (this.generateChecksums) {
			this.currentRange.range.checksum = digest;
		} else {
			this.rangesVerified++;
		}
	}

	/**
	 * Determine whether a chunk is in the current range
	 */
	private _rangeInChunk(chunk: Buffer): boolean {
		if (this.currentRange === undefined) {
			return false;
		}
		const rangeStart = this.currentRange.start + this.currentRange.offset;

		const isRangeInChunk =
			rangeStart >= this.position && rangeStart < this.position + chunk.length;

		debug('range-in-chunk', isRangeInChunk);

		return isRangeInChunk;
	}

	/**
	 * Chunk a given input buffer into blocks
	 * matching the blockSize and advance the
	 * current range, if necessary
	 */
	private _transformBlock(chunk: Buffer, next: () => void) {
		let start = 0;
		let end = 0;
		let length = 0;
		let block: Chunk;

		while (this.currentRange && this._rangeInChunk(chunk)) {
			start =
				this.currentRange.start + this.currentRange.offset - this.position;
			end = start + this.currentRange.length - this.currentRange.offset;

			debug('slice', start, '-', end);

			// Cut the block, and add position & address to it
			block = new Chunk(
				chunk.slice(start, end),
				this.currentRange.start + this.currentRange.offset,
			);

			// Make sure we don't emit buffers not matching
			// the blockSize, in case the range's end is not in the current chunk
			if (end > chunk.length) {
				length = chunk.length - start;
				debug('chunk:partial', length);
				if (length % this.blockMap.blockSize !== 0) {
					debug('chunk:buffer', 'length < block size');
					this._chunks.push(block.buffer);
					this._bytes += block.length;
					this.position += chunk.length - block.length;
					return process.nextTick(next);
				}
			}

			// Keep track of where we are within the current range
			this.currentRange.offset += block.length;

			// Advance counters
			this.bytesWritten += block.length;
			this.blocksWritten += block.length / this.blockMap.blockSize;

			// Emit the cut block
			debug(
				'push',
				block.position,
				block.position / this.blockMap.blockSize,
				block,
			);
			this.push(block);

			if (this._hash !== undefined) {
				this._hash.update(block.buffer);
			}

			// Once we've read a complete range,
			// verify it and move to the next range
			if (this.currentRange.length === this.currentRange.offset) {
				this._verifyRange();
				this.rangesRead++;
				this.currentRange = this.currentRange = this.ranges.shift();
				debug('range:next', this.currentRange);
			}
		}

		this.position += chunk.length;

		process.nextTick(next);
	}

	/** Transform input into block-sized chunks */
	public _transform(chunk: Buffer, _encoding: string, next: () => void) {
		debug('position', this.position);
		debug('chunk', chunk.length, chunk);

		this.bytesRead += chunk.length;
		this.blocksRead += chunk.length / this.blockMap.blockSize;

		// We've run out of ranges; ignore everything
		if (this.currentRange === undefined) {
			debug('no current range');
			this.position += chunk.length;
			return process.nextTick(next);
		}

		// If this chunk is not in our range at all, skip it
		if (!this._rangeInChunk(chunk)) {
			debug('chunk:ignore');
			this.position += chunk.length;
			return process.nextTick(next);
		}

		// If we have buffered up chunks,
		// and they don't exceed the highWaterMark yet,
		// buffer this chunk as well, and wait for the next chunk
		if (this._bytes && this._bytes < this.chunkSize) {
			debug('chunk:buffer', 'not enough bytes');
			this._chunks.push(chunk);
			this._bytes += chunk.length;
			return process.nextTick(next);
		}

		// If we have enough buffered chunks, concat & emit them
		if (this._bytes) {
			debug('chunk:concat', this._bytes + chunk.length);
			this._chunks.push(chunk);
			this._bytes += chunk.length;
			chunk = Buffer.concat(this._chunks, this._bytes);
			this._chunks = [];
			this._bytes = 0;
		}

		this._transformBlock(chunk, next);
	}

	/**
	 * Flush out any unprocessed chunks from
	 * the internal buffer once the stream is being ended
	 */
	public _flush(done: () => void) {
		if (this._bytes) {
			const chunk = Buffer.concat(this._chunks, this._bytes);
			this._chunks = [];
			this._bytes = 0;
			this._transformBlock(chunk, done);
		} else {
			done();
		}
	}
}

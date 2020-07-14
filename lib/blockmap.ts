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

import { createHash } from 'crypto';
import { js2xml } from 'xml-js';

import { parse } from './parse';
import { Range } from './range';

function xmlTag(tag: string, text: string): string {
	return js2xml({ [tag]: { _text: text } }, { compact: true });
}

export interface BlockMapOptionsRange {
	start: number;
	end: number;
	checksum: string;
}

export interface BlockMapOptions {
	/** @type {String} format version */
	version?: string;
	/** @type {Number} size of the image in bytes */
	imageSize?: number;
	/** @type {Number} size of a block in bytes */
	blockSize?: number;
	/** @type {Number} total number of blocks in image */
	blocksCount?: number;
	/** @type {Number} number of mapped blocks */
	mappedBlocksCount?: number;
	/** @type {String} bmap file checksum */
	checksum?: string;
	/** @type {Number} checksum algorithm */
	checksumType?: string;
	/** @type {Number} block ranges */
	ranges?: BlockMapOptionsRange[];
}

export class BlockMap {
	/** Supported .bmap format versions */
	public static versions = ['1.2', '1.3', '1.4', '2.0'];
	public version?: string;
	public imageSize: number;
	public blockSize: number;
	public blocksCount: number;
	public mappedBlocksCount: number;
	public checksum?: string;
	public checksumType: string;
	public ranges: Range[];

	constructor(options: BlockMapOptions = {}) {
		this.version = options.version || '2.0';
		this.imageSize = options.imageSize || 0;
		this.blockSize = options.blockSize || 4096;
		this.blocksCount = options.blocksCount || 0;
		this.mappedBlocksCount = options.mappedBlocksCount || 0;
		this.checksum = options.checksum;
		this.checksumType = options.checksumType || 'sha256';
		this.ranges = (options.ranges || []).map(Range.from);
	}

	/**
	 * Calculate the bmap file's checksum and inject it
	 */
	private injectChecksum(bmap: string): string {
		const checksum = this.checksum || '';
		const zerofill = xmlTag('BmapFileChecksum', checksum.replace(/./g, '0'));
		const value = bmap.replace(xmlTag('BmapFileChecksum', checksum), zerofill);
		const digest = createHash(this.checksumType).update(value).digest('hex');
		return value.replace(zerofill, xmlTag('BmapFileChecksum', digest));
	}

	/** Create a block map from its JSON representation */
	public static fromJSON(data: string | unknown) {
		const options = typeof data === 'string' ? JSON.parse(data) : data;
		return new BlockMap(options);
	}

	/** Stringify a block map into .bmap format */
	public toString(): string {
		const ranges2 = this.ranges.map((range) => {
			const blockRange =
				range.start !== range.end ? range.start + '-' + range.end : range.start;
			return {
				_attributes: { chksum: range.checksum },
				_text: blockRange,
			};
		});
		const data2 = {
			_declaration: {
				_attributes: {
					version: '1.0',
					encoding: 'UTF-8',
				},
			},
			bmap: {
				_attributes: { version: '2.0' },
				ImageSize: { _text: this.imageSize },
				BlockSize: { _text: this.blockSize },
				BlocksCount: { _text: this.blocksCount },
				MappedBlocksCount: { _text: this.mappedBlocksCount },
				ChecksumType: { _text: this.checksumType },
				BmapFileChecksum: { _text: this.checksum },
				BlockMap: { Range: ranges2 },
			},
		};
		const bmap2 = js2xml(data2, { compact: true, spaces: 2 }) + '\n';
		return this.injectChecksum(bmap2);
	}

	/** Parse a .bmap file */
	public static parse(value: string | Buffer, verify = true): BlockMap {
		return new BlockMap(parse(value, verify));
	}
}

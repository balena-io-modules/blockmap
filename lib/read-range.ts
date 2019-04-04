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

import { Range } from './range';

export class ReadRange {
	/** @type {String} Range checksum */
	public checksum?: string;
	/** Range start offset in bytes */
	public start: number;
	/** Range end offset in bytes */
	public end: number;
	/** Range length in bytes */
	public length: number;
	/** Range start LBA */
	public startLBA: number;
	/** Range end LBA */
	public endLBA: number;
	/** Byte offset within range */
	public offset = 0;

	constructor(public range: Range, blockSize: number) {
		this.checksum = range.checksum;
		this.start = range.start * blockSize;
		this.end = (range.end + 1) * blockSize;
		this.length = range.length * blockSize;
		this.startLBA = range.start;
		this.endLBA = range.end;
	}
}

export class ReadRangeError extends Error {
	constructor(
		message: string,
		public readonly range: ReadRange,
		public checksum?: string,
	) {
		super(message);
	}
}

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

import { BlockMapOptionsRange } from './blockmap';

export class Range {
	constructor(public start = 0, public end = 0, public checksum?: string) {
		// start and end are inclusive
	}

	/**
	 * Create a BlockMap.Range from a given value
	 */
	public static from(value: BlockMapOptionsRange): Range {
		return new Range(value.start, value.end, value.checksum);
	}

	get length() {
		// NOTE: Because a blockmap's range ends are inclusive,
		// we need to add a block to the LBAs here
		return this.end - this.start + 1;
	}

	set length(value) {
		// NOTE: Because a blockmap's range ends are inclusive,
		// we need to remove a block from the end here
		this.end = this.start + value - 1;
	}
}

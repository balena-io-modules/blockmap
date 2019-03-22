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

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

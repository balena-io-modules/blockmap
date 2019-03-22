export class Chunk {
	constructor(
		public readonly buffer: Buffer,
		public readonly position: number,
	) {}

	get length() {
		return this.buffer.length;
	}
}

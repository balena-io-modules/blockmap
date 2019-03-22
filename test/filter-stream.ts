import * as assert from 'assert';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

import { BlockMap, Chunk, FilterStream, Range, ReadRangeError } from '../lib';

describe('BlockMap.FilterStream', () => {
	it('should only emit mapped blocks', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		const readStream = createReadStream(filename);
		const transform = new FilterStream(blockMap);
		let blocksCount = 0;

		await new Promise((resolve, reject) => {
			readStream
				.pipe(transform)
				.on('data', (block: Chunk) => {
					blocksCount += block.length / blockMap.blockSize;
					assert.equal(
						block.length % blockMap.blockSize,
						0,
						'Invalid block size: ' + block.length,
					);
					assert.ok(block.position !== undefined, 'block position missing');
				})
				.once('error', reject)
				.once('end', () => {
					assert.equal(
						transform.blocksWritten,
						blockMap.mappedBlocksCount,
						'blocksWritten mismatch',
					);
					assert.equal(
						transform.bytesRead,
						blockMap.imageSize,
						'bytesRead mismatch',
					);
					assert.equal(
						transform.bytesWritten,
						blockMap.mappedBlocksCount * blockMap.blockSize,
						'bytesWritten mismatch',
					);
					assert.equal(
						transform.rangesRead,
						blockMap.ranges.length,
						'rangesRead mismatch',
					);
					assert.equal(
						transform.rangesVerified,
						transform.rangesRead,
						'rangesVerified mismatch',
					);
					assert.equal(
						blocksCount,
						blockMap.mappedBlocksCount,
						'actual blocks read mismatch',
					);
					resolve();
				});
		});
	});

	it('should calculate range checksums', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		const checksumlessBlockMap = new BlockMap(require('./data/version-2.0'));
		checksumlessBlockMap.ranges.forEach((range: Range) => {
			delete range.checksum;
		});
		const readStream = createReadStream(filename);
		const transform = new FilterStream(checksumlessBlockMap, false, true);

		await new Promise((resolve, reject) => {
			readStream
				.pipe(transform)
				.on('data', () => {
					// drain
				})
				.once('error', reject)
				.once('end', () => {
					assert.deepEqual(
						checksumlessBlockMap.ranges,
						blockMap.ranges,
						'calculated checksums do not match the blockmap',
					);
					resolve();
				});
		});
	});

	it('should only emit properly sized blocks', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		const readStream = createReadStream(filename, { highWaterMark: 123 });
		const transform = new FilterStream(blockMap);
		let blocksCount = 0;

		await new Promise((resolve, reject) => {
			readStream
				.pipe(transform)
				.on('data', (block: Chunk) => {
					blocksCount += block.length / blockMap.blockSize;
					assert.equal(
						block.length % blockMap.blockSize,
						0,
						'Invalid block size: ' + block.length,
					);
					assert.ok(block.position !== undefined, 'block position missing');
				})
				.once('error', reject)
				.once('end', () => {
					assert.equal(
						transform.blocksWritten,
						blockMap.mappedBlocksCount,
						'blocksWritten mismatch',
					);
					assert.equal(
						transform.bytesRead,
						blockMap.imageSize,
						'bytesRead mismatch',
					);
					assert.equal(
						transform.bytesWritten,
						blockMap.mappedBlocksCount * blockMap.blockSize,
						'bytesWritten mismatch',
					);
					assert.equal(
						transform.rangesRead,
						blockMap.ranges.length,
						'rangesRead mismatch',
					);
					assert.equal(
						transform.rangesVerified,
						transform.rangesRead,
						'rangesVerified mismatch',
					);
					assert.equal(
						blocksCount,
						blockMap.mappedBlocksCount,
						'actual blocks read mismatch',
					);
					resolve();
				});
		});
	});

	it('should position blocks correctly', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		const readStream = createReadStream(filename, { highWaterMark: 123 });
		const transform = new FilterStream(blockMap);
		let blocksCount = 0;
		let firstBlock = true;

		await new Promise((resolve, reject) => {
			readStream
				.pipe(transform)
				.on('data', (block: Chunk) => {
					blocksCount += block.length / blockMap.blockSize;
					assert.equal(
						block.length % blockMap.blockSize,
						0,
						'Invalid block size: ' + block.length,
					);
					assert.ok(block.position !== undefined, 'block position missing');
					if (firstBlock) {
						firstBlock = false;
					} else {
						assert.ok(block.position > 0, 'block position is zero');
					}
				})
				.once('error', reject)
				.once('end', () => {
					assert.equal(
						transform.blocksWritten,
						blockMap.mappedBlocksCount,
						'blocksWritten mismatch',
					);
					assert.equal(
						transform.bytesRead,
						blockMap.imageSize,
						'bytesRead mismatch',
					);
					assert.equal(
						transform.bytesWritten,
						blockMap.mappedBlocksCount * blockMap.blockSize,
						'bytesWritten mismatch',
					);
					assert.equal(
						transform.rangesRead,
						blockMap.ranges.length,
						'rangesRead mismatch',
					);
					assert.equal(
						transform.rangesVerified,
						transform.rangesRead,
						'rangesVerified mismatch',
					);
					assert.equal(
						blocksCount,
						blockMap.mappedBlocksCount,
						'actual blocks read mismatch',
					);
					resolve();
				});
		});
	});

	context('disabled verification', () => {
		BlockMap.versions.forEach(v => {
			it(`v${v}: ignore invalid ranges`, async () => {
				const filename = join(__dirname, 'data', 'bmap.img');
				const bmapFile = join(
					__dirname,
					'data',
					'invalid',
					'range',
					`multiple-${v}.bmap`,
				);
				const blockMap = BlockMap.parse(readFileSync(bmapFile, 'utf8'));
				const readStream = createReadStream(filename);
				const transform = new FilterStream(blockMap, false);

				await new Promise((resolve, reject) => {
					readStream
						.pipe(transform)
						.on('data', (block: Chunk) => {
							assert.equal(
								block.length % blockMap.blockSize,
								0,
								'Invalid block size: ' + block.length,
							);
							assert.ok(block.position !== undefined, 'block position missing');
						})
						.on('error', reject)
						.on('end', resolve);
				});
			});
		});
	});

	context('single invalid range', () => {
		BlockMap.versions.forEach(v => {
			it(`v${v}: detect an invalid range`, async () => {
				const filename = join(__dirname, 'data', 'bmap.img');
				const bmapFile = join(
					__dirname,
					'data',
					'invalid',
					'range',
					`version-${v}.bmap`,
				);
				const blockMap = BlockMap.parse(readFileSync(bmapFile, 'utf8'));
				const readStream = createReadStream(filename);
				const transform = new FilterStream(blockMap);

				await new Promise((resolve, reject) => {
					readStream
						.pipe(transform)
						.on('data', (block: Chunk) => {
							assert.equal(
								block.length % blockMap.blockSize,
								0,
								'Invalid block size: ' + block.length,
							);
							assert.ok(block.position !== undefined, 'block position missing');
						})
						.on('error', (error: ReadRangeError) => {
							assert.ok(error instanceof Error, 'error not instance of Error');
							// The calculated checksum
							assert.ok(error.checksum, 'missing checksum');
							// The faulty range's data
							assert.strictEqual(
								error.range.startLBA,
								119,
								'incorrect range start',
							);
							assert.strictEqual(
								error.range.endLBA,
								133,
								'incorrect range end',
							);
							assert.ok(error.range.checksum, 'missing "faulty" checksum');
							resolve();
						})
						.on('end', () => {
							reject(new Error('Did not detect faulty range checksum'));
						});
				});
			});
		});
	});

	context('multiple invalid ranges', () => {
		BlockMap.versions.forEach(v => {
			it(`v${v}: detect invalid ranges`, async () => {
				const filename = join(__dirname, 'data', 'bmap.img');
				const bmapFile = join(
					__dirname,
					'data',
					'invalid',
					'range',
					`multiple-${v}.bmap`,
				);
				const blockMap = BlockMap.parse(readFileSync(bmapFile, 'utf8'));
				const readStream = createReadStream(filename);
				const transform = new FilterStream(blockMap, true);
				let hadErrors = 0;

				await new Promise(resolve => {
					readStream
						.pipe(transform)
						.on('data', (block: Chunk) => {
							assert.equal(
								block.length % blockMap.blockSize,
								0,
								'Invalid block size: ' + block.length,
							);
							assert.ok(block.position !== undefined, 'block position missing');
						})
						.on('error', (error: ReadRangeError) => {
							assert.ok(error instanceof Error, 'error not instance of Error');
							assert.ok(/^Invalid checksum for range/.test(error.message));
							hadErrors++;
							// NOTE: Because readable streams unpipe themselves if the dest
							// experiences an error, and there's no way to turn that off,
							// we have to re-pipe in the error handler to continue reading.
							// For details, see https://github.com/nodejs/node/blob/master/lib/_stream_readable.js#L572-L583
							readStream.pipe(transform);
						})
						.on('end', () => {
							assert.strictEqual(hadErrors, 3, 'not enough errors');
							resolve();
						});
				});
			});
		});
	});
});

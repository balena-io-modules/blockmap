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

import * as assert from 'assert';
import { openSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

import {
	BlockMap,
	Chunk,
	ReadRangeError,
	ReadStream,
	withOpenFile,
} from '../lib';

describe('BlockMap.ReadStream', () => {
	it('should read only mapped blocks', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(fd, blockMap);
			let byteCount = 0;

			await new Promise((resolve, reject) => {
				readStream
					.on('data', (block: Chunk) => {
						byteCount += block.length;
						assert.ok(block.position !== undefined, 'block position missing');
					})
					.once('error', reject)
					.once('end', () => {
						assert.equal(
							readStream.blocksRead,
							blockMap.mappedBlocksCount,
							'blocksRead mismatch',
						);
						assert.equal(
							readStream.bytesRead,
							blockMap.mappedBlocksCount * blockMap.blockSize,
							'bytesRead mismatch',
						);
						assert.equal(
							readStream.rangesRead,
							blockMap.ranges.length,
							'rangesRead mismatch',
						);
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						assert.equal(
							byteCount / blockMap.blockSize,
							blockMap.mappedBlocksCount,
							'actual blocks read mismatch',
						);
						resolve();
					});
			});
		});
	});

	it('should read last range entirely even if it is larger than the chunk size', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(
			require('./data/version-2.0-large-last-range'),
		);
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(fd, blockMap);
			let byteCount = 0;

			await new Promise((resolve, reject) => {
				readStream
					.on('data', (block: Chunk) => {
						byteCount += block.length;
						assert.ok(block.position !== undefined, 'block position missing');
					})
					.once('error', reject)
					.once('end', () => {
						assert.equal(
							readStream.blocksRead,
							blockMap.mappedBlocksCount,
							'blocksRead mismatch',
						);
						assert.equal(
							readStream.bytesRead,
							blockMap.mappedBlocksCount * blockMap.blockSize,
							'bytesRead mismatch',
						);
						assert.equal(
							readStream.rangesRead,
							blockMap.ranges.length,
							'rangesRead mismatch',
						);
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						assert.equal(
							byteCount / blockMap.blockSize,
							blockMap.mappedBlocksCount,
							'actual blocks read mismatch',
						);
						resolve();
					});
			});
		});
	});

	it('should generate range checksums', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		const checksumlessBlockMap = new BlockMap(require('./data/version-2.0'));
		checksumlessBlockMap.ranges.forEach((range) => {
			delete range.checksum;
		});
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(fd, checksumlessBlockMap, false, true);

			await new Promise((resolve, reject) => {
				readStream
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
	});

	it('should position blocks correctly', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(fd, blockMap);
			let blocksCount = 0;
			let firstBlock = true;

			await new Promise((resolve, reject) => {
				readStream
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
							readStream.rangesRead,
							blockMap.ranges.length,
							'rangesRead mismatch',
						);
						assert.equal(
							blocksCount,
							blockMap.mappedBlocksCount,
							'actual blocks read mismatch',
						);
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						resolve();
					});
			});
		});
	});

	it('should ignore path when given a file descriptor', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		const fd = openSync(filename, 'r');
		const readStream = new ReadStream(fd, blockMap);
		let byteCount = 0;

		await new Promise((resolve, reject) => {
			readStream
				.on('data', (block: Chunk) => {
					byteCount += block.length;
					assert.ok(block.position !== undefined, 'block position missing');
				})
				.once('error', reject)
				.once('end', () => {
					assert.equal(
						readStream.blocksRead,
						blockMap.mappedBlocksCount,
						'blocksRead mismatch',
					);
					assert.equal(
						readStream.bytesRead,
						blockMap.mappedBlocksCount * blockMap.blockSize,
						'bytesRead mismatch',
					);
					assert.equal(
						readStream.rangesRead,
						blockMap.ranges.length,
						'rangesRead mismatch',
					);
					assert.equal(
						readStream.rangesVerified,
						readStream.rangesRead,
						'rangesVerified mismatch',
					);
					assert.equal(
						byteCount / blockMap.blockSize,
						blockMap.mappedBlocksCount,
						'actual blocks read mismatch',
					);
					resolve();
				});
		});
	});

	it('should start reading at `start`, if specified', async () => {
		const filename = join(__dirname, '/data/padded-bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		let byteCount = 0;
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(fd, blockMap, true, false, 4096);

			await new Promise((resolve, reject) => {
				readStream
					.on('data', (block: Chunk) => {
						byteCount += block.length;
						assert.ok(block.position !== undefined, 'block position missing');
					})
					.once('error', reject)
					.once('end', () => {
						assert.equal(
							readStream.blocksRead,
							blockMap.mappedBlocksCount,
							'blocksRead mismatch',
						);
						assert.equal(
							readStream.bytesRead,
							blockMap.mappedBlocksCount * blockMap.blockSize,
							'bytesRead mismatch',
						);
						assert.equal(
							readStream.rangesRead,
							blockMap.ranges.length,
							'rangesRead mismatch',
						);
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						assert.equal(
							byteCount / blockMap.blockSize,
							blockMap.mappedBlocksCount,
							'actual blocks read mismatch',
						);
						resolve();
					});
			});
		});
	});

	it('should stop reading at `end`, if specified', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		let byteCount = 0;
		await withOpenFile(filename, async (fd) => {
			// This encompasses the first mapped range
			const readStream = new ReadStream(
				fd,
				blockMap,
				true,
				false,
				0,
				blockMap.blockSize * 2,
			);

			await new Promise((resolve, reject) => {
				readStream
					.on('data', (block: Chunk) => {
						byteCount += block.length;
						assert.ok(block.position !== undefined, 'block position missing');
					})
					.once('error', reject)
					.once('end', () => {
						assert.equal(readStream.blocksRead, 2, 'blocksRead mismatch');
						assert.equal(
							readStream.bytesRead,
							blockMap.blockSize * 2,
							'bytesRead mismatch',
						);
						assert.equal(readStream.rangesRead, 1, 'rangesRead mismatch');
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						assert.equal(
							byteCount / blockMap.blockSize,
							2,
							'actual blocks read mismatch',
						);
						resolve();
					});
			});
		});
	});

	it('should start reading at `start` and stop reading at `end`, if specified', async () => {
		const filename = join(__dirname, '/data/padded-bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		let byteCount = 0;
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(
				fd,
				blockMap,
				true,
				false,
				4096,
				4096 + blockMap.blockSize,
			);

			await new Promise((resolve, reject) => {
				readStream
					.on('data', (block: Chunk) => {
						byteCount += block.length;
						assert.ok(block.position !== undefined, 'block position missing');
					})
					.once('error', reject)
					.once('end', () => {
						assert.equal(readStream.blocksRead, 2, 'blocksRead mismatch');
						assert.equal(
							readStream.bytesRead,
							blockMap.blockSize * 2,
							'bytesRead mismatch',
						);
						assert.equal(readStream.rangesRead, 1, 'rangesRead mismatch');
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						assert.equal(
							byteCount / blockMap.blockSize,
							2,
							'actual blocks read mismatch',
						);
						resolve();
					});
			});
		});
	});

	it('should throw if start is negative', () => {
		const blockMap = new BlockMap(require('./data/version-2.0'));
		assert.throws(() => {
			// tslint:disable-next-line:no-unused-expression-chai
			new ReadStream(0, blockMap, true, false, -1);
		});
	});

	it('should throw if end is negative', () => {
		const blockMap = new BlockMap(require('./data/version-2.0'));
		assert.throws(() => {
			// tslint:disable-next-line:no-unused-expression-chai
			new ReadStream(0, blockMap, true, false, 0, -1);
		});
	});

	it('should not emit blocks if end is 0', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		let byteCount = 0;
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(fd, blockMap, true, false, 0, 0);

			await new Promise((resolve, reject) => {
				readStream
					.on('error', reject)
					.on('end', () => {
						assert.strictEqual(byteCount, 0);
						resolve();
					})
					.on('data', (block: Chunk) => {
						byteCount += block.length;
					});
			});
		});
	});

	it('should throw if start is greater than end', () => {
		const blockMap = new BlockMap(require('./data/version-2.0'));
		assert.throws(() => {
			// tslint:disable-next-line:no-unused-expression-chai
			new ReadStream(0, blockMap, true, false, blockMap.blockSize, 0);
		});
	});

	it('should not emit blocks if start is equal to end', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		let byteCount = 0;
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(
				fd,
				blockMap,
				true,
				false,
				blockMap.blockSize,
				blockMap.blockSize,
			);

			await new Promise((resolve, reject) => {
				readStream
					.on('error', reject)
					.on('end', () => {
						assert.strictEqual(byteCount, 0);
						resolve();
					})
					.on('data', (block: Chunk) => {
						byteCount += block.length;
					});
			});
		});
	});

	it('should emit an error if start goes beyond the file', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(
				fd,
				blockMap,
				true,
				false,
				statSync(filename).size + blockMap.blockSize,
			);

			const hadError = false;

			await new Promise((resolve, reject) => {
				readStream
					.on('error', () => {
						resolve();
					})
					.on('end', () => {
						if (!hadError) {
							reject(new Error('Missing expected exception'));
						}
					})
					.on('data', () => {
						// drain
					});
			});
		});
	});

	it('should ignore an end beyond the file', async () => {
		const filename = join(__dirname, 'data', 'bmap.img');
		const blockMap = new BlockMap(require('./data/version-2.0'));
		let byteCount = 0;
		await withOpenFile(filename, async (fd) => {
			const readStream = new ReadStream(
				fd,
				blockMap,
				true,
				false,
				0,
				statSync(filename).size + blockMap.blockSize,
			);

			await new Promise((resolve, reject) => {
				readStream
					.on('error', reject)
					.on('end', () => {
						assert.equal(
							readStream.blocksRead,
							blockMap.mappedBlocksCount,
							'blocksRead mismatch',
						);
						assert.equal(
							readStream.bytesRead,
							blockMap.mappedBlocksCount * blockMap.blockSize,
							'bytesRead mismatch',
						);
						assert.equal(
							readStream.rangesRead,
							blockMap.ranges.length,
							'rangesRead mismatch',
						);
						assert.equal(
							readStream.rangesVerified,
							readStream.rangesRead,
							'rangesVerified mismatch',
						);
						assert.equal(
							byteCount / blockMap.blockSize,
							blockMap.mappedBlocksCount,
							'actual blocks read mismatch',
						);
						resolve();
					})
					.on('data', (block: Chunk) => {
						byteCount += block.length;
					});
			});
		});
	});

	context('disabled verification', () => {
		BlockMap.versions.forEach((v) => {
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
				await withOpenFile(filename, async (fd) => {
					const readStream = new ReadStream(fd, blockMap, false);

					await new Promise((resolve, reject) => {
						readStream.resume().on('error', reject).on('end', resolve);
					});
				});
			});
		});
	});

	context('single invalid range', () => {
		BlockMap.versions.forEach((v) => {
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
				await withOpenFile(filename, async (fd) => {
					const readStream = new ReadStream(fd, blockMap);
					let errorCount = 0;

					await new Promise((resolve, reject) => {
						readStream
							.resume()
							.on('error', (error: ReadRangeError) => {
								assert.ok(
									error instanceof Error,
									'error not instance of Error',
								);
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
								errorCount += 1;
							})
							.on('end', () => {
								if (errorCount) {
									resolve();
								} else {
									reject(new Error('Did not detect faulty range checksum'));
								}
							});
					});
				});
			});
		});
	});

	context('multiple invalid ranges', () => {
		BlockMap.versions.forEach((v) => {
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
				await withOpenFile(filename, async (fd) => {
					const readStream = new ReadStream(fd, blockMap, true);
					let hadErrors = 0;

					await new Promise((resolve) => {
						readStream
							.resume()
							.on('error', (error) => {
								assert.ok(
									error instanceof Error,
									'error not instance of Error',
								);
								assert.ok(/^Invalid checksum for range/.test(error.message));
								hadErrors++;
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
});

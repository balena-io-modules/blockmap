import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

import { BlockMap, FilterStream, ReadStream, withOpenFile } from '../lib';

async function bench(label: string, fn: () => Promise<void>) {
	console.time(label);
	await fn();
	console.timeEnd(label);
}

const ITERATIONS = 1000;

bench(`BlockMap.parse() ⨉ ${ITERATIONS}`, async () => {
	const filename = join(__dirname, '..', 'test/data/version-2.0.bmap');
	const bmap = readFileSync(filename);
	for (let i = 0; i < ITERATIONS; i++) {
		BlockMap.parse(bmap);
	}
});

bench('fs.ReadStream', async () => {
	const filename = join(__dirname, '..', 'test/data/bmap.img');
	await withOpenFile(filename, async fd => {
		const readStream = createReadStream('whatever', {
			fd,
			autoClose: false,
		});
		await new Promise(resolve => {
			readStream
				.on('data', () => {
					// drain
				})
				.once('end', () => {
					resolve();
				});
		});
	});
});

bench('ReadStream', async () => {
	const filename = join(__dirname, '..', 'test/data/bmap.img');
	const blockMap = new BlockMap(require('../test/data/version-2.0'));
	await withOpenFile(filename, async fd => {
		const readStream = new ReadStream(fd, blockMap);
		await new Promise(resolve => {
			readStream
				.on('data', () => {
					// drain
				})
				.once('end', () => {
					resolve();
				});
		});
	});
});

bench('BlockMap.FilterStream', async () => {
	const filename = join(__dirname, '..', 'test/data/bmap.img');
	const blockMap = new BlockMap(require('../test/data/version-2.0'));
	await withOpenFile(filename, async fd => {
		const readStream = createReadStream('whatever', {
			fd,
			autoClose: false,
		});
		const filter = new FilterStream(blockMap);
		await new Promise(resolve => {
			readStream
				.pipe(filter)
				.on('data', () => {
					// drain
				})
				.once('end', () => {
					resolve();
				});
		});
	});
});

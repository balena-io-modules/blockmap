import * as assert from 'assert';
import { createReadStream, createWriteStream, readFileSync } from 'fs';
import { join } from 'path';
import { createGunzip } from 'zlib';

import { BlockMap } from '../lib';

before('decompress:bmap.img', async () => {
	const source = join(__dirname, 'data', 'bmap.img.gz');
	const destination = join(__dirname, 'data', 'bmap.img');

	await new Promise(resolve => {
		createReadStream(source)
			.pipe(createGunzip())
			.pipe(createWriteStream(destination))
			.once('finish', resolve);
	});
});

before('decompress:padded-bmap.img', async () => {
	const source = join(__dirname, 'data', 'padded-bmap.img.gz');
	const destination = join(__dirname, 'data', 'padded-bmap.img');

	await new Promise(resolve => {
		createReadStream(source)
			.pipe(createGunzip())
			.pipe(createWriteStream(destination))
			.once('finish', resolve);
	});
});

describe('BlockMap.fromJSON()', () => {
	context('compatibility', () => {
		BlockMap.versions.forEach(v => {
			it('inits from v' + v + ' JSON data', () => {
				const filename = `./data/version-${v}`;
				const data = require(filename);
				const json = readFileSync(require.resolve(filename), 'utf8');
				assert.deepEqual(data, BlockMap.fromJSON(json));
			});
		});
	});
});

describe('BlockMap constructor', () => {
	context('compatibility', () => {
		BlockMap.versions.forEach(v => {
			it('inits from v' + v + ' JSON data', () => {
				const filename = `./data/version-${v}`;
				const data = require(filename);
				assert.deepEqual(data, new BlockMap(data));
			});
		});
	});
});

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
import { createReadStream, createWriteStream, readFileSync } from 'fs';
import { join } from 'path';
import { createGunzip } from 'zlib';

import { BlockMap } from '../lib';

before('decompress:bmap.img', async () => {
	const source = join(__dirname, 'data', 'bmap.img.gz');
	const destination = join(__dirname, 'data', 'bmap.img');

	await new Promise((resolve) => {
		createReadStream(source)
			.pipe(createGunzip())
			.pipe(createWriteStream(destination))
			.once('finish', resolve);
	});
});

before('decompress:padded-bmap.img', async () => {
	const source = join(__dirname, 'data', 'padded-bmap.img.gz');
	const destination = join(__dirname, 'data', 'padded-bmap.img');

	await new Promise((resolve) => {
		createReadStream(source)
			.pipe(createGunzip())
			.pipe(createWriteStream(destination))
			.once('finish', resolve);
	});
});

describe('BlockMap.fromJSON()', () => {
	context('compatibility', () => {
		BlockMap.versions.forEach((v) => {
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
		BlockMap.versions.forEach((v) => {
			it('inits from v' + v + ' JSON data', () => {
				const filename = `./data/version-${v}`;
				const data = require(filename);
				assert.deepEqual(data, new BlockMap(data));
			});
		});
	});
});

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
import { readFileSync } from 'fs';
import { join } from 'path';

import { BlockMap } from '../lib';

describe('BlockMap.parse()', () => {
	context('compatibility', () => {
		BlockMap.versions.forEach(v => {
			it('parses v' + v, () => {
				const json = require(`./data/version-${v}`);
				const xml = readFileSync(
					join(__dirname, 'data', `version-${v}.bmap`),
					'utf8',
				);
				assert.deepEqual(json, BlockMap.parse(xml));
			});
		});
	});

	context('when input is a string', () => {
		BlockMap.versions.forEach(v => {
			it('parses v' + v, () => {
				const json = require(`./data/version-${v}`);
				const xml = readFileSync(join(__dirname, 'data', `version-${v}.bmap`));
				assert.deepEqual(json, BlockMap.parse(xml));
			});
		});
	});

	context('when input is a buffer', () => {
		BlockMap.versions.forEach(v => {
			it('parses v' + v, () => {
				const json = require(`./data/version-${v}`);
				const xml = readFileSync(join(__dirname, 'data', `version-${v}.bmap`));
				assert.deepEqual(json, BlockMap.parse(xml));
			});
		});
	});

	context('when file checksum is invalid', () => {
		// NOTE: Version 1.2 has no support for file checksums
		['1.3', '1.4', '2.0'].forEach(v => {
			it(`throws on invalid checksum for v${v}`, () => {
				const xml = readFileSync(
					join(
						__dirname,
						'data',
						'invalid',
						'file-checksum',
						`version-${v}.bmap`,
					),
				);
				assert.throws(
					() => {
						BlockMap.parse(xml);
					},
					/^Error: File checksum mismatch:/,
					`Version ${v}`,
				);
			});
		});

		// NOTE: Version 1.2 has no support for file checksums
		['1.3', '1.4', '2.0'].forEach(v => {
			it(`does not throw with verification disabled for v${v}`, () => {
				const json = require(`./data/version-${v}`);
				const xml = readFileSync(
					join(
						__dirname,
						'data',
						'invalid',
						'file-checksum',
						`version-${v}.bmap`,
					),
				);
				assert.deepEqual(json, BlockMap.parse(xml, false), `Version ${v}`);
			});
		});
	});
});

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

describe('BlockMap.stringify()', () => {
	it('can generate a 2.0 bmap xml file', () => {
		const json = require(`./data/version-2.0`);
		const xml = readFileSync(join(__dirname, 'data', `version-2.0.bmap`));
		const compare = readFileSync(
			join(__dirname, 'data', `stringified.bmap`),
			'utf8',
		);
		const blockMap = BlockMap.parse(xml);
		assert.deepEqual(json, BlockMap.parse(xml));
		assert.strictEqual(blockMap.toString(), compare);
	});

	it('has equivalent input & output', () => {
		const xml = readFileSync(join(__dirname, 'data', `stringified.bmap`));
		const blockMap = BlockMap.parse(xml);
		assert.deepEqual(xml.toString(), blockMap.toString());
	});
});

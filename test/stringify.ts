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

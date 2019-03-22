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

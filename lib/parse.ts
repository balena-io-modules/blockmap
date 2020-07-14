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

import { createHash } from 'crypto';
import { Element, xml2js } from 'xml-js';

import { BlockMap, BlockMapOptions, BlockMapOptionsRange } from './blockmap';

function firstChild(element: Element, name: string): Element | undefined {
	if (element.elements !== undefined) {
		return element.elements.find((e: Element) => e.name === name);
	}
}

function firstChildThrow(element: Element, name: string): Element {
	const result = firstChild(element, name);
	if (result === undefined) {
		throw new Error(`Missing tag "${name}"`);
	}
	return result;
}

function getAttribute(
	element: Element,
	name: string,
): string | number | undefined {
	if (element.attributes !== undefined) {
		return element.attributes[name];
	}
}

function getAttributeThrow(element: Element, name: string): string | number {
	const result = getAttribute(element, name);
	if (result === undefined) {
		throw new Error(`Missing attribute "${name}"`);
	}
	return result;
}

function getText(element: Element | Element[]): string {
	if (Array.isArray(element)) {
		return element.map(getText).join('');
	}
	if (element.type === 'element') {
		return getText(element.elements || []);
	}
	if (element.type === 'text' && element.text !== undefined) {
		return '' + element.text;
	}
	return '';
}

function textContentThrow(element: Element, name: string): string {
	return getText(firstChildThrow(element, name)).trim();
}

function textContent(element: Element, name: string): string | undefined {
	const child = firstChild(element, name);
	if (child !== undefined) {
		return getText(child).trim();
	}
}

function getRanges(element: Element): BlockMapOptionsRange[] {
	const ranges: BlockMapOptionsRange[] = [];
	for (const node of element.elements || []) {
		if (
			node.type === 'element' &&
			node.name !== undefined &&
			node.name.toLowerCase() === 'range'
		) {
			const [start, end] = getText(node).trim().split('-');
			const checksum =
				getAttribute(node, 'sha1') || getAttribute(node, 'chksum');
			if (checksum === undefined) {
				throw new Error('No checksum in range');
			}
			if (typeof checksum !== 'string') {
				throw new Error('Checksum is not a string');
			}
			const range = {
				start: parseInt(start, 10),
				end: parseInt(end || start, 10),
				checksum,
			};
			ranges.push(range);
		}
	}
	return ranges;
}

/** Zero out the file checksum field for checksum calculation */
function maskChecksum(value: string): string {
	const pattern = /BmapFileChecksum/.test(value)
		? /(<BmapFileChecksum>\s*)([a-z0-9]+)(\s*<\/BmapFileChecksum>)/i
		: /(<BmapFileSHA1>\s*)([a-z0-9]+)(\s*<\/BmapFileSHA1>)/i;

	return value.replace(pattern, (_match, start, checksum, end) => {
		return start + checksum.replace(/./g, '0') + end;
	});
}

/** Parse a .bmap file */
export function parse(value: string | Buffer, verify = true): BlockMapOptions {
	value = value.toString();
	const data = xml2js(value, { compact: false }) as Element;
	const bmap = firstChildThrow(data, 'bmap');
	const version = getAttributeThrow(bmap, 'version');
	if (typeof version !== 'string') {
		throw new Error(`Version is not a string: ${version}`);
	}
	if (!BlockMap.versions.includes(version)) {
		throw new Error(`Unsupported block map version "${version}"`);
	}
	const imageSize = parseInt(textContentThrow(bmap, 'ImageSize'), 10);
	const blockSize = parseInt(textContentThrow(bmap, 'BlockSize'), 10);
	const blocksCount = parseInt(textContentThrow(bmap, 'BlocksCount'), 10);
	const mappedBlocksCount = parseInt(
		textContentThrow(bmap, 'MappedBlocksCount'),
		10,
	);
	const checksum =
		textContent(bmap, 'BmapFileChecksum') || textContent(bmap, 'BmapFileSHA1');
	const checksumType = textContent(bmap, 'ChecksumType') || 'sha1';

	const map = firstChildThrow(bmap, 'BlockMap');
	const ranges = getRanges(map);

	if (verify && checksum !== undefined) {
		const file = maskChecksum(value);
		const digest = createHash(checksumType).update(file).digest('hex');
		if (checksum !== digest) {
			throw new Error(`File checksum mismatch: ${checksum} != ${digest}`);
		}
	}
	return {
		version,
		imageSize,
		blockSize,
		blocksCount,
		mappedBlocksCount,
		checksum,
		checksumType,
		ranges,
	};
}

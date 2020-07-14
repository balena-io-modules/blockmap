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

import * as fs from 'fs';

function open(filename: string): Promise<number> {
	return new Promise((resolve, reject) => {
		fs.open(filename, 'r', (error: Error | null, fd: number) => {
			if (error) {
				reject(error);
			} else {
				resolve(fd);
			}
		});
	});
}

function close(fd: number): Promise<void> {
	return new Promise((resolve, reject) => {
		fs.close(fd, (error?: Error | null) => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

export async function withOpenFile(
	filename: string,
	fn: (fd: number) => Promise<void>,
) {
	const fd = await open(filename);
	try {
		await fn(fd);
	} finally {
		await close(fd);
	}
}

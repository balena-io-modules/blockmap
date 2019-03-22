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
		fs.close(fd, (error?: Error) => {
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

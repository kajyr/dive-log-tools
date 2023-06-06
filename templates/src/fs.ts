import { glob } from 'glob';
import path from 'path';

import { copyFile, writeFile } from 'fs/promises';

export function copy(file: string, dest: string) {
  const basename = path.basename(file);
  return copyFile(file, path.join(dest, basename)).then(() => basename);
}

export async function apply(pattern: string, fn: (s: string) => string) {
  const files = await glob(pattern);
  return Promise.all(files.map(fn));
}

export function saveJson(file: string, data: any) {
  return writeFile(file, JSON.stringify(data, null, 2));
}

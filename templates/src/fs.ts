import { writeFile, copyFile } from 'fs/promises';
import glob from 'glob';
import path from 'path';

const globp = (pattern: string): Promise<string[]> =>
  new Promise((resolve, reject) =>
    glob(pattern, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    }),
  );

export function copy(file: string, dest: string) {
  const basename = path.basename(file);
  return copyFile(file, path.join(dest, basename)).then(() => basename);
}

export function apply(pattern: string, fn: (s: string) => string) {
  return globp(pattern).then((files) => Promise.all(files.map(fn)));
}

export function saveJson(file: string, data: any) {
  return writeFile(file, JSON.stringify(data, null, 2));
}

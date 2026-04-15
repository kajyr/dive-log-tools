import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

import { importer } from '../src';
import { schema } from '../src/schema';

const MOCK_FOLDER = join(__dirname, '__mocks__');

// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = function (dir: string, filelist: string[] = []) {
  const files = readdirSync(dir);

  files.forEach(function (file) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else if (filePath.match(/\.xml$/)) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

describe('JSON Schema Validation', () => {
  const files = walkSync(MOCK_FOLDER);

  files.forEach((file) => {
    test(basename(file), () => {
      const data = readFileSync(file, 'utf8');
      const logbook = importer(data);

      const ret = schema.safeParse(logbook);
      assert.strictEqual(ret.success, true);
    });
  });
});

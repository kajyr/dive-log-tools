import { importer } from '../src';
import path from 'path';
import fs from 'fs';
import Ajv from 'ajv';

const MOCK_FOLDER = path.join(__dirname, '__mocks__');

// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = function (dir: string, filelist: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach(function (file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else if (filePath.match(/\.xml$/)) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

/* const MOCK_FOLDER = fs.readFileSync(MOCK_FILE, 'utf8');
 */
describe('JSON Schema Validation', () => {
  const files = walkSync(MOCK_FOLDER);

  const ajv = new Ajv();
  const validate = ajv.compile(require('../dive-schema.json'));

  files.forEach((file) => {
    test(file, () => {
      const data = fs.readFileSync(file, 'utf8');
      const logbook = importer(data);

      logbook?.dives.forEach((dive) => {
        const valid = validate(dive);
        if (!valid) {
          console.log('@@@', file, validate.errors);
        }
        expect(valid).toBe(true);
      });
    });
  });
});

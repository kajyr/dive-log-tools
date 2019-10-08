const { importer } = require('../src');
const path = require('path');
const fs = require('fs');
const Ajv = require('ajv');

const MOCK_FOLDER = path.join(__dirname, '__mocks__');

// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = function(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach(function(file) {
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

  files.forEach(async file => {
    test(file, async () => {
      const data = fs.readFileSync(file, 'utf8');
      const logbook = await importer(data);

      logbook.dives.forEach(dive => {
        const valid = validate(dive);
        if (!valid) {
          console.log('@@@', file, validate.errors);
        }
        expect(valid).toBe(true);
      });
    });
  });
});

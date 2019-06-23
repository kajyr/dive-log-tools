const { importer } = require('../src/macdive');
const { parse } = require('../src/xml');
const path = require('path');
const fs = require('fs');

const MOCK_FILE = path.join(__dirname, '__mocks__', 'MacDive.xml');
const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

describe('MacDive importer', () => {
  test('Basic', async () => {
    const mock = await parse(MOCK_DATA);
    const logbook = importer(mock);
    expect(logbook).toMatchSnapshot();
  });

  test('Failing for missing samples', async () => {
    const MOCK_FILE = path.join(__dirname, '__mocks__', 'MacDive_NoSamples.xml');
    const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

    const mock = await parse(MOCK_DATA);
    expect(() => {
      const logbook = importer(mock);
    }).not.toThrow();
  });

  test('Schema is valid', async () => {
    const mock = await parse(MOCK_DATA);
    const logbook = importer(mock);
    const [dive] = logbook.dives;

    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(require('../dive-schema.json'));
    const valid = validate(dive);

    console.log(dive);

    if (!valid) {
      console.log('@@@', validate.errors);
    }
    expect(valid).toBe(true);
  });
});

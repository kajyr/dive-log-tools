const { importer } = require('../src/macdive');
const { parse } = require('../src/xml');
const path = require('path');
const fs = require('fs');

const MOCK_FILE = path.join(__dirname, '__mocks__', 'macdive', 'MacDive.xml');
const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

describe('MacDive importer', () => {
  test('Basic', async () => {
    const mock = await parse(MOCK_DATA);
    const logbook = importer(mock);
    expect(logbook).toMatchSnapshot();
  });

  test('Failing for missing props', async () => {
    const MOCK_FILE = path.join(__dirname, '__mocks__', 'macdive', 'MissingProps.xml');
    const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

    const mock = await parse(MOCK_DATA);
    expect(() => {
      const logbook = importer(mock);
    }).not.toThrow();
  });
});

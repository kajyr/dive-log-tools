const { listImporters } = require('../src');

describe('Importer entrypoint', () => {
  test('listImporters', async () => {
    expect(listImporters()).toEqual(['divinglog', 'macdive']);
  });
});

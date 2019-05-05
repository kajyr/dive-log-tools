const { clean } = require('../src/json');

describe('JSON Cleaning', () => {
  test('Clean object', () => {
    const dirty = {
      Number: ['1'],
      Date: ['2017-11-11'],
      Time: ['09:50'],
      Bool1: ['True'],
      Bool2: ['False'],
      EmptyString: ['\n      '],
    };
    const expected = {
      Bool1: true,
      Bool2: false,
      EmptyString: '',
      Number: 1,
      Date: '2017-11-11',
      Time: '09:50',
    };
    expect(clean(dirty)).toEqual(expected);
  });

  test('Clean nested shit', () => {
    const dirty = {
      A: [
        {
          B: [
            {
              value: ['0.06'],
            },
          ],
          C: [
            {
              value: ['7'],
            },
            {
              value: ['8'],
            },
          ],
        },
      ],
    };
    const expected = {
      A: { B: { value: 0.06 }, C: [{ value: 7 }, { value: 8 }] },
    };
    expect(clean(dirty)).toEqual(expected);
  });
});

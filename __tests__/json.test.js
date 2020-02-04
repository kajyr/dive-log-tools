const { clean, cleanFloat } = require('../src/json');

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

describe('cleanFloat', () => {
  test('cleanFloat does not clean string that contains numbers', () => {
    expect(cleanFloat('9')).toBe(9);
    expect(cleanFloat('9.5')).toBe(9.5);
    expect(cleanFloat(9)).toBe(9);
    expect(cleanFloat('9 + 9')).toBe('9 + 9');
    expect(cleanFloat('There are 9 fishes')).toBe('There are 9 fishes');
  });

  test('Does not mess with dates', () => {
    expect(cleanFloat('09-10-2018')).toBe('09-10-2018');
    expect(cleanFloat('09:10:59')).toBe('09:10:59');
  });
});

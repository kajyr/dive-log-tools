const { tankName } = require('../src/dive/tank');

describe('tankName', () => {
  test('Single ', () => {
    expect(tankName(15, null, false)).toBe('15');
    expect(tankName(15, 'Pinina', false)).toBe('Pinina');
  });

  test('Double', () => {
    expect(tankName(24, null, true)).toBe('12 + 12');
    expect(tankName(24, 'Pinina', true)).toBe('Pinina');
  });
});

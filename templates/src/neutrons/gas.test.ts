import { gasLabel } from './gas';

describe('Gas label', () => {
  test('EAN', () => {
    expect(
      gasLabel({
        oxygen: 32,
      }),
    ).toBe('EAN32');
  });
  test('Aria', () => {
    expect(gasLabel({})).toBe('Aria');
  });
});

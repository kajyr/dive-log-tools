import { rows } from './grid';

describe('Grid', () => {
  test('rows', () => {
    const { r } = rows(0, 115, 4, 5);
    expect(r).toEqual([0, 30, 60, 90]);

    const { r: r2 } = rows(10, 115, 4, 5);
    expect(r2).toEqual([10, 40, 70, 100]);
  });
});

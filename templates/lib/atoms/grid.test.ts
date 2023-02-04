import { columnsArea, rows } from './grid';

describe('Grid', () => {
  test('rows', () => {
    const { r } = rows(0, 115, 4, 5);
    expect(r).toEqual([0, 30, 60, 90]);

    const { r: r2 } = rows(10, 115, 4, 5);
    expect(r2).toEqual([10, 40, 70, 100]);
  });
});

describe('columnsArea', () => {
  test('Basic', () => {
    const ret = columnsArea([25, 25, null], { h: 100, w: 124, x: 0, y: 0 }, 2);

    expect(ret).toMatchInlineSnapshot(`
      [
        {
          "h": 100,
          "w": 30,
          "x": 0,
          "y": 0,
        },
        {
          "h": 100,
          "w": 30,
          "x": 32,
          "y": 0,
        },
        {
          "h": 100,
          "w": 60,
          "x": 64,
          "y": 0,
        },
      ]
    `);
  });
});

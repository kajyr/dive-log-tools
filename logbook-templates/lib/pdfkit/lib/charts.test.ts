import { scale } from './charts';

test('scale', () => {
  // 5 is in the middle between 0 and 10
  const s = scale(0, 10, 0, 100);
  expect(s(5)).toBe(50);

  // now 10 is the max value should be 0 because we count with (0,0) in top left corner
  expect(s(10)).toBe(0);
  expect(s(0)).toBe(100);

  // some 3/4 value
  expect(s(7)).toBe(30);
});

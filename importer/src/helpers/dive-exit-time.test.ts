import { diveExitTime } from './dive-exit-time';

describe('diveExitTime', () => {
  test('Basics', () => {
    expect(diveExitTime('2020-01-01T10:20:00', 20)).toBe('10:40:00');
  });
});

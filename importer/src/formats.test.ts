import { datetime, time } from './formats';

describe('datetime', () => {
  test('Basic', () => {
    expect(datetime(new Date('2020-01-01T00:00:00'))).toBe('2020-01-01T00:00:00Z');
  });
});

describe('time', () => {
  test('Basic', () => {
    expect(time(new Date('2020-01-01T11:21:32'))).toBe('11:21:32');
  });
});

import { parseSamples } from '../src/macdive/importer';

describe('parseSamples', () => {
  test(`Depth can't be < 0`, () => {
    const samples = [{ depth: -3, ndt: 0, ppo2: 0, pressure: 0, temperature: 0, time: 0 }];

    const [fixed] = parseSamples(samples);

    expect(fixed.depth).toBe(0);
  });
});

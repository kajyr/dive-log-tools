const { parseSamples } = require('../src/dive/samples');

describe('parseSamples', () => {
  test(`Depth can't be < 0`, () => {
    const samples = [{ depth: -3 }];

    const [fixed] = parseSamples(samples);

    expect(fixed.depth).toBe(0);
  });

  test(`Samples are numeric`, () => {
    const samples = [{ depth: '2', ppo2: '3.22' }];

    const [fixed] = parseSamples(samples);

    expect(fixed.depth).toBe(2);
    expect(fixed.ppo2).toBe(3.22);
  });
});

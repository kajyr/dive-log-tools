const KEYS = ['depth', 'ndt', 'ppo2', 'pressure', 'temperature', 'time'];

function parseSamples(samples) {
  return samples.map((s) => {
    const sample = {};

    for (const key of KEYS) {
      if (s[key]) {
        sample[key] = Number(s[key]);
      }
    }

    // Depth can't be < 0
    if (sample.depth < 0) {
      sample.depth = 0;
    }
    return sample;
  });
}

module.exports = {
  parseSamples,
};

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  bottom_time,
  buddies,
  emersion_time,
  entry,
  half_depth_break,
  half_depth_break_time,
  normalizeCurrent,
  normalizeSurface,
  normalizeVisibility,
  normalizeWeather,
  surfaceInterval,
  water,
} from './dive';

describe('buddies', () => {
  test('should join buddy list and divemaster', () => {
    assert.strictEqual(buddies(['Alice', 'Bob'], 'Charlie'), 'Alice, Bob, Charlie');
  });

  test('should deduplicate when divemaster is also a buddy', () => {
    assert.strictEqual(buddies(['Alice', 'Bob'], 'Bob'), 'Alice, Bob');
  });

  test('should filter out empty strings', () => {
    assert.strictEqual(buddies(['Alice', '', '  '], ''), 'Alice');
  });

  test('should return empty string when all entries are blank', () => {
    assert.strictEqual(buddies([], ''), '');
  });
});

describe('half_depth_break', () => {
  test('should return half depth in meters for deep dives', () => {
    assert.strictEqual(half_depth_break(30), '15m');
    assert.strictEqual(half_depth_break(25), '13m');
  });

  test('should return placeholder for shallow dives', () => {
    assert.strictEqual(half_depth_break(18), '___');
    assert.strictEqual(half_depth_break(10), '___');
  });

  test('should round up odd depths', () => {
    assert.strictEqual(half_depth_break(19), '10m');
  });
});

describe('half_depth_break_time', () => {
  test('should return 2.5 for deep dives', () => {
    assert.strictEqual(half_depth_break_time(19), '2.5');
    assert.strictEqual(half_depth_break_time(30), '2.5');
  });

  test('should return dash for shallow dives', () => {
    assert.strictEqual(half_depth_break_time(18), '-');
    assert.strictEqual(half_depth_break_time(10), '-');
  });
});

describe('bottom_time', () => {
  test('should return undefined when diveTime is 0', () => {
    assert.strictEqual(bottom_time(0, 30), undefined);
  });

  test('should calculate bottom time for deep dives (>18m)', () => {
    // diveTime - 5 - ceil((maxDepth - 6) / 9) - 2.5
    // 50 - 5 - ceil(24/9) - 2.5 = 50 - 5 - 3 - 2.5 = 39.5
    assert.strictEqual(bottom_time(50, 30), 39.5);
  });

  test('should calculate bottom time for shallow dives (<=18m)', () => {
    // diveTime - 5 - ceil((maxDepth - 6) / 9) - 0
    // 40 - 5 - ceil(12/9) = 40 - 5 - 2 = 33
    assert.strictEqual(bottom_time(40, 18), 33);
  });
});

describe('emersion_time', () => {
  test('should calculate ascent time based on depth', () => {
    assert.strictEqual(emersion_time(30), Math.ceil(24 / 9));
    assert.strictEqual(emersion_time(15), 1);
    assert.strictEqual(emersion_time(6), 0);
  });
});

describe('normalizeVisibility', () => {
  for (const value of ['scarsa', 'bassa', 'medio bassa', 'molto scarsa']) {
    test(`should return POOR for "${value}"`, () => {
      assert.strictEqual(normalizeVisibility(value), 'POOR');
    });
  }

  test('should return MEDIUM for "media"', () => {
    assert.strictEqual(normalizeVisibility('media'), 'MEDIUM');
  });

  for (const value of ['', 'buona', 'ottima']) {
    test(`should return GOOD for "${value}"`, () => {
      assert.strictEqual(normalizeVisibility(value), 'GOOD');
    });
  }

  test('should default to GOOD and log for unrecognized values', (t) => {
    const spy = t.mock.method(console, 'log', () => {});
    assert.strictEqual(normalizeVisibility('unknown'), 'GOOD');
    assert.deepStrictEqual(spy.mock.calls[0].arguments, ['Visibility not recognized', 'unknown']);
  });

  test('should default to GOOD when called with no argument', () => {
    assert.strictEqual(normalizeVisibility(), 'GOOD');
  });

  test('should be case-insensitive', () => {
    assert.strictEqual(normalizeVisibility('SCARSA'), 'POOR');
    assert.strictEqual(normalizeVisibility('Buona'), 'GOOD');
  });
});

describe('normalizeWeather', () => {
  for (const value of ['pioggia', 'burrasca', 'neve']) {
    test(`should return RAIN for "${value}"`, () => {
      assert.strictEqual(normalizeWeather(value), 'RAIN');
    });
  }

  for (const value of ['coperto', 'foschia', 'grigio', 'nuvoloso', 'pioggia leggera', 'variabile', 'ventoso']) {
    test(`should return CLOUD for "${value}"`, () => {
      assert.strictEqual(normalizeWeather(value), 'CLOUD');
    });
  }

  for (const value of ['', 'sereno', 'sole', 'al coperto', 'poco nuvoloso']) {
    test(`should return CLEAR for "${value}"`, () => {
      assert.strictEqual(normalizeWeather(value), 'CLEAR');
    });
  }

  test('should default to CLEAR and log for unrecognized values', (t) => {
    const spy = t.mock.method(console, 'log', () => {});
    assert.strictEqual(normalizeWeather('tornado'), 'CLEAR');
    assert.deepStrictEqual(spy.mock.calls[0].arguments, ['Weather not recognized', 'tornado']);
  });
});

describe('normalizeSurface', () => {
  for (const value of ['molto mosso', 'tempesta', 'mosso']) {
    test(`should return ROUGH for "${value}"`, () => {
      assert.strictEqual(normalizeSurface(value), 'ROUGH');
    });
  }

  for (const value of ['leggero', 'medio', 'poco mosso', 'medio mosso', 'medio calmo', 'leggermente mosso']) {
    test(`should return WEAK for "${value}"`, () => {
      assert.strictEqual(normalizeSurface(value), 'WEAK');
    });
  }

  for (const value of ['', 'calmo', 'ghiaccio', 'nessuno', 'normale', 'piatto', 'piscina', 'sereno']) {
    test(`should return FLAT for "${value}"`, () => {
      assert.strictEqual(normalizeSurface(value), 'FLAT');
    });
  }

  test('should default to FLAT and log for unrecognized values', (t) => {
    const spy = t.mock.method(console, 'log', () => {});
    assert.strictEqual(normalizeSurface('tsunami'), 'FLAT');
    assert.deepStrictEqual(spy.mock.calls[0].arguments, ['Surface not recognized', 'tsunami']);
  });

  test('should default to FLAT when called with no argument', () => {
    assert.strictEqual(normalizeSurface(), 'FLAT');
  });
});

describe('normalizeCurrent', () => {
  for (const value of ['forte', 'medio forte']) {
    test(`should return STRONG for "${value}"`, () => {
      assert.strictEqual(normalizeCurrent(value), 'STRONG');
    });
  }

  for (const value of ['media', 'scarsa', 'moderata', 'poca']) {
    test(`should return WEAK for "${value}"`, () => {
      assert.strictEqual(normalizeCurrent(value), 'WEAK');
    });
  }

  for (const value of ['', 'nessuna']) {
    test(`should return NONE for "${value}"`, () => {
      assert.strictEqual(normalizeCurrent(value), 'NONE');
    });
  }

  test('should default to NONE and log for unrecognized values', (t) => {
    const spy = t.mock.method(console, 'log', () => {});
    assert.strictEqual(normalizeCurrent('vortex'), 'NONE');
    assert.deepStrictEqual(spy.mock.calls[0].arguments, ['Current not recognized', 'vortex']);
  });

  test('should default to NONE when called with no argument', () => {
    assert.strictEqual(normalizeCurrent(), 'NONE');
  });
});

describe('entry', () => {
  for (const [input, expected] of [
    ['barca', 'da barca'],
    ['boat', 'da barca'],
    ['', 'da barca'],
    ['riva', 'da terra'],
    ['pool', 'piscina'],
    ['piscina', 'piscina'],
  ] as const) {
    test(`should map "${input}" to "${expected}"`, () => {
      assert.strictEqual(entry(input), expected);
    });
  }

  test('should pass through unrecognized values', () => {
    assert.strictEqual(entry('zodiac'), 'zodiac');
  });

  test('should default to "da barca" when called with no argument', () => {
    assert.strictEqual(entry(), 'da barca');
  });
});

describe('water', () => {
  for (const [input, expected] of [
    ['pool', ''],
    ['piscina', ''],
    ['fresh water', 'acqua dolce'],
    ['salt', 'mare'],
    ['salt water', 'mare'],
    ['', 'mare'],
  ] as const) {
    test(`should map "${input}" to "${expected}"`, () => {
      assert.strictEqual(water(input), expected);
    });
  }

  test('should pass through unrecognized values', () => {
    assert.strictEqual(water('brackish'), 'brackish');
  });

  test('should default to "mare" when called with no argument', () => {
    assert.strictEqual(water(), 'mare');
  });
});

describe('surfaceInterval', () => {
  test('should return undefined for non-repetitive dives', () => {
    assert.strictEqual(surfaceInterval(false, 90), undefined);
  });

  test('should format minutes into HH:MM:SS', () => {
    assert.strictEqual(surfaceInterval(true, 90), '01:30:00');
    assert.strictEqual(surfaceInterval(true, 45), '00:45:00');
  });

  test('should floor fractional minutes', () => {
    assert.strictEqual(surfaceInterval(true, 90.7), '01:30:00');
  });

  test('should handle zero interval', () => {
    assert.strictEqual(surfaceInterval(true, 0), '00:00:00');
  });
});

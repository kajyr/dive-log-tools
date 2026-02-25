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
    expect(buddies(['Alice', 'Bob'], 'Charlie')).toBe('Alice, Bob, Charlie');
  });

  test('should deduplicate when divemaster is also a buddy', () => {
    expect(buddies(['Alice', 'Bob'], 'Bob')).toBe('Alice, Bob');
  });

  test('should filter out empty strings', () => {
    expect(buddies(['Alice', '', '  '], '')).toBe('Alice');
  });

  test('should return empty string when all entries are blank', () => {
    expect(buddies([], '')).toBe('');
  });
});

describe('half_depth_break', () => {
  test('should return half depth in meters for deep dives', () => {
    expect(half_depth_break(30)).toBe('15m');
    expect(half_depth_break(25)).toBe('13m');
  });

  test('should return placeholder for shallow dives', () => {
    expect(half_depth_break(18)).toBe('___');
    expect(half_depth_break(10)).toBe('___');
  });

  test('should round up odd depths', () => {
    expect(half_depth_break(19)).toBe('10m');
  });
});

describe('half_depth_break_time', () => {
  test('should return 2.5 for deep dives', () => {
    expect(half_depth_break_time(19)).toBe('2.5');
    expect(half_depth_break_time(30)).toBe('2.5');
  });

  test('should return dash for shallow dives', () => {
    expect(half_depth_break_time(18)).toBe('-');
    expect(half_depth_break_time(10)).toBe('-');
  });
});

describe('bottom_time', () => {
  test('should return undefined when diveTime is 0', () => {
    expect(bottom_time(0, 30)).toBeUndefined();
  });

  test('should calculate bottom time for deep dives (>18m)', () => {
    // diveTime - 5 - ceil((maxDepth - 6) / 9) - 2.5
    // 50 - 5 - ceil(24/9) - 2.5 = 50 - 5 - 3 - 2.5 = 39.5
    expect(bottom_time(50, 30)).toBe(39.5);
  });

  test('should calculate bottom time for shallow dives (<=18m)', () => {
    // diveTime - 5 - ceil((maxDepth - 6) / 9) - 0
    // 40 - 5 - ceil(12/9) = 40 - 5 - 2 = 33
    expect(bottom_time(40, 18)).toBe(33);
  });
});

describe('emersion_time', () => {
  test('should calculate ascent time based on depth', () => {
    expect(emersion_time(30)).toBe(Math.ceil(24 / 9));
    expect(emersion_time(15)).toBe(1);
    expect(emersion_time(6)).toBe(0);
  });
});

describe('normalizeVisibility', () => {
  test.each(['scarsa', 'bassa', 'medio bassa', 'molto scarsa'])('should return POOR for "%s"', (value) => {
    expect(normalizeVisibility(value)).toBe('POOR');
  });

  test('should return MEDIUM for "media"', () => {
    expect(normalizeVisibility('media')).toBe('MEDIUM');
  });

  test.each(['', 'buona', 'ottima'])('should return GOOD for "%s"', (value) => {
    expect(normalizeVisibility(value)).toBe('GOOD');
  });

  test('should default to GOOD and log for unrecognized values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    expect(normalizeVisibility('unknown')).toBe('GOOD');
    expect(spy).toHaveBeenCalledWith('Visibility not recognized', 'unknown');
    spy.mockRestore();
  });

  test('should default to GOOD when called with no argument', () => {
    expect(normalizeVisibility()).toBe('GOOD');
  });

  test('should be case-insensitive', () => {
    expect(normalizeVisibility('SCARSA')).toBe('POOR');
    expect(normalizeVisibility('Buona')).toBe('GOOD');
  });
});

describe('normalizeWeather', () => {
  test.each(['pioggia', 'burrasca', 'neve'])('should return RAIN for "%s"', (value) => {
    expect(normalizeWeather(value)).toBe('RAIN');
  });

  test.each(['coperto', 'foschia', 'grigio', 'nuvoloso', 'pioggia leggera', 'variabile', 'ventoso'])(
    'should return CLOUD for "%s"',
    (value) => {
      expect(normalizeWeather(value)).toBe('CLOUD');
    },
  );

  test.each(['', 'sereno', 'sole', 'al coperto', 'poco nuvoloso'])('should return CLEAR for "%s"', (value) => {
    expect(normalizeWeather(value)).toBe('CLEAR');
  });

  test('should default to CLEAR and log for unrecognized values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    expect(normalizeWeather('tornado')).toBe('CLEAR');
    expect(spy).toHaveBeenCalledWith('Weather not recognized', 'tornado');
    spy.mockRestore();
  });
});

describe('normalizeSurface', () => {
  test.each(['molto mosso', 'tempesta', 'mosso'])('should return ROUGH for "%s"', (value) => {
    expect(normalizeSurface(value)).toBe('ROUGH');
  });

  test.each(['leggero', 'medio', 'poco mosso', 'medio mosso', 'medio calmo', 'leggermente mosso'])(
    'should return WEAK for "%s"',
    (value) => {
      expect(normalizeSurface(value)).toBe('WEAK');
    },
  );

  test.each(['', 'calmo', 'ghiaccio', 'nessuno', 'normale', 'piatto', 'piscina', 'sereno'])(
    'should return FLAT for "%s"',
    (value) => {
      expect(normalizeSurface(value)).toBe('FLAT');
    },
  );

  test('should default to FLAT and log for unrecognized values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    expect(normalizeSurface('tsunami')).toBe('FLAT');
    expect(spy).toHaveBeenCalledWith('Surface not recognized', 'tsunami');
    spy.mockRestore();
  });

  test('should default to FLAT when called with no argument', () => {
    expect(normalizeSurface()).toBe('FLAT');
  });
});

describe('normalizeCurrent', () => {
  test.each(['forte', 'medio forte'])('should return STRONG for "%s"', (value) => {
    expect(normalizeCurrent(value)).toBe('STRONG');
  });

  test.each(['media', 'scarsa', 'moderata', 'poca'])('should return WEAK for "%s"', (value) => {
    expect(normalizeCurrent(value)).toBe('WEAK');
  });

  test.each(['', 'nessuna'])('should return NONE for "%s"', (value) => {
    expect(normalizeCurrent(value)).toBe('NONE');
  });

  test('should default to NONE and log for unrecognized values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    expect(normalizeCurrent('vortex')).toBe('NONE');
    expect(spy).toHaveBeenCalledWith('Current not recognized', 'vortex');
    spy.mockRestore();
  });

  test('should default to NONE when called with no argument', () => {
    expect(normalizeCurrent()).toBe('NONE');
  });
});

describe('entry', () => {
  test.each([
    ['barca', 'da barca'],
    ['boat', 'da barca'],
    ['', 'da barca'],
    ['riva', 'da terra'],
    ['pool', 'piscina'],
    ['piscina', 'piscina'],
  ])('should map "%s" to "%s"', (input, expected) => {
    expect(entry(input)).toBe(expected);
  });

  test('should pass through unrecognized values', () => {
    expect(entry('zodiac')).toBe('zodiac');
  });

  test('should default to "da barca" when called with no argument', () => {
    expect(entry()).toBe('da barca');
  });
});

describe('water', () => {
  test.each([
    ['pool', ''],
    ['piscina', ''],
    ['fresh water', 'acqua dolce'],
    ['salt', 'mare'],
    ['salt water', 'mare'],
    ['', 'mare'],
  ])('should map "%s" to "%s"', (input, expected) => {
    expect(water(input)).toBe(expected);
  });

  test('should pass through unrecognized values', () => {
    expect(water('brackish')).toBe('brackish');
  });

  test('should default to "mare" when called with no argument', () => {
    expect(water()).toBe('mare');
  });
});

describe('surfaceInterval', () => {
  test('should return undefined for non-repetitive dives', () => {
    expect(surfaceInterval(false, 90)).toBeUndefined();
  });

  test('should format minutes into HH:MM:SS', () => {
    expect(surfaceInterval(true, 90)).toBe('01:30:00');
    expect(surfaceInterval(true, 45)).toBe('00:45:00');
  });

  test('should floor fractional minutes', () => {
    expect(surfaceInterval(true, 90.7)).toBe('01:30:00');
  });

  test('should handle zero interval', () => {
    expect(surfaceInterval(true, 0)).toBe('00:00:00');
  });
});

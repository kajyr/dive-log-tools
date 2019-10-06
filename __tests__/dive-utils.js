const { buddies, surfaceInterval, bottom_time } = require('../src/dive');

describe('Buddies', () => {
  test('Basic', () => {
    expect(buddies(['Luca', 'Sonia'])).toBe('Luca, Sonia');
    expect(buddies(['Sonia', 'Sonia'])).toBe('Sonia');
  });

  test('Divemaster is not repeated', () => {
    expect(buddies(['Luca', 'Sonia', 'Mauro'], 'Mauro')).toBe('Luca, Sonia, Mauro');
  });
});

describe('surfaceInterval', () => {
  test('Not repetitive', () => {
    expect(surfaceInterval(false)).toBeFalsy();
    expect(surfaceInterval()).toBeFalsy();
  });

  // Might happen..
  test('With correct values', () => {
    expect(surfaceInterval(true, 52)).toBe('00:52:00');
  });

  // Might happen..
  test('With float values', () => {
    expect(surfaceInterval(true, 208.2833333333333)).toBe('03:28:00');
  });
});

describe('bottom_time', () => {
  test('When dive time is zero it returns null', () => {
    expect(bottom_time(0, 20)).toBe(null);
  });
});

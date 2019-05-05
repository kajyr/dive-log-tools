const { buddies } = require('../src/dive');

describe('Buddies', () => {
  test('Basic', () => {
    expect(buddies(['Luca', 'Sonia'])).toBe('Luca, Sonia');
    expect(buddies(['Sonia', 'Sonia'])).toBe('Sonia');
  });

  test('Divemaster is not repeated', () => {
    expect(buddies(['Luca', 'Sonia', 'Mauro'], 'Mauro')).toBe('Luca, Sonia, Mauro');
  });
});

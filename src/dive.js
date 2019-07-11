const { timeFromValues } = require('./formats');
const unique = list => Array.from(new Set(list));

function buddies(buddy, divemaster) {
  const buddyList = typeof buddy === 'string' ? [buddy] : buddy;
  return unique(buddyList.concat(divemaster))
    .filter(b => !!b && b.trim() !== '')
    .join(', ');
}

function half_depth_break(maxDepth) {
  return maxDepth > 18 ? Math.ceil(maxDepth / 2) + 'm' : '___';
}

function half_depth_break_time(maxDepth) {
  return maxDepth > 18 ? '2.5' : '-';
}

function bottom_time(diveTime, maxDepth) {
  return diveTime - 5 - Math.ceil((maxDepth - 6) / 9) - (maxDepth > 18 ? 2.5 : 0);
}

function surface_is_calm(surface) {
  return ['', 'nessuno', 'normale', 'calmo'].includes(surface.toLowerCase());
}
function surface_is_mid(surface) {
  return ['medio mosso', 'poco mosso', 'leggero'].includes(surface.toLowerCase());
}
function surface_is_rough(surface) {
  return ['mosso'].includes(surface.toLowerCase());
}

function emersion_time(maxDepth) {
  return Math.ceil((maxDepth - 6) / 9);
}

function visibility_is_enough(visibility) {
  return ['media'].includes(visibility.toLowerCase());
}
function visibility_is_good(visibility) {
  return ['', 'buona', 'ottima'].includes(visibility.toLowerCase());
}
function visibility_is_poor(visibility) {
  return ['scarsa'].includes(visibility.toLowerCase());
}

function weather_is_clear(weather) {
  return ['sereno', 'sole'].includes(weather.toLowerCase());
}
function weather_is_cloud(weather) {
  return ['grigio', 'foschia', 'nuvoloso', 'ventoso'].includes(weather.toLowerCase());
}
function weather_is_rain(weather) {
  return ['pioggia', 'burrasca', 'neve'].includes(weather.toLowerCase());
}

function current_is_calm(current) {
  return ['', 'nessuna'].includes(current.toLowerCase());
}
function current_is_strong(current) {
  return ['mosso'].includes(current.toLowerCase());
}
function current_is_weak(current) {
  return ['media', 'medio mosso'].includes(current.toLowerCase());
}

function entry(value = '') {
  switch (value.toLowerCase()) {
    case 'barca':
    case 'boat':
    case '':
      return 'da barca';
    case 'riva':
      return 'da terra';
    case 'pool':
    case 'piscina':
      return 'piscina';
    default:
      return value;
  }
}

function water(value = '') {
  switch (value.toLowerCase()) {
    case 'pool':
    case 'piscina':
      return '';
    case 'fresh water':
      return 'acqua dolce';
    case 'salt':
    case 'salt water':
    case '':
      return 'mare';
    default:
      return value;
  }
}

function surfaceInterval(isRepetitive, surfIntervalInMinutes) {
  if (!isRepetitive) {
    return;
  }
  const normalized = Math.floor(surfIntervalInMinutes);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return timeFromValues([hours, minutes, 0]);
}

module.exports = {
  surfaceInterval,
  buddies,
  half_depth_break,
  half_depth_break_time,
  bottom_time,
  surface_is_calm,
  surface_is_mid,
  surface_is_rough,
  emersion_time,
  visibility_is_enough,
  visibility_is_good,
  visibility_is_poor,
  weather_is_clear,
  weather_is_cloud,
  weather_is_rain,
  current_is_calm,
  current_is_strong,
  current_is_weak,
  entry,
  water,
};

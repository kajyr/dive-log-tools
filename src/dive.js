const { timeFromValues } = require('./formats');
const unique = list => Array.from(new Set(list));

function buddies(buddy, divemaster) {
  return unique([].concat(buddy, divemaster))
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

function emersion_time(maxDepth) {
  return Math.ceil((maxDepth - 6) / 9);
}

const VISIBILITY_POOR = 'POOR';
const VISIBILITY_MEDIUM = 'MEDIUM';
const VISIBILITY_GOOD = 'GOOD';

const WEATHER_POOR = 'RAIN';
const WEATHER_MEDIUM = 'CLOUD';
const WEATHER_GOOD = 'CLEAR';

const SURFACE_ROUGH = 'ROUGH';
const SURFACE_WEAK = 'WEAK';
const SURFACE_FLAT = 'FLAT';

const CURRENT_STRONG = 'STRONG';
const CURRENT_WEAK = 'WEAK ';
const CURRENT_NONE = 'NONE';

function normalizeVisibility(value) {
  switch (value.toLowerCase()) {
    case 'scarsa':
    case 'bassa':
    case 'medio bassa':
    case 'molto scarsa':
      return VISIBILITY_POOR;
    case 'media':
      return VISIBILITY_MEDIUM;
    case '':
    case 'buona':
    case 'ottima':
      return VISIBILITY_GOOD;
    default:
      console.log('Visibility not recognized', value);
      return VISIBILITY_GOOD;
  }
}

function normalizeWeather(value) {
  switch (value.toLowerCase()) {
    case 'pioggia':
    case 'burrasca':
    case 'neve':
      return WEATHER_POOR;
    case 'grigio':
    case 'foschia':
    case 'nuvoloso':
    case 'ventoso':
    case 'variabile':
    case 'pioggia leggera':
      return WEATHER_MEDIUM;
    case '':
    case 'sereno':
    case 'sole':
    case 'al coperto':
      return WEATHER_GOOD;
    default:
      console.log('Weather not recognized', value);
      return WEATHER_GOOD;
  }
}
function normalizeSurface(value) {
  switch (value.toLowerCase()) {
    case 'molto mosso':
    case 'tempesta':
    case 'mosso':
      return SURFACE_ROUGH;
    case 'leggero':
    case 'medio':
    case 'poco mosso':
    case 'medio mosso':
    case 'leggermente mosso':
      return SURFACE_WEAK;
    case '':
    case 'nessuno':
    case 'normale':
    case 'calmo':
    case 'piscina':
      return SURFACE_FLAT;
    default:
      console.log('Surface not recognized', value);
      return SURFACE_FLAT;
  }
}

function normalizeCurrent(value) {
  switch (value.toLowerCase()) {
    case 'forte':
      return CURRENT_STRONG;
    case 'media':
    case 'scarsa':
    case 'moderata':
    case 'poca':
      return CURRENT_WEAK;
    case '':
    case 'nessuna':
      return CURRENT_NONE;
    default:
      console.log('Current not recognized', value);
      return CURRENT_NONE;
  }
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
  bottom_time,
  buddies,
  emersion_time,
  entry,
  half_depth_break_time,
  half_depth_break,
  normalizeCurrent,
  normalizeSurface,
  normalizeVisibility,
  normalizeWeather,
  surfaceInterval,
  water,
};

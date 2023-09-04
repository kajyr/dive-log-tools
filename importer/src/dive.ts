import { timeFromValues } from './formats';
const unique = <T>(list: T[]) => Array.from(new Set(list));

export function buddies(buddy: string[], divemaster: string) {
  return unique(buddy.concat(divemaster))
    .filter((b) => !!b && b.trim() !== '')
    .join(', ');
}

export function half_depth_break(maxDepth: number) {
  return maxDepth > 18 ? Math.ceil(maxDepth / 2) + 'm' : '___';
}

export function half_depth_break_time(maxDepth: number) {
  return maxDepth > 18 ? '2.5' : '-';
}

export function bottom_time(diveTime: number, maxDepth: number) {
  if (diveTime === 0) {
    return undefined;
  }
  const bottom = diveTime - 5 - Math.ceil((maxDepth - 6) / 9) - (maxDepth > 18 ? 2.5 : 0);
  return bottom;
}

export function emersion_time(maxDepth: number) {
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
const CURRENT_WEAK = 'WEAK';
const CURRENT_NONE = 'NONE';

export function normalizeVisibility(value = '') {
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

export function normalizeWeather(value: string) {
  switch (value.toLowerCase()) {
    case 'pioggia':
    case 'burrasca':
    case 'neve':
      return WEATHER_POOR;
    case 'coperto':
    case 'foschia':
    case 'grigio':
    case 'nuvoloso':
    case 'pioggia leggera':
    case 'variabile':
    case 'ventoso':
      return WEATHER_MEDIUM;
    case '':
    case 'sereno':
    case 'sole':
    case 'al coperto':
    case 'poco nuvoloso':
      return WEATHER_GOOD;
    default:
      console.log('Weather not recognized', value);
      return WEATHER_GOOD;
  }
}
export function normalizeSurface(value = '') {
  switch (value.toLowerCase()) {
    case 'molto mosso':
    case 'tempesta':
    case 'mosso':
      return SURFACE_ROUGH;
    case 'leggero':
    case 'medio':
    case 'poco mosso':
    case 'medio mosso':
    case 'medio calmo':
    case 'leggermente mosso':
      return SURFACE_WEAK;
    case '':
    case 'calmo':
    case 'ghiaccio':
    case 'nessuno':
    case 'normale':
    case 'piatto':
    case 'piscina':
    case 'sereno':
      return SURFACE_FLAT;
    default:
      console.log('Surface not recognized', value);
      return SURFACE_FLAT;
  }
}

export function normalizeCurrent(value = '') {
  switch (value.toLowerCase()) {
    case 'forte':
    case 'medio forte':
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

export function entry(value = '') {
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

export function water(value = '') {
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

export function surfaceInterval(isRepetitive: boolean, surfIntervalInMinutes: number) {
  if (!isRepetitive) {
    return;
  }
  const normalized = Math.floor(surfIntervalInMinutes);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return timeFromValues([hours, minutes, 0]);
}

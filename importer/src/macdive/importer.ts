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
} from '../dive';
import { tankName } from '../dive/tank';
import { datetime, time } from '../formats';
import { Dive, Logbook, Sample, UsedGas } from '../types';

import { Dive as MacDiveDive, RawLogbook } from './types';
import { diveExitTime } from '../helpers/dive-exit-time';

function getOptionalProp<T>(group: string | Record<string, T | T[]>, prop: string) {
  if (typeof group === 'string') {
    return [];
  }

  const g = group[prop];

  if (Array.isArray(g)) {
    return g;
  }

  return [g];
}

export function parseSamples(samples: Sample[]): Sample[] {
  return samples.map((s) => {
    // Depth can't be < 0
    return { ...s, depth: Math.max(s.depth, 0) };
  });
}

function normalizeDive(dive: MacDiveDive): Dive {
  const dive_time = Math.floor(dive.duration / 60);
  const entryDate = new Date(dive.date);
  const exit_time = diveExitTime(dive.date, dive_time);

  const { site, weight } = dive;

  const tags = getOptionalProp(dive.tags, 'tag');
  const types = getOptionalProp(dive.types, 'type');
  const gear = getOptionalProp(dive.gear, 'item').map((i) => ({ ...i, serial: i.serial.toString() }));

  const weights = Number(weight);

  // just take the first
  const [gas] = getOptionalProp(dive.gases, 'gas');

  const clearedGases: UsedGas[] = [];
  let air_used = 0;

  if (gas) {
    const pressureStart = gas.pressureStart;
    const pressureEnd = gas.pressureEnd;
    const tankSize = gas.tankSize;

    air_used = (pressureStart - pressureEnd) * tankSize;

    clearedGases.push({
      double: gas.double !== 0,
      helium: gas.helium,
      oxygen: gas.oxygen,
      pressureEnd,
      pressureStart,
      tankName: tankName(tankSize, gas.tankName, gas.double !== 0),
      tankSize,
    });
  }

  const location = {
    country: dive.site.country,
    lat: Number(site.lat).toFixed(4),
    lng: Number(site.lon).toFixed(4),
    place: dive.site.location,
    site: dive.site.name,
  };

  const maxDepth = dive.maxDepth;
  const repetitive = dive.repetitiveDive;
  const samples = parseSamples(getOptionalProp(dive.samples, 'sample'));

  const data = {
    air_used,
    bottom_time: bottom_time(dive_time, maxDepth),
    buddies: buddies(getOptionalProp(dive.buddies, 'buddy'), dive.diveMaster),
    current: dive.current || '',
    current_normalized: normalizeCurrent(dive.current),
    date: datetime(entryDate),
    deco_stops: '-',
    dive_master: dive.diveMaster,
    dive_time,
    emersion_time: emersion_time(maxDepth),
    entry: entry(dive.entryType),
    entry_time: time(entryDate),
    exit_time,
    gases: clearedGases,
    gear,
    half_depth_break: half_depth_break(maxDepth),
    half_depth_break_time: half_depth_break_time(maxDepth),
    location,
    max_depth: maxDepth,
    notes: dive.notes,
    number: dive.diveNumber,
    repetitive,
    samples,
    surface: dive.surfaceConditions,
    surfaceInterval: surfaceInterval(repetitive > 1, dive.surfaceInterval),
    surface_normalized: normalizeSurface(dive.surfaceConditions),
    tags,
    types,
    visibility: dive.visibility,
    visibility_normalized: normalizeVisibility(dive.visibility),
    water: water(dive.site.waterType),
    weather: dive.weather,
    weather_normalized: normalizeWeather(dive.weather),
    weights,
  };
  return data;
}

function importer(logbook: RawLogbook): Logbook {
  const { dives } = logbook;
  return { dives: dives.map(normalizeDive) };
}

export default importer;

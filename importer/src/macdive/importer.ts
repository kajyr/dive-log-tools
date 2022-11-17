import { add } from 'date-fns';
import { datetime, time } from '../formats';

import {
  bottom_time,
  buddies,
  normalizeCurrent,
  emersion_time,
  entry,
  half_depth_break,
  half_depth_break_time,
  normalizeSurface,
  surfaceInterval,
  normalizeVisibility,
  normalizeWeather,
  water,
} from '../dive';

import { tankName } from '../dive/tank';

import { MacDive } from './types';
import { Dive, Logbook, Sample, UsedGas } from '../types';

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

function normalizeDive(dive: MacDive.Dive): Dive {
  const dive_time = Math.floor(dive.duration / 60);
  const entryDate = new Date(dive.date);
  const exitDate = add(entryDate, { minutes: dive_time });

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
      pressureStart,
      pressureEnd,
      oxygen: gas.oxygen,
      helium: gas.helium,
      double: gas.double !== 0,
      tankSize,
      tankName: tankName(tankSize, gas.tankName, gas.double !== 0),
    });
  }

  const location = {
    lat: Number(site.lat).toFixed(4),
    lng: Number(site.lon).toFixed(4),
    place: dive.site.location,
    country: dive.site.country,
    site: dive.site.name,
  };

  const maxDepth = dive.maxDepth;
  const repetitive = dive.repetitiveDive;
  const samples = parseSamples(getOptionalProp(dive.samples, 'sample'));

  const data = {
    air_used,
    bottom_time: bottom_time(dive_time, maxDepth),
    buddies: buddies(getOptionalProp(dive.buddies, 'buddy'), dive.diveMaster),
    current_normalized: normalizeCurrent(dive.current),
    current: dive.current || '',
    date: datetime(entryDate),
    deco_stops: '-',
    dive_master: dive.diveMaster,
    dive_time,
    emersion_time: emersion_time(maxDepth),
    entry_time: time(entryDate),
    entry: entry(dive.entryType),
    exit_time: time(exitDate),
    gases: clearedGases,
    gear,
    half_depth_break_time: half_depth_break_time(maxDepth),
    half_depth_break: half_depth_break(maxDepth),
    location,
    max_depth: maxDepth,
    notes: dive.notes,
    number: dive.diveNumber,
    repetitive,
    samples,
    surface_normalized: normalizeSurface(dive.surfaceConditions),
    surface: dive.surfaceConditions,
    surfaceInterval: surfaceInterval(repetitive > 1, dive.surfaceInterval),
    tags,
    types,
    visibility_normalized: normalizeVisibility(dive.visibility),
    visibility: dive.visibility,
    water: water(dive.site.waterType),
    weather_normalized: normalizeWeather(dive.weather),
    weather: dive.weather,
    weights,
  };
  return data;
}

function importer(logbook: MacDive.RawLogbook): Logbook {
  const { dives } = logbook;
  return { dives: dives.map(normalizeDive) };
}

export default importer;

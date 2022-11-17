import { add } from 'date-fns';
import { datetime, time } from '../formats';

import {
  bottom_time,
  buddies,
  emersion_time,
  entry,
  half_depth_break,
  half_depth_break_time,
  normalizeSurface,
  normalizeVisibility,
  normalizeCurrent,
  water,
  normalizeWeather,
} from '../dive';

import { tankName } from '../dive/tank';

import { Dive, Logbook } from '../types';
import { DivingLog } from './types';

function toBool(value: 'False' | 'True') {
  return value === 'True';
}

function normalizeDive(dive: DivingLog.Dive): Dive {
  const entryDate = new Date(`${dive.Divedate}T${dive.Entrytime}`);
  const exitdate = add(entryDate, { minutes: dive.Divetime });

  let surfaceInterval = '-';
  if (dive.Rep) {
    const [hours, minutes] = dive.Surfint.split(':');
    surfaceInterval = `${parseInt(hours, 10)}:${parseInt(minutes, 10)}`;
  }

  const gear = dive.UsedEquip.split(',').map((name: string) => ({ name, type: '', manufacturer: '', serial: '' }));

  const location = {
    lat: dive.Place.Lat.toFixed(4),
    lng: dive.Place.Lon.toFixed(4),
    place: dive.City ? dive.City.A_Name : '',
    country: dive.Country ? dive.Country.A_Name : '',
    site: dive.Place.A_Name,
  };

  const pressureStart = dive.PresE;
  const pressureEnd = dive.PresS;
  const tankSize = Number(dive.Tanksize);

  const gases = [
    {
      pressureStart,
      pressureEnd,
      tankSize,
      tankName: tankName(tankSize, null, dive.DblTank !== 'False'),
      oxygen: 0,
      helium: 0,
      double: false,
    },
  ];

  const dive_time = Number(dive.Divetime);

  const data = {
    air_used: (pressureEnd - pressureStart) * tankSize,
    bottom_time: bottom_time(dive_time, dive.Depth),
    buddies: buddies(dive.Buddy ? [dive.Buddy.A_Names] : [], dive.Divemaster),
    current: dive.UWCurrent || '',
    current_normalized: normalizeCurrent(dive.UWCurrent),
    date: datetime(entryDate),
    deco_stops: toBool(dive.Deco) ? dive.Decostops : '-',
    dive_time,
    dive_master: dive.Divemaster,
    emersion_time: emersion_time(dive.Depth),
    entry: entry(dive.Entry),
    entry_time: time(entryDate),
    exit_time: time(exitdate),
    gases,
    gear,
    half_depth_break: half_depth_break(dive.Depth),
    half_depth_break_time: half_depth_break_time(dive.Depth),
    location,
    max_depth: Number(dive.Depth),
    notes: dive.Comments,
    number: Number(dive.Number),
    samples: [],
    surface: dive.Surface,
    surface_normalized: normalizeSurface(dive.Surface),
    surfaceInterval,
    tags: [],
    types: [dive.Divetype.toLowerCase()],
    visibility: dive.UWCurrent || '',
    visibility_normalized: normalizeVisibility(dive.UWCurrent),
    water: water(dive.Water),
    weather: dive.Weather,
    weather_normalized: normalizeWeather(dive.Weather),
    weights: Number(dive.Weight),
  };

  return data;
}

function importer(logbook: DivingLog.RawLogbook): Logbook {
  let dives: DivingLog.Dive[];

  if (Array.isArray(logbook.Divinglog.Logbook.Dive)) {
    dives = logbook.Divinglog.Logbook.Dive;
  } else {
    dives = [logbook.Divinglog.Logbook.Dive];
  }

  return { dives: dives.map(normalizeDive) };
}

export default importer;

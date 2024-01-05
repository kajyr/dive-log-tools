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
  water,
} from '../dive';
import { tankName } from '../dive/tank';
import { datetime, time } from '../formats';
import { Dive, Logbook } from '../types';

import { Dive as DivingLogDive, RawLogbook } from './types';
import { diveExitTime } from '../helpers/dive-exit-time';

function toBool(value: 'False' | 'True') {
  return value === 'True';
}

function normalizeDive(dive: DivingLogDive): Dive {
  const entryDate = new Date(`${dive.Divedate}T${dive.Entrytime}`);

  let surfaceInterval = '-';
  if (dive.Rep) {
    const [hours, minutes] = dive.Surfint.split(':');
    surfaceInterval = `${parseInt(hours, 10)}:${parseInt(minutes, 10)}`;
  }

  const gear = dive.UsedEquip.split(',').map((name: string) => ({ manufacturer: '', name, serial: '', type: '' }));

  const location = {
    country: dive.Country ? dive.Country.A_Name : '',
    lat: dive.Place.Lat.toFixed(4),
    lng: dive.Place.Lon.toFixed(4),
    place: dive.City ? dive.City.A_Name : '',
    site: dive.Place.A_Name,
  };

  const pressureStart = dive.PresE;
  const pressureEnd = dive.PresS;
  const tankSize = Number(dive.Tanksize);

  const gases = [
    {
      double: false,
      helium: 0,
      oxygen: 0,
      pressureEnd,
      pressureStart,
      tankName: tankName(tankSize, null, dive.DblTank !== 'False'),
      tankSize,
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
    dive_master: dive.Divemaster,
    dive_time,
    emersion_time: emersion_time(dive.Depth),
    entry: entry(dive.Entry),
    entry_time: time(entryDate),
    exit_time: diveExitTime(entryDate, dive_time),
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
    surfaceInterval,
    surface_normalized: normalizeSurface(dive.Surface),
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

function importer(logbook: RawLogbook): Logbook {
  let dives: DivingLogDive[];

  if (Array.isArray(logbook.Divinglog.Logbook.Dive)) {
    dives = logbook.Divinglog.Logbook.Dive;
  } else {
    dives = [logbook.Divinglog.Logbook.Dive];
  }

  return { dives: dives.map(normalizeDive) };
}

export default importer;

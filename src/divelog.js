const addMinutes = require('date-fns/add_minutes');
const format = require('date-fns/format');
const { datetime, time } = require('./formats');
const { clean } = require('./json');

const {
  bottom_time,
  buddies,
  current_is_calm,
  current_is_strong,
  current_is_weak,
  emersion_time,
  entry,
  half_depth_break,
  half_depth_break_time,
  surface_is_calm,
  surface_is_mid,
  surface_is_rough,
  visibility_is_enough,
  visibility_is_good,
  visibility_is_poor,
  water,
  weather_is_clear,
  weather_is_cloud,
  weather_is_rain,
} = require('./dive');

function normalizeDive(dive) {
  const cleanDive = clean(dive);
  const entryDate = new Date(`${cleanDive.Divedate}T${cleanDive.Entrytime}`);
  const exitdate = addMinutes(entryDate, cleanDive.Divetime);
  const profile = cleanDive.Profile ? cleanDive.Profile.P : [];
  const repetitive = cleanDive.Rep;
  let surfaceInterval = '-';
  if (cleanDive.Rep) {
    const [hours, minutes] = cleanDive.Surfint.split(':');
    surfaceInterval = `${parseInt(hours, 10)}:${parseInt(minutes, 10)}`;
  }

  const gear = []; // TODO

  const isAir = true;

  const location = {
    lat: cleanDive.Place.Lat.toFixed(4),
    lng: cleanDive.Place.Lon.toFixed(4),
    place: cleanDive.City ? cleanDive.City.$.Name : '',
    country: cleanDive.Country ? cleanDive.Country.$.Name : '',
    site: cleanDive.Place.$.Name,
  };

  const data = {
    air_used: (cleanDive.PresS - cleanDive.PresE) * cleanDive.Tanksize,
    bottom_time: bottom_time(cleanDive.Divetime, cleanDive.Depth),
    buddies: buddies(cleanDive.Buddy ? cleanDive.Buddy.$.Names : '', cleanDive.Divemaster),
    current: cleanDive.UWCurrent || '',
    current_is_calm: current_is_calm(cleanDive.UWCurrent),
    current_is_strong: current_is_strong(cleanDive.UWCurrent),
    current_is_weak: current_is_weak(cleanDive.UWCurrent),
    date: datetime(entryDate),
    deco_stops: cleanDive.Deco ? cleanDive.Decostops : '-',
    diveTime: cleanDive.Divetime,
    dive_master: cleanDive.Divemaster,
    emersion_time: emersion_time(cleanDive.Depth),
    entry: entry(cleanDive.Entry),
    entry_time: time(entryDate),
    exit_time: time(exitdate),
    gear,
    half_depth_break: half_depth_break(cleanDive.Depth),
    half_depth_break_time: half_depth_break_time(cleanDive.Depth),
    isAir,
    location,
    max_depth: cleanDive.Depth,
    notes: cleanDive.Comments,
    number: cleanDive.Number,
    pressure_end: cleanDive.PresE,
    pressure_start: cleanDive.PresS,
    repetitive,
    samples: profile,
    surface: cleanDive.Surface,
    surfaceInterval,
    surface_is_calm: surface_is_calm(cleanDive.Surface),
    surface_is_mid: surface_is_mid(cleanDive.Surface),
    surface_is_rough: surface_is_rough(cleanDive.Surface),
    type: cleanDive.Divetype.toLowerCase(),
    visibility: cleanDive.UWCurrent,
    visibility_is_enough: visibility_is_enough(cleanDive.UWCurrent),
    visibility_is_good: visibility_is_good(cleanDive.UWCurrent),
    visibility_is_poor: visibility_is_poor(cleanDive.UWCurrent),
    volume_start: cleanDive.PresS * cleanDive.Tanksize,
    volume_tank: cleanDive.Tanksize,
    water: water(cleanDive.Water),
    weather: cleanDive.Weather,
    weather_is_clear: weather_is_clear(cleanDive.Weather),
    weather_is_cloud: weather_is_cloud(cleanDive.Weather),
    weather_is_rain: weather_is_rain(cleanDive.Weather),
    weights: cleanDive.Weight,
  };

  return data;
}

const normalize = DirtyLogbook => {
  const [{ Dive }] = DirtyLogbook;
  return { dives: Dive.map(normalizeDive) };
};

function importer(raw) {
  const { Divinglog } = raw;
  const { Logbook } = Divinglog;
  return normalize(Logbook);
}

function canImport(raw) {
  return 'Divinglog' in raw;
}

module.exports = {
  normalize,
  importer,
  canImport,
  normalizeDive,
};

const addMinutes = require('date-fns/add_minutes');
const format = require('date-fns/format');
const { datetime, time } = require('./formats');
const { clean } = require('./json');

const {
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

  const gear = cleanDive.UsedEquip.split(',').map(name => ({ name, type: '', manufacturer: '', serial: '' }));

  const location = {
    lat: cleanDive.Place.Lat.toFixed(4),
    lng: cleanDive.Place.Lon.toFixed(4),
    place: cleanDive.City ? cleanDive.City.$.Name : '',
    country: cleanDive.Country ? cleanDive.Country.$.Name : '',
    site: cleanDive.Place.$.Name,
  };
  const gases = [
    {
      pressureStart: cleanDive.PresE,
      pressureEnd: cleanDive.PresS,
      tankSize: cleanDive.Tanksize,
      volumeStart: cleanDive.PresS * cleanDive.Tanksize,
    },
  ];
  const data = {
    air_used: (cleanDive.PresS - cleanDive.PresE) * cleanDive.Tanksize,
    bottom_time: bottom_time(cleanDive.Divetime, cleanDive.Depth),
    buddies: buddies(cleanDive.Buddy ? cleanDive.Buddy.$.Names : '', cleanDive.Divemaster),
    current: cleanDive.UWCurrent || '',
    current_normalized: normalizeCurrent(cleanDive.UWCurrent),
    date: datetime(entryDate),
    deco_stops: cleanDive.Deco ? cleanDive.Decostops : '-',
    dive_time: cleanDive.Divetime,
    dive_master: cleanDive.Divemaster,
    emersion_time: emersion_time(cleanDive.Depth),
    entry: entry(cleanDive.Entry),
    entry_time: time(entryDate),
    exit_time: time(exitdate),
    gases,
    gear,
    half_depth_break: half_depth_break(cleanDive.Depth),
    half_depth_break_time: half_depth_break_time(cleanDive.Depth),
    location,
    max_depth: cleanDive.Depth,
    notes: cleanDive.Comments,
    number: cleanDive.Number,
    repetitive,
    samples: profile,
    surface: cleanDive.Surface,
    surface_normalized: normalizeSurface(cleanDive.Surface),
    surfaceInterval,
    tags: [],
    type: cleanDive.Divetype.toLowerCase(),
    visibility: cleanDive.UWCurrent,
    visibility_normalized: normalizeVisibility(cleanDive.UWCurrent),
    water: water(cleanDive.Water),
    weather: cleanDive.Weather,
    weather_normalized: normalizeWeather(cleanDive.Weather),
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

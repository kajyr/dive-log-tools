const { add } = require('date-fns');
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

const { tankName } = require('./dive/tank');

function normalizeDive(dive) {
  const cleanDive = clean(dive);
  const entryDate = new Date(`${cleanDive.Divedate}T${cleanDive.Entrytime}`);
  const exitdate = add(entryDate, { minutes: cleanDive.Divetime });
  const profile = cleanDive.Profile ? cleanDive.Profile.P : [];
  const repetitive = cleanDive.Rep;
  if (repetitive) {
    console.warn('Repetitive numbering support not yet availabe ln DiveLog importer');
  }
  let surfaceInterval = '-';
  if (cleanDive.Rep) {
    const [hours, minutes] = cleanDive.Surfint.split(':');
    surfaceInterval = `${parseInt(hours, 10)}:${parseInt(minutes, 10)}`;
  }

  const gear = cleanDive.UsedEquip.split(',').map((name) => ({ name, type: '', manufacturer: '', serial: '' }));

  const location = {
    lat: Number(cleanDive.Place.Lat).toFixed(4),
    lng: Number(cleanDive.Place.Lon).toFixed(4),
    place: cleanDive.City ? cleanDive.City.$.Name : '',
    country: cleanDive.Country ? cleanDive.Country.$.Name : '',
    site: cleanDive.Place.$.Name,
  };

  const pressureStart = Number(cleanDive.PresE);
  const pressureEnd = Number(cleanDive.PresS);
  const tankSize = Number(cleanDive.Tanksize);

  const gases = [
    {
      pressureStart,
      pressureEnd,
      tankSize,
      tankName: tankName(tankSize, null, cleanDive.DblTank !== 'False'),
      volumeStart: pressureEnd * tankSize,
    },
  ];

  const dive_time = Number(cleanDive.Divetime);

  const data = {
    air_used: (pressureEnd - pressureStart) * tankSize,
    bottom_time: bottom_time(dive_time, cleanDive.Depth),
    buddies: buddies(cleanDive.Buddy ? cleanDive.Buddy.$.Names : '', cleanDive.Divemaster),
    current: cleanDive.UWCurrent || '',
    current_normalized: normalizeCurrent(cleanDive.UWCurrent),
    date: datetime(entryDate),
    deco_stops: cleanDive.Deco ? cleanDive.Decostops : '-',
    dive_time,
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
    max_depth: Number(cleanDive.Depth),
    notes: cleanDive.Comments,
    number: Number(cleanDive.Number),
    samples: profile,
    surface: cleanDive.Surface,
    surface_normalized: normalizeSurface(cleanDive.Surface),
    surfaceInterval,
    tags: [],
    types: [cleanDive.Divetype.toLowerCase()],
    visibility: cleanDive.UWCurrent,
    visibility_normalized: normalizeVisibility(cleanDive.UWCurrent),
    water: water(cleanDive.Water),
    weather: cleanDive.Weather,
    weather_normalized: normalizeWeather(cleanDive.Weather),
    weights: Number(cleanDive.Weight),
  };

  return data;
}

const normalize = (DirtyLogbook) => {
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

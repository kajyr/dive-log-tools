const addMinutes = require('date-fns/add_minutes');
const { datetime, time } = require('./formats');
const { clean } = require('./json');

const {
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
} = require('./dive');

/**
 * In case there are no samples MacDIve will put there just one,
 * so the cleaner might thing that samples is an object.
 *
 * In this case we just discard the data and set an empty object
 * @param {*} dive
 */
function fixSamplesIfMissing(dive) {
  if (Array.isArray(dive.samples.sample)) {
    return dive;
  }
  return { ...dive, samples: {} };
}

function fixGearIfMissing(dive) {
  if (typeof dive.gear !== 'string') {
    return { ...dive, gear: dive.gear.item };
  }
  return { ...dive, gear: [] };
}

function parseArray(raw, key) {
  if (typeof raw === 'string') {
    return [];
  }
  return [].concat(raw[key]);
}

function normalizeDive(dive) {
  const cleanDive = fixGearIfMissing(fixSamplesIfMissing(clean(dive)));

  const dive_time = Math.floor(cleanDive.duration / 60);

  const entryDate = new Date(cleanDive.date);
  const exitDate = addMinutes(entryDate, dive_time);

  const {
    gases,
    samples: { sample = [] },
    site,
    gear,
    weight,
  } = cleanDive;

  const tags = parseArray(cleanDive.tags, 'tag');
  const types = parseArray(cleanDive.types, 'type');

  const weights = typeof weight === 'number' ? weight : undefined;

  const { gas } = gases;
  const repetitive = cleanDive.repetitiveDive > 1;

  const lat = site.lat > 0 ? site.lat.toFixed(4) : '';
  const lng = site.lon > 0 ? site.lon.toFixed(4) : '';

  const clearedGases = [];
  if (gas) {
    clearedGases.push({
      pressureStart: gas.pressureStart,
      pressureEnd: gas.pressureEnd,
      oxygen: gas.oxygen,
      helium: gas.helium,
      double: gas.double !== 0,
      tankSize: gas.tankSize,
      volumeStart: gas.pressureStart * gas.tankSize,
    });
  }

  const location = {
    lat,
    lng,
    place: cleanDive.site.location,
    country: cleanDive.site.country,
    site: cleanDive.site.name,
  };

  const data = {
    air_used: gas ? (gas.pressureStart - gas.pressureEnd) * gas.tankSize : undefined,
    bottom_time: bottom_time(dive_time, cleanDive.maxDepth),
    buddies: buddies(
      typeof cleanDive.buddies === 'string' ? cleanDive.buddies : cleanDive.buddies.buddy,
      cleanDive.diveMaster,
    ),
    current_normalized: normalizeCurrent(cleanDive.current),
    current: cleanDive.current || '',
    date: datetime(entryDate),
    deco_stops: '-',
    dive_master: cleanDive.diveMaster,
    dive_time,
    emersion_time: emersion_time(cleanDive.maxDepth),
    entry_time: time(entryDate),
    entry: entry(cleanDive.entryType),
    exit_time: time(exitDate),
    gases: clearedGases,
    gear,
    half_depth_break_time: half_depth_break_time(cleanDive.maxDepth),
    half_depth_break: half_depth_break(cleanDive.maxDepth),
    location,
    max_depth: cleanDive.maxDepth,
    notes: cleanDive.notes,
    number: cleanDive.diveNumber,
    repetitive,
    samples: sample,
    surface_normalized: normalizeSurface(cleanDive.surfaceConditions),
    surface: cleanDive.surfaceConditions,
    surfaceInterval: surfaceInterval(repetitive, cleanDive.surfaceInterval),
    tags,
    types,
    visibility_normalized: normalizeVisibility(cleanDive.visibility),
    visibility: cleanDive.visibility,
    water: water(cleanDive.site.waterType),
    weather_normalized: normalizeWeather(cleanDive.weather),
    weather: cleanDive.weather,
    weights,
  };
  return data;
}

function importer(raw) {
  const { dives } = raw;
  const { dive } = dives;
  return { dives: dive.map(normalizeDive) };
}

module.exports = {
  importer,
  normalizeDive,
};

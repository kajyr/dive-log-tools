const add = require('date-fns/add');
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

const { tankName } = require('./dive/tank');
const { parseSamples } = require('./dive/samples');

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

function parseArray(raw, key) {
  if (typeof raw === 'string') {
    return [];
  }
  return [].concat(raw[key]);
}

function normalizeDive(dive) {
  const cleanDive = fixSamplesIfMissing(clean(dive));

  const dive_time = Math.floor(cleanDive.duration / 60);

  const entryDate = new Date(cleanDive.date);
  const exitDate = add(entryDate, { minutes: dive_time });

  const {
    gases,
    samples: { sample = [] },
    site,
    weight,
  } = cleanDive;

  const tags = parseArray(cleanDive.tags, 'tag');
  const types = parseArray(cleanDive.types, 'type');
  const gear = parseArray(cleanDive.gear, 'item');

  const weights = Number(weight);

  const { gas } = gases;

  const clearedGases = [];
  const pressureStart = gas ? Number(gas.pressureStart) : undefined;
  const pressureEnd = gas ? Number(gas.pressureEnd) : undefined;
  const tankSize = gas ? Number(gas.tankSize) : undefined;

  if (gas) {
    clearedGases.push({
      pressureStart,
      pressureEnd,
      oxygen: Number(gas.oxygen),
      helium: Number(gas.helium),
      double: gas.double !== '0',
      tankSize,
      tankName: tankName(tankSize, gas.tankName, gas.double !== 0),
      volumeStart: pressureStart * tankSize,
    });
  }

  const location = {
    lat: Number(site.lat).toFixed(4),
    lng: Number(site.lon).toFixed(4),
    place: cleanDive.site.location,
    country: cleanDive.site.country,
    site: cleanDive.site.name,
  };

  const maxDepth = Number(cleanDive.maxDepth);
  const repetitive = Number(cleanDive.repetitiveDive);

  const data = {
    air_used: gas ? (pressureStart - pressureEnd) * tankSize : undefined,
    bottom_time: bottom_time(dive_time, maxDepth),
    buddies: buddies(parseArray(cleanDive.buddies, 'buddy'), cleanDive.diveMaster),
    current_normalized: normalizeCurrent(cleanDive.current),
    current: cleanDive.current || '',
    date: datetime(entryDate),
    deco_stops: '-',
    dive_master: cleanDive.diveMaster,
    dive_time,
    emersion_time: emersion_time(maxDepth),
    entry_time: time(entryDate),
    entry: entry(cleanDive.entryType),
    exit_time: time(exitDate),
    gases: clearedGases,
    gear,
    half_depth_break_time: half_depth_break_time(maxDepth),
    half_depth_break: half_depth_break(maxDepth),
    location,
    max_depth: maxDepth,
    notes: cleanDive.notes,
    number: Number(cleanDive.diveNumber),
    repetitive,
    samples: parseSamples(sample),
    surface_normalized: normalizeSurface(cleanDive.surfaceConditions),
    surface: cleanDive.surfaceConditions,
    surfaceInterval: surfaceInterval(repetitive > 1, cleanDive.surfaceInterval),
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

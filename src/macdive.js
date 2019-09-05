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

function normalizeDive(dive) {
  const cleanDive = fixSamplesIfMissing(clean(dive));

  const dive_time = Math.floor(cleanDive.duration / 60);

  const entryDate = new Date(cleanDive.date);
  const exitDate = addMinutes(entryDate, dive_time);

  const {
    gases,
    samples: { sample = [] },
    site,
    gear,
  } = cleanDive;

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
    current: cleanDive.current || '',
    current_normalized: normalizeCurrent(cleanDive.current),
    date: datetime(entryDate),
    deco_stops: '-',
    dive_time,
    dive_master: cleanDive.diveMaster,
    emersion_time: emersion_time(cleanDive.maxDepth),
    entry: entry(cleanDive.entryType),
    entry_time: time(entryDate),
    exit_time: time(exitDate),
    gases: clearedGases,
    gear: gear.item,
    half_depth_break: half_depth_break(cleanDive.maxDepth),
    half_depth_break_time: half_depth_break_time(cleanDive.maxDepth),
    location,
    max_depth: cleanDive.maxDepth,
    notes: cleanDive.notes,
    number: cleanDive.diveNumber,
    repetitive,
    samples: sample,
    surface: cleanDive.surfaceConditions,
    surface_normalized: normalizeSurface(cleanDive.surfaceConditions),
    surfaceInterval: surfaceInterval(repetitive, cleanDive.surfaceInterval),
    type: (cleanDive.types.type || '').toLowerCase(),
    visibility: cleanDive.visibility,
    visibility_normalized: normalizeVisibility(cleanDive.visibility),
    water: water(cleanDive.site.waterType),
    weather: cleanDive.weather,
    weather_normalized: normalizeWeather(cleanDive.weather),
    weights: cleanDive.weight,
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

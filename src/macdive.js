const addMinutes = require('date-fns/add_minutes');
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
  surfaceInterval,
  visibility_is_enough,
  visibility_is_good,
  visibility_is_poor,
  water,
  weather_is_clear,
  weather_is_cloud,
  weather_is_rain,
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
    gases: { gas },
    samples: { sample = [] },
    site,
    gear,
  } = cleanDive;
  const repetitive = cleanDive.repetitiveDive > 1;

  const lat = site.lat > 0 ? site.lat.toFixed(4) : '';
  const lng = site.lon > 0 ? site.lon.toFixed(4) : '';

  const location = {
    lat,
    lng,
    place: cleanDive.site.location,
    country: cleanDive.site.country,
    site: cleanDive.site.name,
  };

  const data = {
    air_used: (gas.pressureStart - gas.pressureEnd) * gas.tankSize,
    bottom_time: bottom_time(dive_time, cleanDive.maxDepth),
    buddies: buddies(
      typeof cleanDive.buddies === 'string' ? cleanDive.buddies : cleanDive.buddies.buddy,
      cleanDive.diveMaster,
    ),
    current: cleanDive.current || '',
    current_is_calm: current_is_calm(cleanDive.current),
    current_is_strong: current_is_strong(cleanDive.current),
    current_is_weak: current_is_weak(cleanDive.current),
    date: datetime(entryDate),
    deco_stops: '-',
    dive_time,
    dive_master: cleanDive.diveMaster,
    emersion_time: emersion_time(cleanDive.maxDepth),
    entry: entry(cleanDive.entryType),
    entry_time: time(entryDate),
    exit_time: time(exitDate),
    gear: gear.item,
    half_depth_break: half_depth_break(cleanDive.maxDepth),
    half_depth_break_time: half_depth_break_time(cleanDive.maxDepth),
    location,
    max_depth: cleanDive.maxDepth,
    notes: cleanDive.notes,
    number: cleanDive.diveNumber,
    pressure_end: gas.pressureEnd,
    pressure_start: gas.pressureStart,
    repetitive,
    samples: sample,
    surface: cleanDive.surfaceConditions,
    surfaceInterval: surfaceInterval(repetitive, cleanDive.surfaceInterval),
    surface_is_calm: surface_is_calm(cleanDive.surfaceConditions),
    surface_is_mid: surface_is_mid(cleanDive.surfaceConditions),
    surface_is_rough: surface_is_rough(cleanDive.surfaceConditions),
    type: (cleanDive.types.type || '').toLowerCase(),
    visibility: cleanDive.visibility,
    visibility_is_enough: visibility_is_enough(cleanDive.visibility),
    visibility_is_good: visibility_is_good(cleanDive.visibility),
    visibility_is_poor: visibility_is_poor(cleanDive.visibility),
    volume_start: gas.pressureStart * gas.tankSize,
    volume_tank: gas.tankSize,
    water: water(cleanDive.site.waterType),
    weather: cleanDive.weather,
    weather_is_clear: weather_is_clear(cleanDive.weather),
    weather_is_cloud: weather_is_cloud(cleanDive.weather),
    weather_is_rain: weather_is_rain(cleanDive.weather),
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

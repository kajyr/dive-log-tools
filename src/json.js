const omap = (object, fn) =>
  Object.keys(object).reduce((acc, key) => {
    acc[key] = fn(object[key]);
    return acc;
  }, {});

const cleanArray = value => {
  if (Array.isArray(value)) {
    if (value.length === 1) {
      return cleanValue(value[0]);
    }
    return value.map(cleanValue);
  }
  return value;
};

function cleanBool(value) {
  if (value === 'True') {
    return true;
  }
  if (value === 'False') {
    return false;
  }
  return value;
}

const onlyDigits = /^[0-9\.\,]+$/;

const cleanFloat = value => {
  const type = typeof value;
  // Shortcut for numbers
  if (type === 'number') {
    return value;
  }

  if (type === 'string') {
    if (value.match(onlyDigits)) {
      const flo = parseFloat(value);
      if (!isNaN(flo)) {
        return flo;
      }
    }
  }

  return value;
};

const clean = value => (typeof value === 'object' && !Array.isArray(value) ? omap(value, cleanValue) : value);

const cleanStr = value => (typeof value === 'string' ? value.trim() : value);

const cleaners = [cleanArray, clean, cleanBool, cleanFloat, cleanStr];

const cleanValue = value => cleaners.reduce((val, cleaner) => cleaner(val), value);

module.exports = { clean, cleanFloat };

const { parse } = require('./xml');
const divinglog = require('./divelog');
const macdive = require('./macdive');

const importers = {
  divinglog,
  macdive,
};

function listImporters() {
  return Object.keys(importers);
}

function importer(xml) {
  return parse(xml).then(raw => {
    let logbook;
    if (importers.divinglog.canImport(raw)) {
      logbook = importers.divinglog.importer(raw);
    } else {
      logbook = importers.macdive.importer(raw);
    }

    return logbook;
  });
}

module.exports = { importer, listImporters };

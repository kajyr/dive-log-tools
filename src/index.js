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
  return parse(file).then(xml => {
    let logbook;
    if (importers.divinglog.canImport(xml)) {
      logbook = importers.divinglog.importer(xml);
    } else {
      logbook = importers.macdive.importer(xml);
    }

    return logbook;
  });
}

module.exports = { importer, listImporters };

const path = require('path');
const { ensureDirSync } = require('fs-extra');
const { saveJson } = require('./lib/fs');
const enrich = require('./lib/enrichers');
const { importer } = require('dive-log-importer');
const pdfkit = require('./lib/pdfkit');
const { readFile } = require('fs/promises');
const { resolve, dirname } = require('path');

const EMPTY_LOGBOOK = {
  dives: [
    {
      gases: [{ pressureStart: '', pressureEnd: '' }],
      tags: [],
      entry: '',
      date: null,
      location: {},
      types: [],
      samples: [],
      entry_time: null,
    },
  ],
};

async function convert(file, dest, options) {
  const xml = await readFile(file, 'utf8');
  const logbook = await importer(xml);

  return process(logbook, dest, options);
}

async function convertEmpty(dest, options) {
  if (options.verbose) {
    console.log('Rendering empty template');
  }

  return process(EMPTY_LOGBOOK, dest, options);
}

async function process(logbook, dest, options) {
  const enriched = await enrich(logbook, options);
  const fullDest = resolve(dest);
  const folder = dirname(fullDest);
  ensureDirSync(folder);

  pdfkit(enriched, fullDest, options);

  if (options.debug) {
    const jsonDebugFile = path.join(folder, `logbook-debug.json`);
    await saveJson(jsonDebugFile, enriched);
  }
}

module.exports = {
  convert,
  convertEmpty,
};

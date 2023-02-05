import { importer } from 'dive-log-importer';
import { ensureDirSync } from 'fs-extra';
import path from 'path';
import { dirname, resolve } from 'path';

import { readFile } from 'fs/promises';

import enrich from './enrichers';
import { saveJson } from './fs';
import pdfkit from './pdfkit';
import { Options, PartialLogbook } from './types';

const EMPTY_LOGBOOK: PartialLogbook = {
  dives: [
    {
      date: '',
      entry: '',
      entry_time: '',
      gases: [],
      samples: [],
      tags: [],
      types: [],
    },
  ],
};

export async function convert(file: string, options: Options) {
  const xml = await readFile(file, 'utf8');
  const logbook = await importer(xml);

  if (logbook) {
    return process(logbook, options);
  }
}

export async function convertEmpty(options: Options) {
  if (options.verbose) {
    console.log('Rendering empty template');
  }

  return process(EMPTY_LOGBOOK, options);
}

async function process(logbook: PartialLogbook, options: Options) {
  const enriched = await enrich(logbook, options);
  const fullDest = resolve(options.dest);
  const folder = dirname(fullDest);
  ensureDirSync(folder);

  await pdfkit(enriched, fullDest, options);

  if (options.debug) {
    const jsonDebugFile = path.join(folder, `logbook-debug.json`);
    await saveJson(jsonDebugFile, enriched);
  }
}

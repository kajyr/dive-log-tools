import path from 'path';
import { ensureDirSync } from 'fs-extra';
import { saveJson } from './lib/fs';
import enrich from './lib/enrichers';
import { importer } from 'dive-log-importer';
import pdfkit from './lib/pdfkit';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { Options, PartialLogbook } from './lib/types';

const EMPTY_LOGBOOK: PartialLogbook = {
  dives: [
    {
      gases: [],
      tags: [],
      entry: '',
      date: '',
      types: [],
      samples: [],
      entry_time: '',
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

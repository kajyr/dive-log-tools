import { Dive } from 'dive-log-importer';
import { createWriteStream, readFileSync } from 'node:fs';
import { join, normalize } from 'node:path';
import PDFDocument from 'pdfkit';

import isTeachingDive from './neutrons/is-teaching-dive';
import didattica from './templates/ara-didattica';
import base from './templates/aria-nx-base';
import { PageFn } from './templates/types';

import { Options, PartialLogbook } from './types';

const PACKAGE_PATH = normalize(join(__dirname, '../package.json'));

function getPageFactory(options: Options, dive: Partial<Dive>) {
  if (options.template === 'base') {
    return base;
  } else if (options.template === 'didattica') {
    return didattica;
  }
  return isTeachingDive(dive) ? didattica : base;
}

async function init(logbook: PartialLogbook, dest: string, options: Options) {
  const pkg = JSON.parse(readFileSync(PACKAGE_PATH, 'utf8'));

  // Create a document
  const doc = new PDFDocument({
    autoFirstPage: false,
    permissions: {
      modifying: false,
      printing: 'highResolution',
    },
  });
  doc.pipe(createWriteStream(dest));

  // Set some meta data
  doc.info['Title'] = 'FIPSAS Logbook';
  doc.info['Author'] = 'Carlo Panzi';

  doc.font('Helvetica');
  doc.fontSize(12);

  const rev = logbook.dives.reverse();

  const pages: PageFn[] = [];
  for (const dive of rev) {
    const pageFactory = getPageFactory(options, dive);
    const pagesFns = await pageFactory(doc, dive, options, { version: pkg.version });
    pages.push(...pagesFns);
  }

  // Run the page functions
  pages.forEach(async (page) => {
    page(doc);
  });

  // Finalize PDF file
  doc.end();
}

export default init;

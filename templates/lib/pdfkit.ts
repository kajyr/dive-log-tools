import { createWriteStream, readFileSync } from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

import didattica from './pages/ara-didattica';
import base from './pages/aria-nx-base';
import { Options, PartialLogbook } from './types';

const PACKAGE_PATH = path.normalize(path.join(__dirname, '../package.json'));

async function init(logbook: PartialLogbook, dest: string, options: Options) {
  const pkg = JSON.parse(readFileSync(PACKAGE_PATH, 'utf8'));

  // Create a document
  const doc = new PDFDocument({
    autoFirstPage: false,
    permissions: {
      printing: 'highResolution',
      modifying: false,
    },
  });
  doc.pipe(createWriteStream(dest));

  // Set some meta data
  doc.info['Title'] = 'FIPSAS Logbook';

  doc.info['Author'] = 'Carlo Panzi';

  doc.font('Helvetica');
  doc.fontSize(12);

  const rev = logbook.dives.reverse();

  const pageRenderer = options.template === 'base' ? base : didattica;

  for (const dive of rev) {
    try {
      await pageRenderer(doc, dive, options, pkg.version);
    } catch (e) {
      console.log('error', e);
    }
  }

  // Finalize PDF file
  doc.end();
}

export default init;

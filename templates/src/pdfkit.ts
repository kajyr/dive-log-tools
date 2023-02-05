import { findNearestPackageJson } from 'find-nearest-package-json';
import { createWriteStream, readFileSync } from 'node:fs';
import PDFDocument from 'pdfkit';

import didattica from './pages/ara-didattica';
import base from './pages/aria-nx-base';

import { Options, PartialLogbook } from './types';

async function init(logbook: PartialLogbook, dest: string, options: Options) {
  const pkgObj = await findNearestPackageJson();

  const pkg = pkgObj.data;

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

  const pageRenderer = options.template === 'base' ? base : didattica;

  let pageCount = 0;
  for (const dive of rev) {
    const pages = await pageRenderer(doc, dive, options, { pageIndex: pageCount + 1, version: pkg.version });
    pageCount = pageCount + pages;
  }

  // Finalize PDF file
  doc.end();
}

export default init;

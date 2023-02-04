import { Doc } from '../types';

import { centerY } from './grid';

interface Options extends PDFKit.Mixins.TextOptions {
  valign?: 'center';
}

export function title(doc: Doc, label: string, x: number, y: number, fontSize = 12, options?: Options) {
  doc.fontSize(fontSize).font('Helvetica-Bold');
  if (options?.valign === 'center') {
    if (!options.height) {
      throw new Error('To use vertical alignement the height need to be set');
    }
    y = centerY(y, doc.heightOfString(label), options.height);
  }
  doc.text(label, x, y, options).font('Helvetica').fontSize(8);
}

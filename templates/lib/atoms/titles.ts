import { center } from '../neutrons/math';
import { Doc } from '../types';

interface Options extends PDFKit.Mixins.TextOptions {
  valign?: 'center';
}

export function title(doc: Doc, label: string, x: number, y: number, fontSize = 12, options?: Options) {
  doc.fontSize(fontSize).font('Helvetica-Bold');
  if (options?.valign === 'center') {
    if (!options.height) {
      throw new Error('To use vertical alignement the height need to be set');
    }
    y = center(y, options.height, doc.heightOfString(label));
  }
  doc.text(label, x, y, options).font('Helvetica').fontSize(8);
}

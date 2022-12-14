import { sign, SignOpts } from '../pdfkit/lib/dotSignature';
import { Doc } from '../types';
import { centerY } from './text';

function footer(doc: Doc, x: number, y: number, width: number, height: number, options?: SignOpts) {
  doc.fontSize(8);

  const cY = centerY(doc, y, height);

  doc.text('(C) FIPSAS 2019', x, cY, { width, align: 'center' });

  if (options) {
    const signature = sign(options);
    doc.text(signature, x, cY, { width, align: 'right' });
  }
}

export default footer;
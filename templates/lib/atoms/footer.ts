import { SignOpts, sign } from '../pdfkit/lib/dotSignature';
import { Doc } from '../types';

import { centerY } from './text';

export const FOOTER_HEIGHT = 15;

function footer(doc: Doc, x: number, y: number, width: number, height: number, options?: SignOpts) {
  doc.fontSize(8);

  const cY = centerY(doc, y, height);

  doc.text(`© FIPSAS 2023`, x, cY, { align: 'center', width });

  if (options) {
    const signature = sign(options);
    doc.text(signature, x, cY, { align: 'right', width });
  }
}

export default footer;

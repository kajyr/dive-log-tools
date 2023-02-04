import { Area, Doc } from '../types';

import { centerY } from './text';

export const FOOTER_HEIGHT = 15;

export type SignOpts = { version: string; isFake: boolean };

export function sign({ version, isFake }: SignOpts) {
  const s = [isFake ? ':' : '.'];

  return `${s.join('')} ${version}`;
}

function footer(doc: Doc, area: Area, options?: SignOpts) {
  doc.fontSize(8);

  const cY = centerY(doc, area.y, area.h);

  doc.text(`© FIPSAS 2023`, area.x, cY, { align: 'center', width: area.w });

  if (options) {
    const signature = sign(options);
    doc.text(signature, area.x, cY, { align: 'right', width: area.w });
  }
}

export default footer;

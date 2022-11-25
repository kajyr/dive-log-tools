import { Doc } from '../types';

import { centerY } from './text';

const padding = 2;

function label(
  doc: Doc,
  text: string,
  letter: string | null,
  x: number,
  y: number,
  w: number,
  h: number,
  align = 'right',
) {
  doc.fontSize(6);
  const letter_str = `(${letter})`;
  const letterW = letter ? doc.widthOfString(letter_str) : 0;

  const width = letter ? w - letterW - padding : w;

  doc.fontSize(8).text(text, x, centerY(doc, y, h), { width, align });

  if (letter) {
    doc
      .fontSize(6)
      .text(letter_str, x + w - letterW, centerY(doc, y, h))
      .fontSize(8);
  }
}

export default label;

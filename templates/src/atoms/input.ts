import { LINE_WIDTH } from '../constants/page';
import { Doc, Value } from '../types';

import { centerY } from './text';

type Option = { fullBorder?: boolean };

export function input(doc: Doc, x: number, y: number, w: number, h: number, value: Value, options: Option = {}) {
  const { fullBorder } = options;
  const fieldborderY = y + h;

  const hLine = LINE_WIDTH / 2;

  if (!fullBorder) {
    doc.rect(x, y, w, h).fill('white');

    doc
      .moveTo(x, fieldborderY)
      .lineTo(x + w, fieldborderY)
      .stroke();
  } else {
    doc.rect(x + hLine, y + hLine, w - LINE_WIDTH, h - LINE_WIDTH).fillAndStroke('white', 'black');
  }
  doc.fillColor('black');

  if (value) {
    doc.text(String(value), x + 3, centerY(doc, y, h), { ellipsis: true, height: h, width: w - 3 });
  }
}

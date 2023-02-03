import { centerY } from '../atoms/text';
import { LINE_WIDTH } from '../constants/page';
import { Doc, Value } from '../types';

export const vInputs = (doc: Doc, x: number, y: number, w: number, rowH: number, values: Value[]) => {
  /*     debugSquare(doc, x, y, w, h);
   */ const h = rowH * values.length;
  const hLine = LINE_WIDTH / 2;

  doc.rect(x + hLine, y + hLine, w - LINE_WIDTH, h - LINE_WIDTH).fillAndStroke('white', 'black');
  doc.fillColor('black');
  values.forEach((v, index) => {
    const lineY = y + rowH * index;
    if (index > 0) {
      doc
        .moveTo(x, lineY)
        .lineTo(x + w, lineY)
        .stroke();
    }
    if (v) {
      doc.text(String(v), x + 3, centerY(doc, lineY, rowH), {
        ellipsis: true,
        height: rowH,
        width: w - 3,
      });
    }
  });
};

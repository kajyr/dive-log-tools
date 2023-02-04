import { padding } from '../neutrons/area';
import { Area, AreaFn, Doc } from '../types';

const SQUARE_SIDE = 13;
const LINE_COLOR = '#DEDEDE';

export function squares(doc: Doc, area: Area, contentFn?: AreaFn) {
  doc.rect(area.x, area.y, area.w, area.h).fillAndStroke('white', LINE_COLOR).fillColor('black');

  let vx = area.x;
  while (vx < area.x + area.w) {
    doc
      .moveTo(vx, area.y)
      .lineTo(vx, area.y + area.h)
      .stroke(LINE_COLOR);
    vx += SQUARE_SIDE;
  }

  let vy = area.y;
  while (vy < area.y + area.h) {
    doc
      .moveTo(area.x, vy)
      .lineTo(area.x + area.w, vy)
      .stroke(LINE_COLOR);
    vy += SQUARE_SIDE;
  }

  if (typeof contentFn === 'function') {
    contentFn(padding(area, 5));
  }
}

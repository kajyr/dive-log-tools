import { Area, AreaFn, Doc } from '../types';

const SQUARE_SIDE = 13;
const LINE_COLOR = '#DEDEDE';

export function squares(doc: Doc, area: Area, content?: AreaFn) {
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

  const padding = 5;

  const content_w = area.w - padding * 2;
  const content_h = area.h - padding * 2;

  if (typeof content === 'function') {
    content({ h: content_h, w: content_w, x: area.x + padding, y: area.y + padding });
  } else if (typeof content === 'string') {
    doc
      .fontSize(10)
      .text(content, area.x + padding, area.y + padding, {
        height: content_h,
        width: content_w,
      })
      .fontSize(8);
  }
}

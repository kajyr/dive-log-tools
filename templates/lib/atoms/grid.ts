import { fillMissing, spread } from '../neutrons/grid';
import { Area, Doc, PFN } from '../types';

import { debugSquare } from './debug';

type ListWithNulls = (number | null)[];

export function block(doc: Doc, startX: number, startY: number, width: number, height: number) {
  return (children: PFN) => children(doc, startX, startY, width, height);
}
/**
 *
 * @param list are percentages.
 */
export function columnsArea(list: ListWithNulls, area: Area, gutter: number): Area[] {
  let x = area.x;
  const availableWidth = area.w - gutter * (list.length - 1);

  return fillMissing(list, 100).map((perc) => {
    const w = (availableWidth / 100) * perc;
    const ret = { ...area, w: w, x };
    x = x + w + gutter;
    return ret;
  });
}

/*
    Fixed sizes in points instead of percentage
*/
export function columnsFixed(doc: Doc, list: ListWithNulls, area: Area, gutter: number): Area[] {
  return spread(list, area.x, area.w, gutter).map(([x, w]) => ({ ...area, w, x }));
}

export function rows(startY: number, height: number, number: number, gutter = 0) {
  const availableH = height - gutter * (number - 1);
  const rowH = availableH / number;

  const r = Array.from({ length: number }, (_, i) => startY + (rowH + gutter) * i);

  return {
    debug: (doc: Doc, x: number, w: number) => r.forEach((ry) => debugSquare(doc, x, ry, w, rowH)),
    r,
    rowH,
  };
}

export function rowsFixed(list: ListWithNulls, area: Area, gutter: number): Area[] {
  return spread(list, area.y, area.h, gutter).map(([y, h]) => ({ ...area, h, y }));
}

export function rowsFixedArea(list: ListWithNulls, area: Area, gutter: number): Area[] {
  return spread(list, area.y, area.h, gutter).map(([y, h]) => ({ ...area, h, y }));
}

export function centerY(y: number, elementHeight: number, containerHeight: number) {
  return y + (containerHeight - elementHeight) / 2;
}

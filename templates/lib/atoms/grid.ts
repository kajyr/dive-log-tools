import { fillMissing, spread } from '../neutrons/grid';
import { Area, AreaFn, Doc, PFN } from '../types';

import { debugSquare } from './debug';

type ListWithNulls = (number | null)[];

export function block(doc: Doc, startX: number, startY: number, width: number, height: number) {
  return (children: PFN) => children(doc, startX, startY, width, height);
}

export function blockArea(area: Area) {
  return (children: AreaFn) => children(area);
}

export function columnsArea(list: ListWithNulls, area: Area, gutter: number): ((children: AreaFn) => void)[] {
  let x = area.x;
  const availableWidth = area.w - gutter * (list.length - 1);

  return fillMissing(list, 100).map((perc) => {
    const w = (availableWidth / 100) * perc;
    const fn = blockArea({ ...area, w: w, x });
    x = x + w + gutter;
    return fn;
  });
}

export function columns(
  doc: Doc,
  list: ListWithNulls,
  startX: number,
  startY: number,
  width: number,
  height: number,
  gutter: number,
): ((children: PFN) => void)[] {
  let curX = startX;
  const availableWidth = width - gutter * (list.length - 1);

  return fillMissing(list, 100).map((perc) => {
    const bW = (availableWidth / 100) * perc;
    const fn = block(doc, curX, startY, bW, height);
    curX = curX + bW + gutter;
    return fn;
  });
}

/*
    Fixed sizes in points instead of percentage
*/
export function columnsFixed(
  doc: Doc,
  list: ListWithNulls,
  startX: number,
  startY: number,
  width: number,
  height: number,
  gutter: number,
) {
  return spread(list, startX, width, gutter).map(([x, w]) => block(doc, x, startY, w, height));
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

export function rowsFixed(list: ListWithNulls, y: number, h: number, gutter: number) {
  return spread(list, y, h, gutter).map(([y, h]) => ({ h, y }));
}

export function rowsFixedArea(list: ListWithNulls, area: Area, gutter: number) {
  return spread(list, area.y, area.h, gutter).map(([y, h]) => blockArea({ ...area, h, y }));
}

export function centerY(y: number, elementHeight: number, containerHeight: number) {
  return y + (containerHeight - elementHeight) / 2;
}

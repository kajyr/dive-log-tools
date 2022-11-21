import { debugSquare } from './debug';
import { fillMissing, spread } from '../neutrons/grid';
import { Doc, PFN } from '../types';

type ListWithNulls = (number | null)[];

export function block(doc: Doc, startX: number, startY: number, width: number, height: number) {
  return (children: PFN) => children(doc, startX, startY, width, height);
}

/**
 *
 * @param doc
 * @param list THe percentages of the various columns
 * @param startX
 * @param startY
 * @param width
 * @param height
 * @param gutter
 * @returns
 */
export function columns(
  doc: Doc,
  list: ListWithNulls,
  startX: number,
  startY: number,
  width: number,
  height: number,
  gutter: number,
) {
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
    rowH,
    r,
    debug: (doc: Doc, x: number, w: number) => r.forEach((ry) => debugSquare(doc, x, ry, w, rowH)),
  };
}

export function rowsFixed(list: ListWithNulls, y: number, h: number, gutter: number) {
  return spread(list, y, h, gutter).map(([y, h]) => ({ y, h }));
}

export function centerY(y: number, elementHeight: number, containerHeight: number) {
  return y + (containerHeight - elementHeight) / 2;
}

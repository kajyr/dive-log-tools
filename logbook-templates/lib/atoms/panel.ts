import { Doc, PFN } from '../types';

const COLOR_PANEL_BG = '#ccc';

export function panel(
  doc: Doc,
  startX: number,
  startY: number,
  width: number,
  height: number,
  padding: number,
  panelChildrenFn: PFN,
) {
  doc.rect(startX, startY, width, height).fillAndStroke(COLOR_PANEL_BG, 'black').fillColor('black');

  panelChildrenFn(doc, startX + padding, startY + padding, width - 2 * padding, height - 2 * padding);

  return [startX + width, startY + height];
}

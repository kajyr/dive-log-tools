import { padding as addPadding } from '../neutrons/area';
import { Area, AreaFn, Doc } from '../types';

const COLOR_PANEL_BG = '#ccc';

export function panel(doc: Doc, area: Area, padding: number, panelChildrenFn: AreaFn): void {
  doc.rect(area.x, area.y, area.w, area.h).fillAndStroke(COLOR_PANEL_BG, 'black').fillColor('black');

  panelChildrenFn(addPadding(area, padding));
}

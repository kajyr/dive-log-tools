import { centerY as gridCenterY } from '../atoms/grid';
import { Doc } from '../types';

export function centerY(doc: Doc, startY: number, height: number) {
  return gridCenterY(startY, doc.currentLineHeight(), height);
}

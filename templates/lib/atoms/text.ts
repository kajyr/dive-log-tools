import { Doc } from '../types';

export function centerY(doc: Doc, startY: number, height: number) {
  return startY + (height - doc.currentLineHeight()) / 2;
}

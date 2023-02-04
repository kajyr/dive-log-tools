import { center } from '../neutrons/math';
import { Doc } from '../types';

export function centerY(doc: Doc, startY: number, height: number) {
  return center(startY, height, doc.currentLineHeight());
}

import { Doc } from '../types';

const LINE_COLOR = '#DEDEDE';
const PADDING = 2;

function map(doc: Doc, x: number, y: number, w: number, h: number, image: string) {
  doc.rect(x, y, w, h).fillAndStroke('white', LINE_COLOR).fillColor('black');

  const mX = x + PADDING;
  const mY = y + PADDING;
  const mW = w - 2 * PADDING;

  doc.image(image, mX, mY, { width: mW });
}

export default map;

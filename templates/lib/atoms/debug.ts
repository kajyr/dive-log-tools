import { Doc } from '../types';

//import options from '../options';

const COLORS = ['blue', 'red', 'green', 'yellow', 'purple'];

export function debugSquare(doc: Doc, x: number, y: number, w: number, h: number, fill?: string) {
  //  const { verbose, debug } = options;
  const fillColor = typeof fill === 'string' ? fill : COLORS[Math.floor(Math.random() * COLORS.length)];
  /* if (debug) {
  if (verbose) {
    console.log(`${fillColor} debug box in [${x}, ${y}]`);
  }

}
*/
  doc.rect(x, y, w, h).fillOpacity(0.3).fill(fillColor).fillOpacity(1).fillColor('black');
}

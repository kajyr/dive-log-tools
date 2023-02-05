import { MARGINS_EVEN, MARGINS_ODD } from '../constants/page';
import { AreaFn, Doc } from '../types';

/*
 * A5 === 420 × 595 points
 */
const PAGE_W = 420;
const PAGE_H = 595;

function page(doc: Doc, isEven: boolean, content: AreaFn) {
  const margins = isEven ? MARGINS_EVEN : MARGINS_ODD;
  doc.addPage({
    margins,
    size: 'A5',
  });

  const contentWidth = PAGE_W - margins.left - margins.right;
  const contentHeight = PAGE_H - margins.top - margins.bottom;
  const area = { h: contentHeight, w: contentWidth, x: margins.left, y: margins.top };

  content(area);
}

export default page;

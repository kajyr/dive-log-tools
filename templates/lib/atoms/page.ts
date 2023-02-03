import { MARGINS_EVEN, MARGINS_ODD } from '../constants/page';
import { Doc, PFN } from '../types';

/*
 * A5 === 420 × 595 points
 */
const PAGE_W = 420;
const PAGE_H = 595;

function page(doc: Doc, isEven: boolean, content: PFN) {
  const margins = isEven ? MARGINS_EVEN : MARGINS_ODD;
  doc.addPage({
    margins,
    size: 'A5',
  });

  const contentWidth = PAGE_W - margins.left - margins.right;
  const contentHeight = PAGE_H - margins.top - margins.bottom;

  content(doc, margins.left, margins.top, contentWidth, contentHeight);
}

export default page;

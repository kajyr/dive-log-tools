import { Doc, PFN } from '../types';

/*
 * A5 === 420 × 595 points
 */
const PAGE_W = 420;
const PAGE_H = 595;

type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

function page(doc: Doc, margins: Margins, content: PFN) {
  doc.addPage({
    size: 'A5',
    margins,
  });

  const contentWidth = PAGE_W - margins.left - margins.right;
  const contentHeight = PAGE_H - margins.top - margins.bottom;

  content(doc, margins.left, margins.top, contentWidth, contentHeight);
}

export default page;

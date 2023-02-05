import { Component } from '../types';

import { title } from './titles';

const str = '(Compagno, Istruttore, Guida)';

export const BUDDIES_HEIGHT = 37;

const component: Component = (doc, area, dive) => {
  title(doc, 'CONVALIDA', area.x, area.y + 10, 9, { width: area.w });

  const textY = area.y + 25;
  const signatureX = area.x + doc.widthOfString(str) + 5;
  doc.text(str, area.x, textY);

  if (dive.buddies) {
    doc.fontSize(9).text(dive.buddies, signatureX, textY).fontSize(8);
  }

  const lineY = textY + 10;

  doc
    .moveTo(signatureX, lineY)
    .lineTo(area.x + area.w, lineY)
    .stroke();
};

export default component;

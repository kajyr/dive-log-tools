import { Component } from '../types';
import { title } from './titles';

const str = '(Compagno, Istruttore, Guida)';

const component: Component = (doc, x, y, w, h, dive) => {
  title(doc, 'CONVALIDA', x, y + 10, 9, { width: w });

  const textY = y + 25;
  const signatureX = x + doc.widthOfString(str) + 5;
  doc.text(str, x, textY);

  if (dive.buddies) {
    doc.fontSize(9).text(dive.buddies, signatureX, textY).fontSize(8);
  }

  const lineY = textY + 10;

  doc
    .moveTo(signatureX, lineY)
    .lineTo(x + w, lineY)
    .stroke();
};

export default component;

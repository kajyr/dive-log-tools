import path from 'path';

import { Area, Doc } from '../types';

import { centerY } from './text';

const IMAGES_PATH = path.normalize(path.join(__dirname, '../../templates/pdfkit'));

const FIPSAS_IMAGE_HEIGHT = 25;
const FIPSAS_IMAGE_WIDTH = 25;
export const HEADER_HEIGHT = 28;

function header(doc: Doc, title: string, area: Area) {
  let rightBorder = area.x + area.w;

  const cY = centerY(doc, area.y, area.h);

  const curX = area.x;
  /*   if (logo) {
    doc.image(`${IMAGES_PATH}/nettuno.png`, curX, startY, {
      height,
    });
    curX += LOGO_IMAGE_SIZE + 25; // ugh
  } */

  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text(title, curX, cY, {
      lineBreak: false,
    })
    .font('Helvetica');

  doc.image(`${IMAGES_PATH}/fipsas1x.png`, rightBorder - FIPSAS_IMAGE_WIDTH, area.y, {
    height: FIPSAS_IMAGE_HEIGHT,
  });
  rightBorder = rightBorder - FIPSAS_IMAGE_WIDTH;

  {
    const fip_str = 'F.I.P.S.A.S.';
    const fip_width = doc.widthOfString(fip_str) + 20;
    doc.text(fip_str, rightBorder - fip_width, cY, { align: 'right', width: fip_width });
  }

  return [area.x, area.y + area.h];
}

export default header;

import path from 'path';
import { centerY } from './text';
import { Doc } from '../types';

const IMAGES_PATH = path.normalize(path.join(__dirname, '../../templates/pdfkit'));

const FIPSAS_IMAGE_HEIGHT = 25;
const FIPSAS_IMAGE_WIDTH = 25;
const LOGO_IMAGE_SIZE = 25;

function header(doc: Doc, title: string, startX: number, startY: number, width: number, height: number) {
  //const { logo } = options;

  let rightBorder = startX + width;

  const cY = centerY(doc, startY, height);

  let curX = startX;
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

  doc.image(`${IMAGES_PATH}/fipsas1x.png`, rightBorder - FIPSAS_IMAGE_WIDTH, startY, {
    height: FIPSAS_IMAGE_HEIGHT,
  });
  rightBorder = rightBorder - FIPSAS_IMAGE_WIDTH;

  {
    const fip_str = 'F.I.P.S.A.S.';
    const fip_width = doc.widthOfString(fip_str) + 20;
    doc.text(fip_str, rightBorder - fip_width, cY, { align: 'right', width: fip_width });
  }

  return [startX, startY + height];
}

export default header;

import page from '../atoms/page';
import { squares } from '../atoms/squares';
import mapBlock from '../molecules/map';
import { trimNewLines } from '../neutrons/strings';
import { Doc, Options } from '../types';
import { block, rowsFixed } from '../atoms/grid';
import header from '../atoms/header';
import { title } from '../atoms/titles';
import { getImage } from '../neutrons/location';
import { PageFn } from '../templates/types';
import { Dive } from 'dive-log-importer';
import { PANELS_SPACING } from '../constants/page';
import { gearList } from '../neutrons/gear';
import footer from '../atoms/footer';

export async function pageBack(dive: Partial<Dive>, options: Options, pageTitle: string): Promise<PageFn> {
  const image = await getImage(dive, options);

  return (doc: Doc) => {
    page(doc, true, (pageArea) => {
      const hasMap = !!image;
      const mapHeight = hasMap ? 172 : 0;

      const [pHeader, pLabel, pSquares, pMap, pF] = rowsFixed([28, 30, null, mapHeight, 15], pageArea, PANELS_SPACING);

      header(doc, pageTitle, pHeader);

      const info = block(doc, pageArea.x, pLabel.y, pageArea.w, pLabel.h);

      info((doc: Doc, x: number, y: number, w: number) => {
        title(doc, 'ANNOTAZIONI', x, y, 9, { width: w });
        doc.text(
          "(compagni d'immersione, indirizzi, numeri telefonici, punti di riferimento, piantina della zona, profili della costa e dei fondali, osservazioni naturalistiche o archeologiche, ecc)",
          x,
          y + 10,
          { width: w },
        );
      });

      squares(doc, pSquares, (area) => {
        const options = {
          width: area.w,
        };
        if (dive.notes) {
          doc.fontSize(10);
          doc.text(trimNewLines(dive.notes), area.x, area.y, options);
        }

        const gearStr = gearList(dive);
        if (gearStr) {
          doc.fontSize(8);
          const text_height = doc.heightOfString(gearStr, options);
          doc.text(gearStr, area.x, area.y + area.h - text_height, options);
          doc.fontSize(10);
        }
      });

      if (hasMap) {
        mapBlock(doc, pageArea.x, pMap.y, pageArea.w, pMap.h, image);
      }

      footer(doc, pF);
    });
  };
}

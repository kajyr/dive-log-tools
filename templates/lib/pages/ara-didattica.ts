import { Dive } from 'dive-log-importer';

import buddies, { BUDDIES_HEIGHT } from '../atoms/buddies';
import footer, { FOOTER_HEIGHT } from '../atoms/footer';
import { block, columns, columnsFixed, rows, rowsFixed } from '../atoms/grid';
import header, { HEADER_HEIGHT } from '../atoms/header';
import page from '../atoms/page';
import { panel } from '../atoms/panel';
import { squares } from '../atoms/squares';
import { title } from '../atoms/titles';
import { LINE_WIDTH, PANELS_SPACING } from '../constants/page';
import { time } from '../format';
import { field, fieldWithFixedInput, fieldWithLowerSubLabel, field_date } from '../molecules/field';
import mapBlock from '../molecules/map';
import { lower } from '../neutrons/area';
import { consumo, getGases, volumeStart } from '../neutrons/gas';
import { gearList, getComputer, getSuit } from '../neutrons/gear';
import { getImage } from '../neutrons/location';
import { trimNewLines } from '../neutrons/strings';
import { getTempi } from '../neutrons/tempi';
import condizioni from '../organisms/condizioni';
import profilo from '../organisms/profilo';
import quadro1 from '../organisms/quadro1';
import { Doc, Maybe, Options, RenderOptions } from '../types';

const fWLS =
  (label: Maybe<string>, value: Maybe<string | number>, options?: any) => (d: Doc, x: number, y: number, w: number) =>
    fieldWithLowerSubLabel(d, x, y, w, label, value, options);

/**
 * This logbook layout assumes only one gas.
 * Returns the number of pages added
 */
async function draw(doc: Doc, dive: Partial<Dive>, options: Options, renderOptions: RenderOptions): Promise<number> {
  const [gas] = getGases(dive);
  const { tankName } = gas;

  const computer = getComputer(dive);
  const suit = getSuit(dive);
  const image = await getImage(dive, options);
  /* END DIVE RELATED THINGS */

  page(doc, false, (pageArea) => {
    doc.lineWidth(LINE_WIDTH);

    const [pHeader, pL, pQ1, pQ2, pB, pF] = rowsFixed(
      [HEADER_HEIGHT, 50, 92, null, BUDDIES_HEIGHT, FOOTER_HEIGHT],
      pageArea,
      PANELS_SPACING,
    );

    header(doc, 'SCHEDA ARIA (didattica)', pHeader);

    panel(doc, pL, 2, (area) => {
      panel(doc, area, 3, (area) => {
        const { r, rowH } = rows(area.y, area.h, 3, 2);
        doc.fontSize(10);

        const spacing = 5;

        field(doc, area.x, r[0], 130, rowH, 'Immersione N°', dive.number, { bold: true });
        const dateX = area.x + 130 + spacing;
        field_date(doc, dateX, r[0], area.w + area.x - dateX, rowH, 'Data', dive.date);

        const gpsW = 130;
        const locW = area.w - gpsW - spacing;

        field(doc, area.x, r[1], locW, rowH, 'Luogo', dive.location?.place, {
          bold: true,
          labelWidth: 45,
        });

        field(doc, area.x, r[2], locW, rowH, 'Punto', dive.location?.site, {
          bold: true,
          labelWidth: 45,
        });

        field(doc, area.x + area.w - gpsW, r[1], gpsW, rowH, 'Lat.', dive.location?.lat, {
          bold: true,
          labelWidth: 45,
        });
        field(doc, area.x + area.w - gpsW, r[2], gpsW, rowH, 'Long.', dive.location?.lng, {
          bold: true,
          labelWidth: 45,
        });
      });
    });

    quadro1(doc, pQ1);
    panel(doc, pQ2, 2, (area) => {
      const [q2, qScopo, qCond, qAttr, qProfilo, qRiassunto] = rowsFixed(
        [13, 21, 53, 34, null, 77],
        area,
        PANELS_SPACING,
      );

      panel(doc, q2, 3, (area) => {
        title(doc, "QUADRO 2 - DESCRIZIONE DELL'IMMERSIONE", area.x, area.y, 9, { width: area.w });
      });
      panel(doc, qScopo, 3, (area) => {
        const fieldW = area.w / 2;
        fieldWithLowerSubLabel(doc, area.x, area.y, fieldW, 'scopo', dive.types?.join(', '), {
          sublabel: '(didattica, svago, esplorazione, foto, ...)',
        });
        fieldWithLowerSubLabel(doc, area.x + fieldW + 10, area.y, fieldW - 10, 'tipo', dive.types?.join(','), {
          sublabel: '(da riva, da barca, secca, notturna, relitto,...)',
        });
      });
      condizioni(doc, qCond, dive);

      panel(doc, qAttr, 3, (area) => {
        // attrezzatura
        title(doc, 'ATTREZZATURA', area.x, area.y, 9, { width: area.w });

        const [a, b, c, d, e] = columnsFixed(doc, [37, 68, 34, 54, null], lower(area, 10), 3);

        a(
          fWLS(null, tankName, {
            sublabel: 'bombole(l)',
          }),
        );
        b(
          fWLS(null, suit.name, {
            sublabel: 'muta',
          }),
        );
        c(
          fWLS(null, dive.weights, {
            sublabel: 'zavorra (kg)',
          }),
        );
        d(
          fWLS(null, computer.name, {
            sublabel: 'tabelle / computer',
          }),
        );
        e(
          fWLS(null, null, {
            sublabel: 'altro',
          }),
        );
      });
      profilo(doc, qProfilo, dive);
      panel(doc, qRiassunto, 3, (area) => {
        const tempi = getTempi(dive);
        // quadro riassuntivo
        const titleW = area.w / 2 + 20;
        title(doc, "QUADRO RIASSUNTIVO DELL'IMMERSIONE", area.x, area.y, 9, { width: titleW });
        doc.text('tempi parziali', area.x + titleW, area.y, { align: 'right', width: area.w - titleW });

        const content = lower(area, 10);

        const [a, b, c] = columns(doc, [null, null, null], content.x, content.y, content.w, content.h, 15);
        const { r, rowH } = rows(content.y, content.h, 5, 2);

        const inputWidth = 30;

        a((doc, x, y, w) => {
          fieldWithFixedInput(doc, x, r[0], w, rowH, 'ora inizio imm.', dive.entry_time && time(dive.entry_time), {
            inputWidth,
          });
          fieldWithFixedInput(doc, x, r[1], w, rowH, 'durata', tempi.durata, {
            inputWidth,
            sublabel: 'B+C+D+E+F',
          });
          fieldWithFixedInput(doc, x, r[2], w, rowH, 'press. iniz.', gas.pressureStart, {
            inputWidth,
            sublabel: 'bar',
          });
          fieldWithFixedInput(doc, x, r[3], w, rowH, 'volume iniz.', volumeStart(gas), {
            inputWidth,
            sublabel: 'l',
          });
          fieldWithFixedInput(doc, x, r[4], w, rowH, 'FAR iniziale', null, {
            inputWidth,
          });
        });
        b((doc: Doc, x: number, y: number, w: number) => {
          fieldWithFixedInput(doc, x, r[0], w, rowH, 'ora fine imm.', dive.exit_time && time(dive.exit_time), {
            inputWidth,
          });
          fieldWithFixedInput(doc, x, r[1], w, rowH, 'prof. max.', dive.max_depth, {
            inputWidth,
            sublabel: 'm',
          });
          fieldWithFixedInput(doc, x, r[2], w, rowH, 'press. fin.', gas.pressureEnd, {
            inputWidth,
            sublabel: 'bar',
          });
          fieldWithFixedInput(doc, x, r[3], w, rowH, 'consumo', consumo(gas), {
            inputWidth,
            sublabel: 'l',
          });
          fieldWithFixedInput(doc, x, r[4], w, rowH, 'FAR finale', null, { inputWidth });
        });
        c((doc: Doc, x: number, y: number, w: number) => {
          fieldWithFixedInput(doc, x, r[0], w, rowH, 'tempo di fondo', tempi.bottom_time, {
            inputWidth,
            sublabel: 'B',
          });

          fieldWithFixedInput(doc, x, r[1], w, rowH, tempi.sostaProf.label, tempi.sostaProf.value, {
            inputWidth,
            sublabel: 'C',
          });
          fieldWithFixedInput(doc, x, r[2], w, rowH, 'risalita', tempi.risalita, {
            inputWidth,
            sublabel: 'D',
          });
          fieldWithFixedInput(doc, x, r[3], w, rowH, 'deco a 6m', '0', {
            inputWidth,
            sublabel: 'E',
          });
          fieldWithFixedInput(doc, x, r[4], w, rowH, 'sosta sic. + emers', dive.max_depth ? 3 + 2 : null, {
            inputWidth,
            sublabel: 'F',
          });
        });
      });
    });

    buddies(doc, pB, dive);

    footer(
      doc,
      { ...pageArea, ...pF },
      {
        isFake: !!dive.tags?.includes('fake'),
        version: renderOptions.version,
      },
    );
  });

  page(doc, true, (pageArea) => {
    const hasMap = !!image;
    const mapHeight = hasMap ? 172 : 0;

    const [pHeader, pLabel, pSquares, pMap, pF] = rowsFixed([28, 30, null, mapHeight, 15], pageArea, PANELS_SPACING);

    header(doc, 'SCHEDA ARIA (didattica)', pHeader);

    const info = block(doc, pageArea.x, pLabel.y, pageArea.w, pLabel.h);

    info((doc: Doc, x: number, y: number, w: number, h) => {
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

  return 2;
}

export default draw;

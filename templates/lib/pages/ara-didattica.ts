import { Maybe, Options, Doc } from '../types';

import header from '../atoms/header';
import footer from '../atoms/footer';
import buddies from '../atoms/buddies';
import { panel } from '../atoms/panel';
import { LINE_WIDTH, PANELS_SPACING } from '../constants/ara-didattica';
import { rows, rowsFixed, columns, columnsFixed, block } from '../atoms/grid';
import { title } from '../atoms/titles';
import page from '../atoms/page';
import { squares } from '../atoms/squares';
import { field, field_date, fieldWithLowerSubLabel, fieldWithFixedInput } from '../molecules/field';
import mapBlock from '../molecules/map';
import quadro1 from '../organisms/quadro1';
import condizioni from '../organisms/condizioni';
import profilo from '../organisms/profilo';
import { time } from '../format';
import { volumeStart, consumo, getGases } from '../neutrons/gas';
import { Dive } from 'dive-log-importer';
import { getComputer, getSuit } from '../neutrons/gear';
import { getImage } from '../neutrons/location';
import { getTempi } from '../neutrons/tempi';

const MARGINS = { top: 5, bottom: 15, left: 42, right: 17 };

const PAGE_2_MARGINS = {
  top: MARGINS.top,
  bottom: MARGINS.bottom,
  left: MARGINS.right,
  right: MARGINS.left,
};

const fWLS =
  (label: Maybe<string>, value: Maybe<string | number>, options?: any) => (d: Doc, x: number, y: number, w: number) =>
    fieldWithLowerSubLabel(d, x, y, w, label, value, options);

/**
 * This logbook layout assumes only one gas.
 */
async function draw(doc: Doc, dive: Partial<Dive>, options: Options, version: string) {
  const [gas] = getGases(dive);
  const { tankName } = gas;

  const computer = getComputer(dive);
  const suit = getSuit(dive);
  const image = await getImage(dive, options);
  /* END DIVE RELATED THINGS */

  page(doc, MARGINS, (doc: Doc, x: number, contentY: number, contentWidth: number, contentHeight: number) => {
    doc.lineWidth(LINE_WIDTH);

    const [pHeader, pL, pQ1, pQ2, pB, pF] = rowsFixed(
      [28, 50, 92, null, 37, 15],
      contentY,
      contentHeight,
      PANELS_SPACING,
    );

    header(doc, 'SCHEDA ARIA (didattica)', x, pHeader.y, contentWidth, pHeader.h);

    panel(doc, x, pL.y, contentWidth, pL.h, 2, (doc: Doc, xc: number, y: number, w: number, h: number) => {
      panel(doc, xc, y, w, h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        const { r, rowH } = rows(y, h, 3, 2);
        doc.fontSize(10);

        const spacing = 5;

        field(doc, x, r[0], 130, rowH, 'Immersione N°', dive.number, { bold: true });
        const dateX = x + 130 + spacing;
        field_date(doc, dateX, r[0], w + x - dateX, rowH, 'Data', dive.date);

        const gpsW = 130;
        const locW = w - gpsW - spacing;

        field(doc, x, r[1], locW, rowH, 'Luogo', dive.location?.place, {
          labelWidth: 45,
          bold: true,
        });

        field(doc, x, r[2], locW, rowH, 'Punto', dive.location?.site, {
          labelWidth: 45,
          bold: true,
        });

        field(doc, x + w - gpsW, r[1], gpsW, rowH, 'Lat.', dive.location?.lat, {
          labelWidth: 45,
          bold: true,
        });
        field(doc, x + w - gpsW, r[2], gpsW, rowH, 'Long.', dive.location?.lng, {
          labelWidth: 45,
          bold: true,
        });
      });
    });

    quadro1(doc, x, pQ1.y, contentWidth, pQ1.h, dive);
    panel(doc, x, pQ2.y, contentWidth, pQ2.h, 2, (doc: Doc, x: number, y: number, w: number, h: number) => {
      const [q2, qScopo, qCond, qAttr, qProfilo, qRiassunto] = rowsFixed(
        [13, 21, 53, 34, null, 77],
        y,
        h,
        PANELS_SPACING,
      );

      panel(doc, x, q2.y, w, q2.h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        title(doc, "QUADRO 2 - DESCRIZIONE DELL'IMMERSIONE", x, y, 9, { width: w });
      });
      panel(doc, x, qScopo.y, w, qScopo.h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        const fieldW = w / 2;
        fieldWithLowerSubLabel(doc, x, y, fieldW, 'scopo', dive.types?.join(', '), {
          sublabel: '(didattica, svago, esplorazione, foto, ...)',
        });
        fieldWithLowerSubLabel(doc, x + fieldW + 10, y, fieldW - 10, 'tipo', dive.types?.join(','), {
          sublabel: '(da riva, da barca, secca, notturna, relitto,...)',
        });
      });
      condizioni(doc, x, qCond.y, w, qCond.h, dive);

      panel(doc, x, qAttr.y, w, qAttr.h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        // attrezzatura
        title(doc, 'ATTREZZATURA', x, y, 9, { width: w });

        const [a, b, c, d, e] = columnsFixed(doc, [37, 68, 34, 54, null], x, y + 10, w, h - 10, 3);

        a(
          fWLS(null, tankName, {
            sublabel: 'bombole(l)',
          }),
        );
        b(
          fWLS(null, suit?.name, {
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
      profilo(doc, x, qProfilo.y, w, qProfilo.h, dive);
      panel(doc, x, qRiassunto.y, w, qRiassunto.h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        const tempi = getTempi(dive);
        // quadro riassuntivo
        const titleW = w / 2 + 20;
        title(doc, "QUADRO RIASSUNTIVO DELL'IMMERSIONE", x, y, 9, { width: titleW });
        doc.text('tempi parziali', x + titleW, y, { width: w - titleW, align: 'right' });

        const fieldsY = y + 10;
        const fieldsH = h - 10;
        const [a, b, c] = columns(doc, [null, null, null], x, fieldsY, w, fieldsH, 15);
        const { r, rowH } = rows(fieldsY, fieldsH, 5, 2);

        const inputWidth = 30;

        a((doc: Doc, x: number, y: number, w: number, h: number) => {
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
        b((doc: Doc, x: number, y: number, w: number, h: number) => {
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
        c((doc: Doc, x: number, y: number, w: number, h: number) => {
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

    buddies(doc, x, pB.y, contentWidth, pB.h, dive);

    footer(doc, x, pF.y, contentWidth, pF.h, {
      version,
      isFake: dive.tags?.includes('fake'),
    });
  });

  page(doc, PAGE_2_MARGINS, (doc: Doc, x: number, y: number, w: number, h: number) => {
    const hasMap = !!image;
    const mapHeight = hasMap ? 172 : 0;

    const [pHeader, pLabel, pSquares, pMap, pF] = rowsFixed([28, 30, null, mapHeight, 15], y, h, PANELS_SPACING);

    header(doc, 'SCHEDA ARIA (didattica)', x, pHeader.y, w, pHeader.h);

    const info = block(doc, x, pLabel.y, w, pLabel.h);

    info((doc: Doc, x: number, y: number, w: number, h: number) => {
      title(doc, 'ANNOTAZIONI', x, y, 9, { width: w });
      doc.text(
        "(compagni d'immersione, indirizzi, numeri telefonici, punti di riferimento, piantina della zona, profili della costa e dei fondali, osservazioni naturalistiche o archeologiche, ecc)",
        x,
        y + 10,
        { width: w },
      );
    });

    squares(doc, x, pSquares.y, w, pSquares.h, async (doc: Doc, x: number, y: number, width: number, h: number) => {
      let nextY = y;
      const options = {
        width,
      };
      if (dive.notes) {
        doc.fontSize(10);
        const text_height = doc.heightOfString(dive.notes, options);
        doc.text(dive.notes, x, y, options).fontSize(8);
        nextY += text_height + 10;
      }

      if (dive.gear && dive.gear.length > 0) {
        const gear_a = dive.gear.map((g) => `${g.manufacturer} ${g.name}`).sort();
        const str = `Attrezzatura: ${gear_a.join(', ')}`;
        const options = {
          width,
        };
        const text_height = doc.heightOfString(str, options);
        doc.text(str, x, y + h - text_height, options);
      }
    });

    if (hasMap) {
      mapBlock(doc, x, pMap.y, w, pMap.h, image);
    }

    footer(doc, x, pF.y, w, pF.h);
  });
}

export default draw;
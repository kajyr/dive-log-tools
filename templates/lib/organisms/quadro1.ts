import {
  FONT_SIZE_MINI_HEADERS,
  FONT_SIZE_FIELDS,
  MINI_HEADERS_HEIGHT,
  PANELS_SPACING,
} from '../constants/ara-didattica';

import { columnsFixed, columns, rows } from '../atoms/grid';
import { panel } from '../atoms/panel';
import { title } from '../atoms/titles';
import label from '../atoms/label';
import { vInputs } from '../molecules/vertical-inputs';
import { Dive } from 'dive-log-importer';
import { Doc, PFN } from '../types';

const component = (doc: Doc, x: number, y: number, w: number, h: number, dive: Partial<Dive>) =>
  panel(doc, x, y, w, h, PANELS_SPACING, (doc: Doc, x: number, y: number, w: number, h: number) => {
    const [_nx, ny] = panel(doc, x, y, w, 13, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
      title(doc, "QUADRO 1 - PIANIFICAZIONE DELL'IMMERSIONE IN CURVA DI SICUREZZA", x, y, 9, {
        width: w,
      });
    });

    const [first, second] = columns(
      doc,
      [null, 25],
      x,
      ny + PANELS_SPACING,
      w,
      h - 13 - PANELS_SPACING,
      PANELS_SPACING,
    );

    const panelsInnerY = ny + 2 * PANELS_SPACING;
    const panelsInnerH = h - 13 - 2 * PANELS_SPACING;

    const rowsY = panelsInnerY + MINI_HEADERS_HEIGHT;
    const rowsH = panelsInnerH - MINI_HEADERS_HEIGHT * 1.5;
    const { r, rowH, debug: rowsDebug } = rows(rowsY, rowsH, 5, 0);

    first((doc: Doc, x: number, y: number, w: number, h: number) => {
      const labelPanelH = 11;
      const ripetitivaPanelW = 100;
      const ripetitivaPanelH = h - labelPanelH - PANELS_SPACING;

      panel(
        doc,
        x,
        y,
        ripetitivaPanelW,
        ripetitivaPanelH,
        3,
        (doc: Doc, x: number, y: number, w: number, h: number) => {
          doc
            .fontSize(FONT_SIZE_MINI_HEADERS)
            .text('IMMERSIONE RIPETITIVA', x, y, { align: 'center', width: w })
            .fontSize(FONT_SIZE_FIELDS);

          const [labels, inputs] = columnsFixed(doc, [null, 25], x, y, w, h, 4);

          labels((doc: Doc, x: number, y: number, w: number, h: number) => {
            label(doc, 'FAR imm. prec.', null, x, r[0], w, rowH);
            label(doc, 'intervallo di sup.', null, x, r[1], w, rowH);
            label(doc, 'FAR fine int. sup.', null, x, r[2], w, rowH);
            label(doc, 'penalità', 'a', x, r[3], w, rowH);
          });
          inputs((doc: Doc, x: number, y: number, w: number, h: number) => {
            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
        },
      );

      panel(
        doc,
        x + ripetitivaPanelW + PANELS_SPACING,
        y,
        w - ripetitivaPanelW - PANELS_SPACING,
        ripetitivaPanelH,
        3,
        (doc: Doc, x: number, y: number, w: number, h: number) => {
          const [labels, prof, tempi, cons] = columnsFixed(doc, [null, 25, 25, 25], x, y, w, h, 4);

          labels((doc: Doc, x: number, y: number, w: number, h: number) => {
            label(doc, 'fondo reale', 'b', x, r[0], w, rowH);
            label(doc, 'sosta profonda', 'c', x, r[1], w, rowH);
            label(doc, 'risalita', 'd', x, r[2], w, rowH);
            label(doc, 'sosta + emers', 'f', x, r[3], w, rowH);
          });
          prof((doc: Doc, x: number, y: number, w: number, h: number) => {
            doc
              .fontSize(FONT_SIZE_MINI_HEADERS)
              .text('PROF.', x, y, { align: 'center', width: w })
              .fontSize(FONT_SIZE_FIELDS);

            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
          tempi((doc: Doc, x: number, y: number, w: number, h: number) => {
            doc
              .fontSize(FONT_SIZE_MINI_HEADERS)
              .text('TEMPI.', x, y, { align: 'center', width: w })
              .fontSize(FONT_SIZE_FIELDS);

            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
          cons((doc: Doc, x: number, y: number, w: number, h: number) => {
            doc
              .fontSize(FONT_SIZE_MINI_HEADERS)
              .text('CONS.', x, y, { align: 'center', width: w })
              .fontSize(FONT_SIZE_FIELDS);
            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
        },
      );

      panel(doc, x, y + h - labelPanelH, w, labelPanelH, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        doc
          .fontSize(6)
          .text('FAR = Fattore Azoto Residuo', x, y)
          .text('tempo di tabella=a+b+c [+d (consigliato)]', x + 90, y)
          .text('durata=b+c+d+f', x + 215, y)
          .fontSize(FONT_SIZE_FIELDS);
      });
    });

    second((doc: Doc, x: number, y: number, w: number, h: number) => {
      panel(doc, x, y, w, h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
        doc
          .fontSize(FONT_SIZE_MINI_HEADERS)
          .text('RIEPILOGO', x, y, { align: 'center', width: w })
          .fontSize(FONT_SIZE_FIELDS);

        const [labels, inputs] = columnsFixed(doc, [null, 25], x, y, w, h, 4);

        labels((doc: Doc, x: number, y: number, w: number, h: number) => {
          label(doc, 'prof. tab', null, x, r[0], w, rowH);
          label(doc, 'tempo tab.', null, x, r[1], w, rowH);
          label(doc, 'durata', null, x, r[2], w, rowH);
          label(doc, 'FAR', null, x, r[3], w, rowH);
          label(doc, 'consumo', null, x, r[4], w, rowH);
        });
        inputs((doc: Doc, x: number, y: number, w: number, h: number) => {
          vInputs(doc, x, rowsY, w, rowH, [null, null, null, null, null]);
        });
      });
    });
  });

export default component;

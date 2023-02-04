import { columnsArea, columnsFixed, rows } from '../atoms/grid';
import label from '../atoms/label';
import { panel } from '../atoms/panel';
import { title } from '../atoms/titles';
import { FONT_SIZE_FIELDS, FONT_SIZE_MINI_HEADERS, MINI_HEADERS_HEIGHT, PANELS_SPACING } from '../constants/page';
import { vInputs } from '../molecules/vertical-inputs';
import { box } from '../neutrons/area';
import { Area, Doc } from '../types';

const component = (doc: Doc, area: Area) =>
  panel(doc, area, PANELS_SPACING, (a) => {
    const titlePanelHeight = 13;
    panel(doc, { ...a, h: titlePanelHeight }, 3, (titleArea) => {
      title(doc, "QUADRO 1 - PIANIFICAZIONE DELL'IMMERSIONE IN CURVA DI SICUREZZA", titleArea.x, titleArea.y, 9, {
        width: titleArea.w,
      });
    });

    const ny = a.y + titlePanelHeight;
    const [first, second] = columnsArea(
      [null, 25],
      { ...a, h: a.h - 13 - PANELS_SPACING, y: ny + PANELS_SPACING },
      PANELS_SPACING,
    );

    const panelsInnerY = ny + 2 * PANELS_SPACING;
    const panelsInnerH = a.h - 13 - 2 * PANELS_SPACING;

    const rowsY = panelsInnerY + MINI_HEADERS_HEIGHT;
    const rowsH = panelsInnerH - MINI_HEADERS_HEIGHT * 1.5;
    const { r, rowH } = rows(rowsY, rowsH, 5, 0);

    box(first, (area) => {
      const labelPanelH = 11;
      const ripetitivaPanelW = 100;
      const ripetitivaPanelH = area.h - labelPanelH - PANELS_SPACING;

      panel(doc, { ...area, h: ripetitivaPanelH, w: ripetitivaPanelW }, 3, (a) => {
        doc
          .fontSize(FONT_SIZE_MINI_HEADERS)
          .text('IMMERSIONE RIPETITIVA', a.x, a.y, { align: 'center', width: a.w })
          .fontSize(FONT_SIZE_FIELDS);

        const [labels, inputs] = columnsFixed(doc, [null, 25], a, 4);

        box(labels, ({ x, w }) => {
          label(doc, 'FAR imm. prec.', null, x, r[0], w, rowH);
          label(doc, 'intervallo di sup.', null, x, r[1], w, rowH);
          label(doc, 'FAR fine int. sup.', null, x, r[2], w, rowH);
          label(doc, 'penalità', 'a', x, r[3], w, rowH);
        });
        box(inputs, ({ x, w }) => {
          vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
        });
      });

      panel(
        doc,
        {
          h: ripetitivaPanelH,
          w: area.w - ripetitivaPanelW - PANELS_SPACING,
          x: area.x + ripetitivaPanelW + PANELS_SPACING,
          y: area.y,
        },
        3,
        (a) => {
          const [labels, prof, tempi, cons] = columnsFixed(doc, [null, 25, 25, 25], a, 4);

          box(labels, ({ x, w }) => {
            label(doc, 'fondo reale', 'b', x, r[0], w, rowH);
            label(doc, 'sosta profonda', 'c', x, r[1], w, rowH);
            label(doc, 'risalita', 'd', x, r[2], w, rowH);
            label(doc, 'sosta + emers', 'f', x, r[3], w, rowH);
          });
          box(prof, ({ x, w, y }) => {
            doc
              .fontSize(FONT_SIZE_MINI_HEADERS)
              .text('PROF.', x, y, { align: 'center', width: w })
              .fontSize(FONT_SIZE_FIELDS);

            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
          box(tempi, ({ x, y, w }) => {
            doc
              .fontSize(FONT_SIZE_MINI_HEADERS)
              .text('TEMPI.', x, y, { align: 'center', width: w })
              .fontSize(FONT_SIZE_FIELDS);

            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
          box(cons, ({ x, y, w }) => {
            doc
              .fontSize(FONT_SIZE_MINI_HEADERS)
              .text('CONS.', x, y, { align: 'center', width: w })
              .fontSize(FONT_SIZE_FIELDS);
            vInputs(doc, x, rowsY, w, rowH, [null, null, null, null]);
          });
        },
      );

      panel(doc, { ...area, h: labelPanelH, y: area.y + area.h - labelPanelH }, 3, (a) => {
        doc
          .fontSize(6)
          .text('FAR = Fattore Azoto Residuo', a.x, a.y)
          .text('tempo di tabella=a+b+c [+d (consigliato)]', a.x + 90, a.y)
          .text('durata=b+c+d+f', a.x + 215, a.y)
          .fontSize(FONT_SIZE_FIELDS);
      });
    });

    box(second, (area) => {
      panel(doc, area, 3, (a) => {
        doc
          .fontSize(FONT_SIZE_MINI_HEADERS)
          .text('RIEPILOGO', a.x, a.y, { align: 'center', width: a.w })
          .fontSize(FONT_SIZE_FIELDS);

        const [labels, inputs] = columnsFixed(doc, [null, 25], a, 4);

        box(labels, ({ x, w }) => {
          label(doc, 'prof. tab', null, x, r[0], w, rowH);
          label(doc, 'tempo tab.', null, x, r[1], w, rowH);
          label(doc, 'durata', null, x, r[2], w, rowH);
          label(doc, 'FAR', null, x, r[3], w, rowH);
          label(doc, 'consumo', null, x, r[4], w, rowH);
        });
        box(inputs, ({ x, w }) => {
          vInputs(doc, x, rowsY, w, rowH, [null, null, null, null, null]);
        });
      });
    });
  });

export default component;

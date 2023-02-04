import { Dive } from 'dive-log-importer';

import buddies, { BUDDIES_HEIGHT } from '../atoms/buddies';
import footer, { FOOTER_HEIGHT } from '../atoms/footer';
import { centerY, columnsArea, rows, rowsFixed, rowsFixedArea } from '../atoms/grid';
import header, { HEADER_HEIGHT } from '../atoms/header';
import page from '../atoms/page';
import { panel } from '../atoms/panel';
import { squares } from '../atoms/squares';
import { title } from '../atoms/titles';
import { PANELS_SPACING } from '../constants/page';
import { time } from '../format';
import condizioniAmbientali from '../molecules/condizioni-ambientali';
import { field, fieldWithUpperLabel, field_date } from '../molecules/field';
import { openField } from '../molecules/open-field';
import { box, lower } from '../neutrons/area';
import { gasLabel, getGases } from '../neutrons/gas';
import { gearList, getSuit } from '../neutrons/gear';
import { trimNewLines } from '../neutrons/strings';
import { getTempi } from '../neutrons/tempi';
import { Doc, Options, RenderOptions } from '../types';

const FIELD_BIG_HEIGHT = 15;

const FONT_SIZE_FIELDS = 8;

const HEADER_LINE_HEIGHT = 18;

/**
 * This logbook layout assumes only one gas.
 * Returns the number of pages added
 */
async function draw(doc: Doc, dive: Partial<Dive>, options: Options, renderOptions: RenderOptions): Promise<number> {
  page(doc, renderOptions.pageIndex % 2 === 0, (pageArea) => {
    const [rowHeader, rowPanel, rowBuddies, rowFooter] = rowsFixed(
      [HEADER_HEIGHT, null, BUDDIES_HEIGHT, FOOTER_HEIGHT],
      pageArea,
      PANELS_SPACING,
    );

    header(doc, 'SCHEDA ARIA - NITROX BASE', rowHeader);

    /* DIVE RELATED THINGS */
    const [gas] = getGases(dive);
    const tankVolume = gas.tankSize;

    panel(doc, rowPanel, 5, (area) => {
      const fieldPadding = 5;
      const [location, condizioni, profilo, annotazioni] = rowsFixedArea([45, 80, 160, null], area, fieldPadding);

      box(location, (area) => {
        // First group
        const columnMargin = 10;

        const secondLineY = area.y + FIELD_BIG_HEIGHT + fieldPadding;

        const [first, second] = columnsArea([40, 60], area, columnMargin);
        doc.fontSize(10);
        box(first, (area) => {
          field(doc, area.x, area.y, area.w, FIELD_BIG_HEIGHT, 'Immersione N°', dive.number);
          field_date(doc, area.x, secondLineY, area.w, FIELD_BIG_HEIGHT, 'Data', dive.date);
        });

        box(second, (area) => {
          field(doc, area.x, area.y, area.w, FIELD_BIG_HEIGHT, 'Luogo', dive.location?.place, {
            labelWidth: 37,
          });
          field(doc, area.x, secondLineY, area.w, FIELD_BIG_HEIGHT, 'Punto', dive.location?.site, {
            labelWidth: 37,
          });
        });
      });

      box(condizioni, (area) => {
        const [first, second] = columnsArea([56, 44], area, 5);
        box(first, (area) => {
          title(doc, 'Condizioni Meteo Marine', area.x, area.y);
          const content = lower(area, HEADER_LINE_HEIGHT);

          const { r, rowH } = rows(content.y, content.h, 4, 5);

          condizioniAmbientali(doc, content, r, rowH, dive);
        });
        box(second, (area) => {
          title(doc, 'Attrezzatura', area.x, area.y);
          const content = lower(area, HEADER_LINE_HEIGHT);

          const { r, rowH } = rows(content.y, content.h, 3, 5);

          doc.fontSize(FONT_SIZE_FIELDS);

          const [muta, zavorra] = columnsArea([55, 45], { h: rowH, w: content.w, x: content.x, y: r[0] }, 5);
          const [bombola, gasArea] = columnsArea([40, 60], { h: rowH, w: content.w, x: content.x, y: r[1] }, 5);

          const fieldOptions = { labelSpacing: 2 };

          const suit = getSuit(dive);
          const suitType = suit.type.toLowerCase();

          box(muta, ({ x, y, w, h }) => {
            let mutaValue = '';
            if (suitType === 'wetsuit') {
              mutaValue = 'umida';
            } else if (suitType === 'drysuit') {
              mutaValue = 'stagna';
            }
            field(doc, x, y, w, h, 'muta', mutaValue, fieldOptions);
          });

          box(zavorra, ({ x, y, w, h }) => {
            field(doc, x, y, w, h, 'zavorra', dive.weights, {
              ...fieldOptions,
              sublabel: '(kg)',
            }); // dive.weights
          });
          box(bombola, ({ x, y, w, h }) => {
            field(doc, x, y, w, h, 'bombola', tankVolume, {
              ...fieldOptions,
              sublabel: '(litri)',
            });
          });

          box(gasArea, ({ x, y, w, h }) => {
            field(doc, x, y, w, h, 'gas', gasLabel(gas), {
              ...fieldOptions,
              sublabel: '(Aria/EANx)',
            });
          });

          field(doc, area.x, r[2], area.w, rowH, 'altro', null, fieldOptions);
        });
      });

      box(profilo, (area) => {
        title(doc, 'Profilo Di Immersione', area.x, area.y);
        const tempi = getTempi(dive);

        const chartArea = lower(area, HEADER_LINE_HEIGHT);

        // Grafico
        const top_margin = 35;
        const top_y = chartArea.y + top_margin;
        const initial_x = chartArea.x + 80;

        const bottom_y = top_y + chartArea.h - top_margin + 2;
        const bottom_x = initial_x + 10;
        const bottom_w = bottom_x + 107;

        const ds_x = bottom_w + 13;
        const ds_y = top_y + (bottom_y - top_y) / 2;
        const ds_w = ds_x + 18;

        const eds_x = ds_w + 13;
        const eds_y = top_y + 10;
        const eds_w = eds_x + 24;

        const final_x = eds_w + 15;
        const final_y = top_y;
        const final_w = chartArea.x + chartArea.w;

        doc
          .lineWidth(3)
          .moveTo(area.x, top_y)
          .lineTo(initial_x, top_y)
          .lineTo(bottom_x, bottom_y)
          .lineTo(bottom_w, bottom_y)
          .lineTo(ds_x, ds_y)
          .lineTo(ds_w, ds_y)
          .lineTo(eds_x, eds_y)
          .lineTo(eds_w, eds_y)
          .lineTo(final_x, final_y)
          .lineTo(final_w, final_y)
          .stroke()
          .lineWidth(1);

        if (tempi.sostaProf.available) {
          doc
            .fontSize(10)
            .font('Helvetica-Bold')
            .text('DS', ds_x, ds_y - 12)
            .font('Helvetica')
            .fontSize(8);

          openField(doc, 'min', '2.5', { h: 15, w: 35, x: ds_x - 80, y: ds_y - 10 });
          openField(doc, 'm', tempi.sostaProf.depth, { h: 15, w: 35, x: ds_x - 40, y: ds_y - 10 });
        }

        /*  doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .text('EDS', eds_x, eds_y - 12)
          .font('Helvetica')
          .fontSize(8); */

        const [first, second, third, fourth] = columnsArea([25, 36, 17, 21], chartArea, 10);

        const { r, rowH } = rows(chartArea.y, chartArea.h, 4, 5);

        const fH = 22;
        const fieldOptions = { bold: true, fullBorder: true, labelSpacing: 2 };

        const baseFW = 40;

        box(first, (area) => {
          fieldWithUpperLabel(doc, area.x, r[0], 15, rowH, 'FAR');
          fieldWithUpperLabel(doc, area.x + 15, r[0], 50, rowH, 'Int. di sup.', dive.surfaceInterval);
          fieldWithUpperLabel(doc, area.x + 15 + 50, r[0], 15, rowH, 'FAR');

          field(doc, area.x, centerY(r[1], fH, rowH), 65, fH, 'Ora', time(dive.entry_time), {
            ...fieldOptions,
            sublabel: 'inizio',
          });

          field(
            doc,
            area.x + 15,
            centerY(r[2], fH, rowH),
            50,
            fH,
            'Bar',
            gas.pressureStart ? Math.round(gas.pressureStart) : '',
            {
              ...fieldOptions,
              sublabel: 'inizio',
            },
          );

          fieldWithUpperLabel(doc, area.x + 27, r[3], baseFW, rowH, 'Penalità', null, {
            bold: true,
            sublabel: '(min)',
          });
        });

        box(second, (area) => {
          fieldWithUpperLabel(doc, area.x + 5, r[3], baseFW, rowH, 'T fondo', tempi.bottom_time, {
            bold: true,
            sublabel: '(min)',
          });
          fieldWithUpperLabel(doc, area.x + 5 + baseFW + 15, r[3], baseFW, rowH, 'T tabella', null, {
            bold: true,
            sublabel: '(min)',
          });
        });
        box(third, (area) => {
          fieldWithUpperLabel(doc, area.x, r[3], baseFW, rowH, 'Prof max', dive.max_depth, {
            bold: true,
            sublabel: '(min)',
          });
        });
        box(fourth, (area) => {
          fieldWithUpperLabel(doc, area.x + 17, r[0], 15, rowH, 'FAR');

          field(doc, area.x, centerY(r[1], fH, rowH), area.w, fH, 'Ora', time(dive.exit_time), {
            ...fieldOptions,
            sublabel: 'fine',
          });

          field(
            doc,
            area.x,
            centerY(r[2], fH, rowH),
            area.w - 15,
            fH,
            'Bar',
            gas.pressureEnd ? Math.round(gas.pressureEnd) : '',
            {
              ...fieldOptions,
              sublabel: 'fine',
            },
          );

          fieldWithUpperLabel(doc, area.x + 17, r[3], baseFW, rowH, 'T totale', dive.dive_time, {
            bold: true,
            sublabel: '(min)',
          });
        });
      });

      box(annotazioni, (area) => {
        title(doc, 'Annotazioni', area.x, area.y);
        const content = lower(area, HEADER_LINE_HEIGHT);

        squares(doc, content, (a) => {
          const options = {
            width: a.w,
          };

          if (dive.notes) {
            doc.fontSize(10);
            const notes = trimNewLines(dive.notes);
            const notesStrHeight = doc.heightOfString(notes);
            // if text is more that 2/3 of the space, reduce size
            if (notesStrHeight > (content.h / 3) * 2) {
              doc.fontSize(6);
            }
            doc.text(notes, a.x, a.y, options);
          }

          const gearStr = gearList(dive);
          if (gearStr) {
            doc.fontSize(8);
            const text_height = doc.heightOfString(gearStr, options);
            doc.text(gearStr, a.x, a.y + a.h - text_height, options);
          }
          doc.fontSize(10);
        });
      });
    });

    buddies(doc, rowBuddies, dive);

    footer(
      doc,
      { ...pageArea, ...rowFooter },
      {
        isFake: !!dive.tags?.includes('fake'),
        version: renderOptions.version,
      },
    );
  });

  return 1;
}

export default draw;

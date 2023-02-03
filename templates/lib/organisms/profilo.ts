import { Dive, Sample } from 'dive-log-importer';

import { block } from '../atoms/grid';
import { panel } from '../atoms/panel';
import { squares } from '../atoms/squares';
import { title } from '../atoms/titles';
import { timefromSeconds } from '../format';
import { scale } from '../pdfkit/lib/charts';
import { Area, Doc, PFN } from '../types';

const CHART_LINES_COLORS = ['#5B7AB7', '#362455'];

const chartComponent = (box: (fn: PFN) => void, samples: Sample[]) =>
  box((doc: Doc, x: number, y: number, w: number, h: number) => {
    //y Axe
    const depths = samples.map((s) => s.depth);
    const minDepth = 0;
    const maxDepth = Math.ceil(Math.max(...depths));
    doc.fontSize(6);
    const widthOfYLabels = 9; // two digits..
    const yLabelOpts = { align: 'right', width: widthOfYLabels };
    const lineH = doc.currentLineHeight();
    const bottomLabel = y + h - lineH;
    const axisOriginY = y + h - lineH * 1.5;
    doc.text(String(minDepth), x, y, yLabelOpts);
    doc.text(String(maxDepth), x, bottomLabel - lineH, yLabelOpts);
    const axisOriginX = x + widthOfYLabels + 3;
    doc.moveTo(axisOriginX, y).lineTo(axisOriginX, axisOriginY).stroke();

    // x Axe
    const minTime = 0;
    const maxTime = samples[samples.length - 1].time;

    doc.text(String(minTime), axisOriginX, bottomLabel);
    doc.text(timefromSeconds(maxTime), x + w - widthOfYLabels * 2, bottomLabel);
    doc
      .moveTo(axisOriginX, axisOriginY)
      .lineTo(x + w, axisOriginY)
      .stroke();
    doc.fontSize(8);

    //chart

    const chart = block(doc, axisOriginX + 2, y, x + w - axisOriginX - 2, axisOriginY - y - 2);

    chart((doc: Doc, x: number, y: number, w: number, h: number) => {
      const xScale = scale(0, maxTime, x + w, x);
      const yScale = scale(0, maxDepth, y + h, y);

      doc.moveTo(x, y);
      samples.forEach((s) => {
        doc.lineTo(xScale(s.time), yScale(s.depth));
      });
      doc.stroke(CHART_LINES_COLORS[0]);
      doc.strokeColor('black');
    });
  });

const component = (doc: Doc, area: Area, dive: Partial<Dive>) =>
  panel(doc, area, 3, (a) => {
    title(doc, "PROFILO DELL'IMMERSIONE", a.x, a.y, 9, { width: a.w });

    const boxY = a.y + 15;
    const boxH = a.h - 15;
    const boxPadding = 2;
    doc.rect(a.x, boxY, a.w, boxH).fill('white').fillColor('black');

    const chartBox = block(doc, a.x + boxPadding, boxY + boxPadding, a.w - 2 * boxPadding, boxH - 2 * boxPadding);

    const { samples } = dive;

    if (samples?.length) {
      chartComponent(chartBox, samples);
    } else {
      chartBox((doc, x, y, w, h) => squares(doc, { h, w, x, y }));
    }
  });

export default component;

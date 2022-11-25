import { block } from '../atoms/grid';
import { panel } from '../atoms/panel';
import { title } from '../atoms/titles';
import { squares } from '../atoms/squares';
import { scale } from '../pdfkit/lib/charts';
import { timefromSeconds } from '../format';
import { Doc, PFN } from '../types';
import { Dive, Sample } from 'dive-log-importer';

const CHART_LINES_COLORS = ['#5B7AB7', '#362455'];

const chartComponent = (box: (fn: PFN) => void, samples: Sample[]) =>
  box((doc: Doc, x: number, y: number, w: number, h: number) => {
    //y Axe
    const depths = samples.map((s) => s.depth);
    const minDepth = 0;
    const maxDepth = Math.ceil(Math.max(...depths));
    doc.fontSize(6);
    const widthOfYLabels = 9; // two digits..
    const yLabelOpts = { width: widthOfYLabels, align: 'right' };
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

const component = (doc: Doc, x: number, y: number, w: number, h: number, dive: Partial<Dive>) =>
  panel(doc, x, y, w, h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
    title(doc, "PROFILO DELL'IMMERSIONE", x, y, 9, { width: w });

    const boxY = y + 15;
    const boxH = h - 15;
    const boxPadding = 2;
    doc.rect(x, boxY, w, boxH).fill('white').fillColor('black');

    const chartBox = block(doc, x + boxPadding, boxY + boxPadding, w - 2 * boxPadding, boxH - 2 * boxPadding);

    const { samples } = dive;

    if (samples?.length) {
      chartComponent(chartBox, samples);
    } else {
      chartBox(squares);
    }
  });

export default component;

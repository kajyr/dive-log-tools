import { Dive, Sample } from 'dive-log-importer';

import { squares } from '../atoms/squares';
import { timefromSeconds } from '../format';
import { box, lower, padding } from '../neutrons/area';
import { scale } from '../neutrons/math';
import { Area, Doc } from '../types';

const CHART_LINES_COLORS = ['#5B7AB7', '#362455'];

function square(doc: Doc, area: Area) {
  doc.rect(area.x, area.y, area.w, area.h).fill('white').fillColor('black');
}

const chartComponent = (doc: Doc, area: Area, samples: Sample[]) => {
  const { h, w, x, y } = area;
  // background

  // y Axe
  const depths = samples.map((s) => s.depth);
  const minDepth = 0;
  const maxDepth = Math.ceil(Math.max(...depths));
  doc.fontSize(6);
  const widthOfYLabels = 9; // two digits..
  const yLabelOpts = { align: 'right', width: widthOfYLabels };
  const lineH = doc.currentLineHeight();
  const bottomLabel = y + h - lineH;
  const axisOriginY = y + h - lineH * 1.5;
  const axisOriginX = x + widthOfYLabels + 3;

  doc.text(String(minDepth), x, y, yLabelOpts);
  doc.text(String(maxDepth), x, bottomLabel - lineH, yLabelOpts);
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
  const chartArea = {
    h: axisOriginY - y,
    w: x + w - axisOriginX,
    x: axisOriginX,
    y,
  };

  square(doc, chartArea);
  squares(doc, chartArea);

  const chartAreaPadded = padding(chartArea, 1);

  box(chartAreaPadded, ({ x, y, w, h }) => {
    const xScale = scale(0, maxTime, x + w, x);
    const yScale = scale(0, maxDepth, y + h, y);

    doc.moveTo(x, y);
    samples.forEach((s) => {
      doc.lineTo(xScale(s.time), yScale(s.depth));
    });
    doc.stroke(CHART_LINES_COLORS[0]);
    doc.strokeColor('black');
  });
};

export const chartOrSquares = (doc: Doc, area: Area, dive: Partial<Dive>, hasWhiteBg: boolean) => {
  const content = lower(area, 15);
  const boxPadding = 2;
  const inner = padding(content, boxPadding);

  if (hasWhiteBg) {
    doc.rect(content.x, content.y, content.w, content.h).fill('white').fillColor('black');
  }

  const { samples = [] } = dive;
  const allZero = samples.every((s) => s.time === 0);

  if (samples.length > 0 && !allZero) {
    chartComponent(doc, inner, samples);
  } else {
    squares(doc, content);
  }
};

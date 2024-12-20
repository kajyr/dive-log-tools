import { input } from '../atoms/input';
import labelF from '../atoms/label';
import { centerY } from '../atoms/text';
import { Doc, Maybe, Value } from '../types';
import dayjs from 'dayjs';

type FieldOptions = {
  labelSpacing?: number;
  labelWidth?: number;
  sublabel?: string;
  fullBorder?: boolean;
  bold?: boolean;
};

export function field(
  doc: Doc,
  startX: number,
  startY: number,
  width: number,
  height: number,
  label: string,
  value: Value,
  options: FieldOptions = {},
) {
  const { labelSpacing = 10, labelWidth, sublabel, fullBorder, bold } = options;

  const sublabelWidth = sublabel ? doc.widthOfString(sublabel) : 0;

  if (bold) {
    doc.font('Helvetica-Bold');
  }
  const mainlabelWidth = doc.widthOfString(label);

  const labelW = labelWidth ? labelWidth : Math.max(mainlabelWidth, sublabelWidth) + labelSpacing;

  const cY = centerY(doc, startY, height);
  doc.text(label, startX, sublabel ? startY : cY, { align: 'right', width: labelW }).font('Helvetica');

  if (sublabel) {
    doc
      .text(sublabel, startX, startY + height / 2, {
        align: 'right',
        width: labelW,
      })
      .fontSize(8);
  }

  const fieldX = startX + labelW + 3;
  const fieldW = width - labelW - 3;

  const fieldH = height - 1;

  input(doc, fieldX, startY, fieldW, fieldH, value, {
    fullBorder,
  });
}

export const field_date = (
  doc: Doc,
  startX: number,
  startY: number,
  width: number,
  height: number,
  label: string,
  value: Value,
) => field(doc, startX, startY, width, height, label, value && dayjs(value).format('DD-MM-YYYY'));

export function checkbox(
  doc: Doc,
  startX: number,
  startY: number,
  width: number,
  height: number,
  label: string,
  checked?: boolean,
) {
  const lineHeight = doc.currentLineHeight();

  const border = 0.8;
  const squareSide = lineHeight - 2 * border;
  const checkStartX = startX + width - squareSide - border;

  doc
    .rect(checkStartX, startY + border, squareSide, squareSide)
    .fillAndStroke('white', 'black')
    .fillColor('black');

  if (checked) {
    doc.text('x', checkStartX, startY, { align: 'center', width: squareSide });
  }

  doc
    .font('Helvetica-Oblique')
    .text(label, startX, startY, { align: 'right', width: checkStartX - startX - 2 })
    .font('Helvetica');
}

type FWULOptions = {
  sublabel?: string;
  bold?: boolean;
};
export function fieldWithUpperLabel(
  doc: Doc,
  startX: number,
  startY: number,
  width: number,
  height: number,
  label: string,
  value?: Value,
  options: FWULOptions = {},
) {
  const { sublabel, bold } = options;
  const labelAlign = sublabel ? 'left' : 'center';
  doc.fontSize(6);
  if (bold) {
    doc.font('Helvetica-Bold');
  }
  const lineHeight = doc.currentLineHeight() + 2;
  doc.text(label, startX, startY, { align: labelAlign, width }).font('Helvetica');
  const boxH = height - lineHeight - 2;

  if (sublabel) {
    doc.fontSize(5).text(sublabel, startX + 1, startY, { align: 'right', width });
  }

  doc.fontSize(8);

  input(doc, startX, startY + lineHeight, width, boxH, value, {
    fullBorder: true,
  });
}

type FWLSOptions = {
  sublabel: string;
  labelSpacing?: number;
  labelWidth?: number;
};

export function fieldWithLowerSubLabel(
  doc: Doc,
  x: number,
  y: number,
  w: number,
  label: Maybe<string>,
  value: Value,
  options: FWLSOptions,
) {
  const inputHeight = 10;
  const { labelWidth, labelSpacing = 3, sublabel } = options;
  const labelW = labelWidth ? labelWidth : label ? doc.widthOfString(label) : 0;

  if (label) {
    doc.text(label, x, centerY(doc, y, inputHeight), { width: labelW });
  }

  const inputX = x + labelW + (label ? labelSpacing : 0);
  const inputW = w - labelW - (label ? labelSpacing : 0);

  input(doc, inputX, y, inputW, inputHeight, value);

  doc
    .fontSize(5)
    .text(sublabel, inputX, y + inputHeight + 2, { align: 'center', width: inputW })
    .fontSize(8);
}

type FFWFIOptions = {
  sublabel?: string;
  inputWidth?: number;
};

export function fieldWithFixedInput(
  doc: Doc,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: Value,
  options: FFWFIOptions = {},
) {
  const { sublabel, inputWidth = 0 } = options;

  const labelW = w - inputWidth - 2;

  labelF(doc, label, sublabel, x, y, labelW, h);

  input(doc, x + labelW + 2, y, inputWidth, h, value);
}

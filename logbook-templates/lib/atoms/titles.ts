import { Doc } from '../types';

export function title(
  doc: Doc,
  label: string,
  x: number,
  y: number,
  fontSize = 12,
  options: PDFKit.Mixins.TextOptions,
) {
  doc.fontSize(fontSize).font('Helvetica-Bold').text(label, x, y, options).font('Helvetica').fontSize(8);
}

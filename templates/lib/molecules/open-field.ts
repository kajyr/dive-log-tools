import { Area, Doc, Maybe } from '../types';

export function openField(doc: Doc, label: string, value: Maybe<string | number>, area: Area) {
  const mainlabelWidth = doc.widthOfString(label);
  const heightOfText = doc.heightOfString(label);

  doc.text(label, area.x, area.y, { align: 'left' });

  if (value) {
    doc.text(String(value), area.x + mainlabelWidth + 5, area.y, {
      align: 'center',
      width: area.w - mainlabelWidth - 5,
    });
  }

  const startX = area.x + mainlabelWidth;
  const lineY = area.y + heightOfText;

  doc
    .lineWidth(1)
    .moveTo(startX, lineY)
    .lineTo(area.x + area.w, lineY)
    .stroke();
}

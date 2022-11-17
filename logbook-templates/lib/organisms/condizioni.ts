import { columnsFixed, columns, rows } from '../atoms/grid';
import { panel } from '../atoms/panel';
import { input } from '../atoms/input';
import { title } from '../atoms/titles';
import label from '../atoms/label';
import condizioniAmbientali from '../molecules/condizioni-ambientali';
import { Component, Doc } from '../types';
import { Dive } from 'dive-log-importer';

const component: Component = (doc, x, y, w, h, dive) =>
  panel(doc, x, y, w, h, 3, (doc: Doc, x: number, y: number, w: number, h: number) => {
    // condizioni
    title(doc, 'CONDIZIONI', x, y, 9, { width: w });

    const [ambientali, personali] = columns(doc, [60, 40], x, y, w, h, 5);

    const { r, rowH } = rows(y + 10, h - 10, 4, 1);

    ambientali((doc: Doc, x: number, y: number, w: number, h: number) => {
      title(doc, 'AMBIENTALI', x, y, 6, { width: w, align: 'center' });

      condizioniAmbientali(doc, x, y, w, h, r, rowH, dive);
    });
    personali((doc: Doc, x: number, y: number, w: number, h: number) => {
      title(doc, 'PERSONALI', x, y, 6, { width: w, align: 'center' });

      const [labels, inputs] = columnsFixed(doc, [25, null], x, y, w, h, 2);

      labels((doc: Doc, x: number, y: number, w: number, h: number) => {
        label(doc, 'prima', null, x, r[0], w, rowH, 'left');
        label(doc, 'dopo', null, x, r[2], w, rowH, 'left');
      });
      inputs((doc: Doc, x: number, y: number, w: number, h: number) => {
        input(doc, x, r[0], w, rowH, null);
        input(doc, x, r[1], w, rowH, null);
        input(doc, x, r[2], w, rowH, null);
        input(doc, x, r[3], w, rowH, null);
      });
    });
  });

export default component;

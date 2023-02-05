import { debug } from '../atoms/debug';
import { columnsArea, columnsFixed, rows } from '../atoms/grid';
import { input } from '../atoms/input';
import label from '../atoms/label';
import { panel } from '../atoms/panel';
import { title } from '../atoms/titles';
import condizioniAmbientali from '../molecules/condizioni-ambientali';
import { box, splitV } from '../neutrons/area';
import { Component } from '../types';

const component: Component = (doc, area, dive) =>
  panel(doc, area, 3, (a) => {
    const [titoli, content] = splitV(a, 10);

    const [tMain, tAmb, tPers] = columnsArea([20, 45, 35], titoli, 5);

    title(doc, 'CONDIZIONI', tMain.x, tMain.y, 9, { width: tMain.w });
    title(doc, 'AMBIENTALI', tAmb.x, tAmb.y, 6, { align: 'center', height: tAmb.h, valign: 'center', width: tAmb.w });
    title(doc, 'PERSONALI', tPers.x, tPers.y, 6, {
      align: 'center',
      height: tPers.h,
      valign: 'center',
      width: tPers.w,
    });

    const [ambientali, personali] = columnsArea([60, 40], content, 5);

    const { r, rowH } = rows(content, 4, 1);

    condizioniAmbientali(doc, ambientali, r, rowH, dive);

    const [labels, inputs] = columnsFixed([25, null], personali, 2);
    box(labels, ({ x, w }) => {
      label(doc, 'prima', null, x, r[0], w, rowH, 'left');
      label(doc, 'dopo', null, x, r[2], w, rowH, 'left');
    });
    box(inputs, ({ x, w }) => {
      input(doc, x, r[0], w, rowH, null);
      input(doc, x, r[1], w, rowH, null);
      input(doc, x, r[2], w, rowH, null);
      input(doc, x, r[3], w, rowH, null);
    });
  });

export default component;

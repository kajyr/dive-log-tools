import { columnsArea, columnsFixed, rows } from '../atoms/grid';
import { input } from '../atoms/input';
import label from '../atoms/label';
import { panel } from '../atoms/panel';
import { title } from '../atoms/titles';
import condizioniAmbientali from '../molecules/condizioni-ambientali';
import { splitV } from '../neutrons/area';
import { Component, Doc } from '../types';

const component: Component = (doc, area, dive) =>
  panel(doc, area, 3, (a) => {
    const [titoli, content] = splitV(a, 10);

    const [tMain, tAmb, tPers] = columnsArea([20, 45, 35], titoli, 5);

    tMain((area) => {
      title(doc, 'CONDIZIONI', area.x, area.y, 9, { width: a.w });
    });

    tAmb((area) => {
      title(doc, 'AMBIENTALI', area.x, area.y, 6, { align: 'center', height: area.h, valign: 'center', width: area.w });
    });

    tPers((area) => {
      title(doc, 'PERSONALI', area.x, area.y, 6, { align: 'center', height: area.h, valign: 'center', width: area.w });
    });

    const [ambientali, personali] = columnsArea([60, 40], content, 5);

    const { r, rowH } = rows(content.y, content.h, 4, 1);

    ambientali((area) => {
      condizioniAmbientali(doc, area, r, rowH, dive);
    });
    personali((area) => {
      const [labels, inputs] = columnsFixed(doc, [25, null], area, 2);

      labels((doc: Doc, x: number, y: number, w: number) => {
        label(doc, 'prima', null, x, r[0], w, rowH, 'left');
        label(doc, 'dopo', null, x, r[2], w, rowH, 'left');
      });
      inputs((doc: Doc, x: number, y: number, w: number) => {
        input(doc, x, r[0], w, rowH, null);
        input(doc, x, r[1], w, rowH, null);
        input(doc, x, r[2], w, rowH, null);
        input(doc, x, r[3], w, rowH, null);
      });
    });
  });

export default component;

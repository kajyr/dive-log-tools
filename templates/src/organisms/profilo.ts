import { Dive } from 'dive-log-importer';

import { panel } from '../atoms/panel';
import { title } from '../atoms/titles';
import { Area, Doc } from '../types';
import { chartOrSquares } from '../molecules/chart-or-squares';

const component = (doc: Doc, area: Area, dive: Partial<Dive>) =>
  panel(doc, area, 3, (a) => {
    title(doc, "PROFILO DELL'IMMERSIONE", a.x, a.y, 9, { width: a.w });

    chartOrSquares(doc, a, dive, true);
  });

export default component;

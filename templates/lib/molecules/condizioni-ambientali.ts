import { Dive } from 'dive-log-importer';

import { columnsArea } from '../atoms/grid';
import label from '../atoms/label';
import { checkbox } from '../molecules/field';
import { Area, Doc } from '../types';

const VISIBILITY_POOR = 'POOR';
const VISIBILITY_MEDIUM = 'MEDIUM';
const VISIBILITY_GOOD = 'GOOD';

const WEATHER_POOR = 'RAIN';
const WEATHER_MEDIUM = 'CLOUD';
const WEATHER_GOOD = 'CLEAR';

const SURFACE_ROUGH = 'ROUGH';
const SURFACE_WEAK = 'WEAK ';
const SURFACE_FLAT = 'FLAT';

const CURRENT_STRONG = 'STRONG';
const CURRENT_WEAK = 'WEAK ';
const CURRENT_NONE = 'NONE';

const component = (doc: Doc, area: Area, r: number[], rowH: number, dive: Partial<Dive>) => {
  const [labels, ok, med, nope] = columnsArea([null, 25, 25, 25], area, 1);

  label(doc, 'meteo:', null, labels.x, r[0], labels.w, rowH, 'left');
  label(doc, 'mare:', null, labels.x, r[1], labels.w, rowH, 'left');
  label(doc, 'visibilità:', null, labels.x, r[2], labels.w, rowH, 'left');
  label(doc, 'corrente:', null, labels.x, r[3], labels.w, rowH, 'left');

  checkbox(doc, ok.x, r[0], ok.w, rowH, 'sereno', dive.weather_normalized === WEATHER_GOOD);
  checkbox(doc, ok.x, r[1], ok.w, rowH, 'calmo', dive.surface_normalized === SURFACE_FLAT);
  checkbox(doc, ok.x, r[2], ok.w, rowH, 'buona', dive.visibility_normalized === VISIBILITY_GOOD);
  checkbox(doc, ok.x, r[3], ok.w, rowH, 'assente', dive.current_normalized === CURRENT_NONE);

  checkbox(doc, med.x, r[0], med.w, rowH, 'coperto', dive.weather_normalized === WEATHER_MEDIUM);
  checkbox(doc, med.x, r[1], med.w, rowH, 'p. mosso', dive.surface_normalized === SURFACE_WEAK);
  checkbox(doc, med.x, r[2], med.w, rowH, 'sufficiente', dive.visibility_normalized === VISIBILITY_MEDIUM);
  checkbox(doc, med.x, r[3], med.w, rowH, 'debole', dive.current_normalized === CURRENT_WEAK);

  checkbox(doc, nope.x, r[0], nope.w, rowH, 'pioggia', dive.weather_normalized === WEATHER_POOR);
  checkbox(doc, nope.x, r[1], nope.w, rowH, 'mosso', dive.surface_normalized === SURFACE_ROUGH);
  checkbox(doc, nope.x, r[2], nope.w, rowH, 'scarsa', dive.visibility_normalized === VISIBILITY_POOR);
  checkbox(doc, nope.x, r[3], nope.w, rowH, 'forte', dive.current_normalized === CURRENT_STRONG);
};

export default component;

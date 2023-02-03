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

  labels((area) => {
    label(doc, 'meteo:', null, area.x, r[0], area.w, rowH, 'left');
    label(doc, 'mare:', null, area.x, r[1], area.w, rowH, 'left');
    label(doc, 'visibilità:', null, area.x, r[2], area.w, rowH, 'left');
    label(doc, 'corrente:', null, area.x, r[3], area.w, rowH, 'left');
  });

  ok((area) => {
    checkbox(doc, area.x, r[0], area.w, rowH, 'sereno', dive.weather_normalized === WEATHER_GOOD);
    checkbox(doc, area.x, r[1], area.w, rowH, 'calmo', dive.surface_normalized === SURFACE_FLAT);
    checkbox(doc, area.x, r[2], area.w, rowH, 'buona', dive.visibility_normalized === VISIBILITY_GOOD);
    checkbox(doc, area.x, r[3], area.w, rowH, 'assente', dive.current_normalized === CURRENT_NONE);
  });
  med((area) => {
    checkbox(doc, area.x, r[0], area.w, rowH, 'coperto', dive.weather_normalized === WEATHER_MEDIUM);
    checkbox(doc, area.x, r[1], area.w, rowH, 'p. mosso', dive.surface_normalized === SURFACE_WEAK);
    checkbox(doc, area.x, r[2], area.w, rowH, 'sufficiente', dive.visibility_normalized === VISIBILITY_MEDIUM);
    checkbox(doc, area.x, r[3], area.w, rowH, 'debole', dive.current_normalized === CURRENT_WEAK);
  });
  nope((area) => {
    checkbox(doc, area.x, r[0], area.w, rowH, 'pioggia', dive.weather_normalized === WEATHER_POOR);
    checkbox(doc, area.x, r[1], area.w, rowH, 'mosso', dive.surface_normalized === SURFACE_ROUGH);
    checkbox(doc, area.x, r[2], area.w, rowH, 'scarsa', dive.visibility_normalized === VISIBILITY_POOR);
    checkbox(doc, area.x, r[3], area.w, rowH, 'forte', dive.current_normalized === CURRENT_STRONG);
  });
};

export default component;

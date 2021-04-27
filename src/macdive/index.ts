import { ImporterObj, Importer } from '../types';

import parser from './parser';
import importer from './importer';

const macdive: ImporterObj = {
  name: 'macdive',
  canImport: (xml: string): boolean => {
    return xml.indexOf(`<!DOCTYPE dives SYSTEM "http://www.mac-dive.com/macdive_logbook.dtd">`) !== -1;
  },

  importer: (xml: string): Importer.Logbook => {
    const obj = parser(xml);

    return importer(obj);
  },
};

export default macdive;

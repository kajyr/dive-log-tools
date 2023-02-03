import { ImporterObj, Logbook } from '../types';

import parser from './parser';
import importer from './importer';

const macdive: ImporterObj = {
  canImport: (xml: string): boolean => {
    return xml.indexOf(`<!DOCTYPE dives SYSTEM "http://www.mac-dive.com/macdive_logbook.dtd">`) !== -1;
  },
  importer: (xml: string): Logbook => {
    const obj = parser(xml);

    return importer(obj);
  },

  name: 'macdive',
};

export default macdive;

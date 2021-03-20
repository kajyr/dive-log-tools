import { Importer, Logbook } from '../types';

import parser from './parser';
import importer from './importer';

const divelog: Importer = {
  name: 'divelog',
  canImport: (xml: string): boolean => {
    return xml.indexOf(`<Divinglog DBVersion=`) !== -1;
  },

  importer: (xml: string): Logbook => {
    const obj = parser(xml);

    return importer(obj);
  },
};

export default divelog;

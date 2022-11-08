import { ImporterObj, Importer } from '../types';

import parser from './parser';
import importer from './importer';

const divelog: ImporterObj = {
  name: 'divelog',
  canImport: (xml: string): boolean => {
    return xml.indexOf(`<Divinglog DBVersion=`) !== -1;
  },

  importer: (xml: string): Importer.Logbook => {
    const obj = parser(xml);

    return importer(obj);
  },
};

export default divelog;

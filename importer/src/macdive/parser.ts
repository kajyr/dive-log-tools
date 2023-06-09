import { XMLParser } from 'fast-xml-parser';

import { Dive, RawLogbook } from './types';

type RawObj = {
  dives: {
    units: 'Metric';
    schema: '2.2.0';
    dive: Dive | Dive[];
  };
};

function parser(xml: string): RawLogbook {
  const fxp = new XMLParser();
  const jsonObj: RawObj = fxp.parse(xml);
  const { dive, ...other } = jsonObj.dives;

  // If there is only one dive, fxp removes the array
  const dives = Array.isArray(dive) ? dive : [dive];

  return { ...other, dives };
}

export default parser;

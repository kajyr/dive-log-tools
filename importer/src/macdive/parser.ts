import { XMLParser } from 'fast-xml-parser';
import { MacDive } from './types';

type RawObj = {
  dives: {
    units: 'Metric';
    schema: '2.2.0';
    dive: MacDive.Dive | MacDive.Dive[];
  };
};

function parser(xml: string): MacDive.RawLogbook {
  const fxp = new XMLParser();
  const jsonObj: RawObj = fxp.parse(xml);
  const { dive, ...other } = jsonObj.dives;

  // If there is only one dive, fxp removes the array
  let dives = Array.isArray(dive) ? dive : [dive];

  dives = dives;

  return { ...other, dives };
}

export default parser;

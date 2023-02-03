import { XMLParser } from 'fast-xml-parser';
import { DivingLog } from './types';

function parser(xml: string): DivingLog.RawLogbook {
  const fxp = new XMLParser({ attributeNamePrefix: 'A_', ignoreAttributes: false });
  const jsonObj = fxp.parse(xml);

  return jsonObj;
}

export default parser;

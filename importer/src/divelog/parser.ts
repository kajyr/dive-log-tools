import { XMLParser } from 'fast-xml-parser';
import { DivingLog } from './types';

function parser(xml: string): DivingLog.RawLogbook {
  const fxp = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: 'A_' });
  const jsonObj = fxp.parse(xml);

  return jsonObj;
}

export default parser;

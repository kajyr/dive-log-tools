import fxp from 'fast-xml-parser';
import { DivingLog } from './types';

function parser(xml: string): DivingLog.RawLogbook {
  const jsonObj = fxp.parse(xml, { ignoreAttributes: false, attributeNamePrefix: 'A_' });

  return jsonObj;
}

export default parser;

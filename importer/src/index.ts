import divinglog from './divelog';
import macdive from './macdive';
import { Logbook, Dive, Location, Gear, UsedGas, Sample } from './types';

const importers = [macdive, divinglog];

export { Logbook, Dive, Location, Gear, UsedGas, Sample };

export function listImporters() {
  return importers.map((i) => i.name);
}

export function importer(xml: string): Logbook | null {
  if (macdive.canImport(xml)) {
    return macdive.importer(xml);
  }

  if (divinglog.canImport(xml)) {
    return divinglog.importer(xml);
  }
  /*   if (importers.divinglog.canImport(jsonObj)) {
    return importers.divinglog.importer(jsonObj);
  }
  */

  return null;
}

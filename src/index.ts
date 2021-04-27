import divinglog from './divelog';
import macdive from './macdive';
import { Importer } from './types';

const importers = [macdive, divinglog];

export { Importer };

export function listImporters() {
  return importers.map((i) => i.name);
}

export function importer(xml: string): Importer.Logbook | null {
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

import { z } from 'zod';

import { diveSchema, gearSchema, locationSchema, sampleSchema, schema, usedGasSchema } from './schema';

export type UsedGas = z.infer<typeof usedGasSchema>;

export type Gear = z.infer<typeof gearSchema>;
export type Sample = z.infer<typeof sampleSchema>;
export type Location = z.infer<typeof locationSchema>;
export type Dive = z.infer<typeof diveSchema>;
export type Logbook = z.infer<typeof schema>;

export type ImporterObj = {
  name: string;
  importer: (xml: string) => Logbook;
  canImport: (xml: string) => boolean;
};

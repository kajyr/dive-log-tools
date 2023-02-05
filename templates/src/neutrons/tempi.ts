import { Dive } from 'dive-log-importer';

type Tempi = {
  sostaProf: { label: string; value?: number; available: boolean; depth?: number };
  bottom_time?: number;
  durata?: number;
  risalita?: number;
};

export function getTempi(dive: Partial<Dive>): Tempi {
  const { bottom_time, max_depth } = dive;

  const isEmpty = !max_depth;

  if (isEmpty) {
    return { sostaProf: { available: false, label: 'sosta prof.' } };
  }

  const sostaProfValue = max_depth > 18 ? 2.5 : 0;
  const risalita = Math.ceil(max_depth / 9);
  const hasSostaProf = max_depth > 18;
  const sostaProfDepth = Math.ceil(max_depth) / 2;

  return {
    bottom_time,
    durata: (bottom_time || 0) + sostaProfValue + risalita + 5,
    risalita,
    sostaProf: {
      available: hasSostaProf,
      depth: sostaProfDepth,
      label: hasSostaProf ? `sosta prof. ${sostaProfDepth}m` : 'sosta prof.',
      value: sostaProfValue, // can be 0
    },
  };
}

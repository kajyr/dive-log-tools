import { Dive } from 'dive-log-importer';

type Tempi = {
  sostaProf: { label: string; value?: number };
  bottom_time?: number;
  durata?: number;
  risalita?: number;
};

export function getTempi(dive: Partial<Dive>): Tempi {
  const { bottom_time, max_depth } = dive;

  const isEmpty = !max_depth;

  if (isEmpty) {
    return { sostaProf: { label: 'sosta prof.' } };
  }

  const sostaProfValue = max_depth > 18 ? 2.5 : 0;
  const risalita = Math.ceil(max_depth / 9);
  return {
    sostaProf: {
      label: max_depth > 18 ? `sosta prof. ${Math.ceil(max_depth) / 2}m` : 'sosta prof.',
      value: sostaProfValue, // can be 0
    },
    bottom_time,
    risalita,
    durata: (bottom_time || 0) + sostaProfValue + risalita + 5,
  };
}

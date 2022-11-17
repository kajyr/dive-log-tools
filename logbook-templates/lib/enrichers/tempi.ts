import { EnricherFn } from '.';

const enricher: EnricherFn = (dive) => {
  const { bottom_time: fondo, max_depth } = dive;

  const isEmpty = !max_depth;

  let tempi;

  if (isEmpty) {
    tempi = { sostaProf: { label: 'sosta prof.' } };
  } else {
    const sostaProfValue = max_depth > 18 ? 2.5 : 0;
    const risalita = Math.ceil(max_depth / 9);
    tempi = {
      sostaProf: {
        label: max_depth > 18 ? `sosta prof. ${Math.ceil(max_depth) / 2}m` : 'sosta prof.',
        value: sostaProfValue.toString(), // can be 0
      },
      fondo,
      risalita,
      durata: (fondo || 0) + sostaProfValue + risalita + 5,
    };
  }

  return { ...dive, tempi };
};

export default enricher;

import { UsedGas } from 'dive-log-importer';

import { gasLabel } from '../neutrons/gas';

import { EnricherFn } from '.';

const hidden = ['istruttore', 'fake'];

const genMap = (gas: UsedGas | undefined) => (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'nitrox':
      return gas ? gasLabel(gas) : tag;
    default:
      return tag;
  }
};

function getTypes(entry: string | undefined, tags: string[] | undefined, gas: UsedGas | undefined) {
  let tipo: string[] = [];

  if (tags) {
    tipo = tipo.concat(...tags);
  }

  if (entry) {
    tipo.push(entry.toLocaleLowerCase());
  }

  const mapped = tipo.map(genMap(gas));

  return mapped.filter((s) => !hidden.includes(s.toLowerCase()));
}

const enricher: EnricherFn = (dive) => {
  const { gases = [] } = dive;

  // Per calcolare il tipo per ora supportiamo solo il primo gas
  const types = getTypes(dive.entry, dive.tags, gases[0]);

  return { ...dive, types };
};

export default enricher;

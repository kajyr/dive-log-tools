import { UsedGas } from 'dive-log-importer';

import { getGases } from '../neutrons/gas';

import { EnricherFn } from '.';

/* const EMPTY_GAS: UsedGas = {
  oxygen: 21,
};
 */
function normalizePressures(gas: UsedGas): UsedGas {
  const pressureStart = gas.pressureStart ? Math.floor(gas.pressureStart) : undefined;
  const pressureEnd = gas.pressureEnd ? Math.floor(gas.pressureEnd) : undefined;

  return {
    ...gas,
    pressureEnd,
    pressureStart,
  };
}

const enricher: EnricherFn = (dive) => {
  const rawGases = getGases(dive);
  const gases = rawGases.map(normalizePressures);

  return { ...dive, gases };
};

export default enricher;

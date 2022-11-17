import { UsedGas } from 'dive-log-importer';
import { EnricherFn } from '.';

const EMPTY_GAS: UsedGas = {
  oxygen: 21,
};

function normalizePressures(gas: UsedGas): UsedGas {
  const pressureStart = gas.pressureStart ? Math.floor(gas.pressureStart) : undefined;
  const pressureEnd = gas.pressureEnd ? Math.floor(gas.pressureEnd) : undefined;

  return {
    ...gas,
    pressureStart,
    pressureEnd,
  };
}

const enricher: EnricherFn = (dive) => {
  const rawGases = dive.gases && dive.gases.length > 0 ? dive.gases : [EMPTY_GAS];
  const gases = rawGases.map(normalizePressures);

  return { ...dive, gases };
};

export default enricher;

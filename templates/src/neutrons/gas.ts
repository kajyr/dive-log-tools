import { Dive, UsedGas } from 'dive-log-importer';

export function gasLabel({ oxygen }: Partial<UsedGas>) {
  return oxygen && oxygen !== 21 ? `EAN${oxygen}` : 'Aria';
}

export function volume(pressure: number | undefined, size: number | undefined) {
  if (pressure && size) {
    return pressure * size;
  }
}

export function volumeStart(gas: UsedGas) {
  return volume(gas.pressureStart, gas.tankSize);
}

export function volumeEnd(gas: UsedGas) {
  return volume(gas.pressureEnd, gas.tankSize);
}

export function consumo(gas: UsedGas) {
  const vstart = volumeStart(gas);
  const vend = volumeEnd(gas);

  if (vstart && vend) {
    return vstart - vend;
  }
}

const EMPTY_GAS: UsedGas = {
  oxygen: 21,
};

/**
 * Gets the gases from the Dive.
 * If there are none, assumes that at least Air was used
 */
export function getGases(dive: Partial<Dive>) {
  return dive.gases && dive.gases.length > 0 ? dive.gases : [EMPTY_GAS];
}

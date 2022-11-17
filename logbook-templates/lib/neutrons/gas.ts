import { UsedGas } from 'dive-log-importer';

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

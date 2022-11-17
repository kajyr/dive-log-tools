import { UsedGas } from 'dive-log-importer';

export function gasLabel({ oxygen }: Partial<UsedGas>) {
  return oxygen && oxygen !== 21 ? `EAN${oxygen}` : 'Aria';
}

export function volume(pressure: number, size: number) {
  return pressure * size;
}

export function volumeStart(gas: UsedGas) {
  return volume(gas.pressureStart, gas.tankSize);
}

export function volumeEnd(gas: UsedGas) {
  return volume(gas.pressureEnd, gas.tankSize);
}

export function consumo(gas: UsedGas) {
  return volumeStart(gas) - volumeEnd(gas);
}

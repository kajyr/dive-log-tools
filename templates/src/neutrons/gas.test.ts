import { UsedGas } from 'dive-log-importer';

import { consumo, gasLabel, getGases, volume, volumeEnd, volumeStart } from './gas';

describe('gasLabel', () => {
  test('should return EAN label for non-air oxygen', () => {
    expect(gasLabel({ oxygen: 32 })).toBe('EAN32');
    expect(gasLabel({ oxygen: 36 })).toBe('EAN36');
  });

  test('should return Aria for standard air (21%)', () => {
    expect(gasLabel({ oxygen: 21 })).toBe('Aria');
  });

  test('should return Aria when oxygen is undefined', () => {
    expect(gasLabel({})).toBe('Aria');
  });
});

describe('volume', () => {
  test('should calculate volume from pressure and size', () => {
    expect(volume(200, 12)).toBe(2400);
  });

  test('should return undefined when pressure is missing', () => {
    expect(volume(undefined, 12)).toBeUndefined();
  });

  test('should return undefined when size is missing', () => {
    expect(volume(200, undefined)).toBeUndefined();
  });

  test('should return undefined when both are missing', () => {
    expect(volume(undefined, undefined)).toBeUndefined();
  });

  test('should return undefined when pressure is 0', () => {
    expect(volume(0, 12)).toBeUndefined();
  });
});

describe('volumeStart', () => {
  test('should calculate start volume from gas', () => {
    const gas: UsedGas = { pressureStart: 200, tankSize: 12 };
    expect(volumeStart(gas)).toBe(2400);
  });

  test('should return undefined when pressureStart is missing', () => {
    const gas: UsedGas = { tankSize: 12 };
    expect(volumeStart(gas)).toBeUndefined();
  });
});

describe('volumeEnd', () => {
  test('should calculate end volume from gas', () => {
    const gas: UsedGas = { pressureEnd: 50, tankSize: 12 };
    expect(volumeEnd(gas)).toBe(600);
  });

  test('should return undefined when pressureEnd is missing', () => {
    const gas: UsedGas = { tankSize: 12 };
    expect(volumeEnd(gas)).toBeUndefined();
  });
});

describe('consumo', () => {
  test('should calculate gas consumption', () => {
    const gas: UsedGas = { pressureEnd: 50, pressureStart: 200, tankSize: 12 };
    expect(consumo(gas)).toBe(1800);
  });

  test('should return undefined when start pressure is missing', () => {
    const gas: UsedGas = { pressureEnd: 50, tankSize: 12 };
    expect(consumo(gas)).toBeUndefined();
  });

  test('should return undefined when end pressure is missing', () => {
    const gas: UsedGas = { pressureStart: 200, tankSize: 12 };
    expect(consumo(gas)).toBeUndefined();
  });

  test('should return undefined when tank size is missing', () => {
    const gas: UsedGas = { pressureEnd: 50, pressureStart: 200 };
    expect(consumo(gas)).toBeUndefined();
  });
});

describe('getGases', () => {
  test('should return dive gases when present', () => {
    const gases: UsedGas[] = [{ oxygen: 32 }, { oxygen: 21 }];
    expect(getGases({ gases })).toEqual(gases);
  });

  test('should default to air when gases array is empty', () => {
    expect(getGases({ gases: [] })).toEqual([{ oxygen: 21 }]);
  });

  test('should default to air when gases is undefined', () => {
    expect(getGases({})).toEqual([{ oxygen: 21 }]);
  });
});

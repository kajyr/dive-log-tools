import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { UsedGas } from 'dive-log-importer';

import { consumo, gasLabel, getGases, volume, volumeEnd, volumeStart } from './gas';

describe('gasLabel', () => {
  test('should return EAN label for non-air oxygen', () => {
    assert.strictEqual(gasLabel({ oxygen: 32 }), 'EAN32');
    assert.strictEqual(gasLabel({ oxygen: 36 }), 'EAN36');
  });

  test('should return Aria for standard air (21%)', () => {
    assert.strictEqual(gasLabel({ oxygen: 21 }), 'Aria');
  });

  test('should return Aria when oxygen is undefined', () => {
    assert.strictEqual(gasLabel({}), 'Aria');
  });
});

describe('volume', () => {
  test('should calculate volume from pressure and size', () => {
    assert.strictEqual(volume(200, 12), 2400);
  });

  test('should return undefined when pressure is missing', () => {
    assert.strictEqual(volume(undefined, 12), undefined);
  });

  test('should return undefined when size is missing', () => {
    assert.strictEqual(volume(200, undefined), undefined);
  });

  test('should return undefined when both are missing', () => {
    assert.strictEqual(volume(undefined, undefined), undefined);
  });

  test('should return undefined when pressure is 0', () => {
    assert.strictEqual(volume(0, 12), undefined);
  });
});

describe('volumeStart', () => {
  test('should calculate start volume from gas', () => {
    const gas: UsedGas = { pressureStart: 200, tankSize: 12 };
    assert.strictEqual(volumeStart(gas), 2400);
  });

  test('should return undefined when pressureStart is missing', () => {
    const gas: UsedGas = { tankSize: 12 };
    assert.strictEqual(volumeStart(gas), undefined);
  });
});

describe('volumeEnd', () => {
  test('should calculate end volume from gas', () => {
    const gas: UsedGas = { pressureEnd: 50, tankSize: 12 };
    assert.strictEqual(volumeEnd(gas), 600);
  });

  test('should return undefined when pressureEnd is missing', () => {
    const gas: UsedGas = { tankSize: 12 };
    assert.strictEqual(volumeEnd(gas), undefined);
  });
});

describe('consumo', () => {
  test('should calculate gas consumption', () => {
    const gas: UsedGas = { pressureEnd: 50, pressureStart: 200, tankSize: 12 };
    assert.strictEqual(consumo(gas), 1800);
  });

  test('should return undefined when start pressure is missing', () => {
    const gas: UsedGas = { pressureEnd: 50, tankSize: 12 };
    assert.strictEqual(consumo(gas), undefined);
  });

  test('should return undefined when end pressure is missing', () => {
    const gas: UsedGas = { pressureStart: 200, tankSize: 12 };
    assert.strictEqual(consumo(gas), undefined);
  });

  test('should return undefined when tank size is missing', () => {
    const gas: UsedGas = { pressureEnd: 50, pressureStart: 200 };
    assert.strictEqual(consumo(gas), undefined);
  });
});

describe('getGases', () => {
  test('should return dive gases when present', () => {
    const gases: UsedGas[] = [{ oxygen: 32 }, { oxygen: 21 }];
    assert.deepStrictEqual(getGases({ gases }), gases);
  });

  test('should default to air when gases array is empty', () => {
    assert.deepStrictEqual(getGases({ gases: [] }), [{ oxygen: 21 }]);
  });

  test('should default to air when gases is undefined', () => {
    assert.deepStrictEqual(getGases({}), [{ oxygen: 21 }]);
  });
});

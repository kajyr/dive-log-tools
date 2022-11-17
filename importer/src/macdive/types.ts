import { BaseRawLogbook, Sample } from '../types';

export namespace MacDive {
  interface Gear {
    type: string;
    manufacturer: string;
    name: string;
    serial: string | number;
  }

  export interface Gas {
    pressureStart: number;
    pressureEnd: number;
    oxygen: number;
    helium: number;
    double: number;
    tankSize: number;
    workingPressure: number;
    supplyType: string;
    duration: number;
    tankName: string;
  }

  interface Event {
    type: number;
    time: number;
    detail: string;
    name: string;
  }

  export interface Dive {
    date: string;
    identifier: string;
    diveNumber: number;
    rating: number;
    repetitiveDive: number;
    diver: string;
    computer: string;
    serial: number;
    maxDepth: number;
    averageDepth: number;
    cns: number;
    decoModel: string;
    duration: number;
    gasModel: string;
    surfaceInterval: number;
    sampleInterval: number;
    tempAir: number;
    tempHigh: number;
    tempLow: number;
    visibility: string;
    weight: number;
    notes: string;
    diveMaster: string;
    diveOperator: string;
    skipper: string;
    boat: string;
    weather: string;
    current: string;
    surfaceConditions: string;
    entryType: string;
    site: {
      country: string;
      location: string;
      name: string;
      bodyOfWater: string;
      waterType: string;
      difficulty: string;
      altitude: number;
      lat: number;
      lon: number;
    };
    tags: string | { tag: string | string[] };
    types: string | { type: string | string[] };
    buddies: { buddy: string };
    gear: string | { item: Gear | Gear[] };
    gases: string | { gas: Gas | Gas[] };
    samples: string | { sample: Sample | Sample[] };
    events?: { event: Event[] };
  }

  export interface RawLogbook extends BaseRawLogbook {
    units: 'Metric';
    schema: '2.2.0';
    dives: Dive[];
  }
}

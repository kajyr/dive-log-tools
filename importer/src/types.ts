export type UsedGas = {
  pressureStart?: number;
  pressureEnd?: number;
  oxygen?: number;
  helium?: number;
  double?: boolean;
  tankSize?: number;
  tankName?: string;
};

export type Gear = { name: string; type: string; manufacturer: string; serial: string };

export type Sample = {
  depth: number;
  ndt: number;
  ppo2: number;
  pressure: number;
  temperature: number;
  time: number;
};

export type Location = {
  lat?: string;
  lng?: string;
  place: string;
  country: string;
  site: string;
};

export type Dive = {
  air_used: number;
  bottom_time?: number;
  buddies: string;
  current_normalized: string;
  current: string;
  date: string;
  deco_stops: string;
  dive_master: string;
  dive_time: number;
  emersion_time: number;
  entry_time: string;
  entry: string;
  exit_time: string;
  gases: UsedGas[];
  gear: Gear[];
  half_depth_break_time: string;
  half_depth_break: string;
  location?: Location;
  max_depth: number;
  notes: string;
  number: number;
  repetitive?: number;
  samples: Sample[];
  surface_normalized: string;
  surface: string;
  surfaceInterval?: string;
  tags: string[];
  types: string[];
  visibility_normalized: string;
  visibility: string;
  water: string;
  weather_normalized: string;
  weather: string;
  weights: number;
};

export type Logbook = {
  dives: Dive[];
};

export type BaseRawLogbook = {};

export type ImporterObj = {
  name: string;
  importer: (xml: string) => Logbook;
  canImport: (xml: string) => boolean;
};

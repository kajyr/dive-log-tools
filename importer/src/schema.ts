import { z } from 'zod';

export const usedGasSchema = z.object({
  double: z.boolean().optional(),
  helium: z.number().optional(),
  oxygen: z.number().optional(),
  pressureEnd: z.number().optional(),
  pressureStart: z.number().optional(),
  tankName: z.string().optional(),
  tankSize: z.number().optional(),
});

export const gearSchema = z.object({
  manufacturer: z.string().optional(),
  name: z.string(),
  serial: z.string().optional(),
  type: z.string(),
});

export const sampleSchema = z.object({
  depth: z.number(),
  ndt: z.number(),
  ppo2: z.number(),
  pressure: z.number(),
  temperature: z.number(),
  time: z.number(),
});

export const locationSchema = z.object({
  country: z.string(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  place: z.string(),
  site: z.string(),
});

export const diveSchema = z.object({
  air_used: z.number(),
  bottom_time: z.number().optional(),
  buddies: z.string(),
  current: z.string(),
  current_normalized: z.string(),
  date: z.string(),
  deco_stops: z.string(),
  dive_master: z.string(),
  dive_time: z.number(),
  emersion_time: z.number(),
  entry: z.string(),
  entry_time: z.string(),
  exit_time: z.string(),
  gases: z.array(usedGasSchema),
  gear: z.array(gearSchema),
  half_depth_break: z.string(),
  half_depth_break_time: z.string(),
  location: locationSchema.optional(),
  max_depth: z.number(),
  notes: z.string(),
  number: z.number(),
  repetitive: z.number().optional(),
  samples: z.array(sampleSchema),
  surface: z.string(),
  surfaceInterval: z.string().optional(),
  surface_normalized: z.string(),
  tags: z.array(z.string()),
  types: z.array(z.string()),
  visibility: z.string(),
  visibility_normalized: z.string(),
  water: z.string(),
  weather: z.string(),
  weather_normalized: z.string(),
  weights: z.number(),
});

export const schema = z.object({
  dives: z.array(diveSchema),
});

import { Area } from '../types';

export function isArea(val: any): val is Area {
  return typeof val === 'object' && typeof val.x === 'number';
}

/**
 * Subtracts a vertical amount to an area, returning the area left.
 * Useful for leaving spaces for titles
 */
export function lower(area: Area, val: number): Area {
  return { ...area, h: area.h - val, y: area.y + val };
}

/**
 * Subtracts a vertical amount to an area, returning the area left.
 * Useful for leaving spaces for titles
 */
export function splitV(area: Area, val: number): [top: Area, bottom: Area] {
  return [
    { ...area, h: val, y: area.y },
    { ...area, h: area.h - val, y: area.y + val },
  ];
}

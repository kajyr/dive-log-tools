import { Dive } from 'dive-log-importer';

export interface CliOptions {
  verbose?: boolean;
  empty?: boolean;
  dest: string;
  debug?: boolean;
  list: string[];
  //template: 'didattica' | 'base' | 'auto';
  template: string;
  logo?: boolean;
}

/**
 * Config from home dir or hardcoded settings
 */
export interface Config {
  maps?: { key: string };
  cacheDir: string;
}

export interface Options extends CliOptions, Config {}

export interface RenderOptions {
  version: string;
}

export type PartialLogbook = { dives: Partial<Dive>[] };

export type Doc = PDFKit.PDFDocument;

export type Maybe<T> = T | null | undefined;
export type Value = Maybe<string | number>;

export type PFN = (d: Doc, x: number, y: number, w: number, h: number) => void;
export type Component = (d: Doc, area: Area, dive: Partial<Dive>) => void;

export type Area = { x: number; y: number; w: number; h: number };
export type AreaFn = (a: Area) => void;

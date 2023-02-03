import { Dive } from 'dive-log-importer';

export interface CliOptions {
  verbose?: boolean;
  empty?: boolean;
  dest: string;
  debug?: boolean;
  list: string[];
  //template: 'didattica' | 'base';
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

export type PartialLogbook = { dives: Partial<Dive>[] };

export type Doc = PDFKit.PDFDocument;

export type Maybe<T> = T | null | undefined;
export type Value = Maybe<string | number>;

export type PFN = (d: Doc, x: number, y: number, w: number, h: number) => void;
export type Component = (d: Doc, x: number, y: number, w: number, h: number, dive: Partial<Dive>) => void;

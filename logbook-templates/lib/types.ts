import { Dive } from 'dive-log-importer';

export interface CliOptions {
  verbose?: boolean;
  empty?: boolean;
  dest: string;
  debug?: boolean;
  list: string[];
  template: string;
  logo?: string;
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

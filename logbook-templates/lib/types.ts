export interface CliOptions {
  verbose?: boolean;
  empty?: boolean;
  dest?: string;
  debug?: boolean;
  list?: string[];
  template?: string;
  logo?: string;
}

export interface Options extends CliOptions {
  maps: { key: string } | undefined;
  cacheDir: string;
}

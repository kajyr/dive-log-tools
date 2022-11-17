#!/usr/bin/env node
import { mclip } from 'mclip';
import { convert, convertEmpty } from '.';
import conf from './lib/options';
import { CliOptions, Options } from './lib/types';

const uncastOpts = mclip(process.argv, {
  dest: { default: './export.pdf', description: 'Output file name', short: 'd' },
  template: { default: 'fipsas-didattica', description: 'Template name', short: 't' },
  logo: { description: 'Prints the club logo', short: 'l' },
  verbose: { description: 'Verbose mode', short: 'v' },
  debug: { description: 'Debug mode' },
  empty: { description: 'Prints an empty sheet (Does not load any xml file)' },
});

//@ts-ignore
const opts = uncastOpts as CliOptions;
const options: Options = { ...conf, ...opts };

if (options.verbose) {
  console.log('Active options: ', options);
}
const list = opts.list || [];

if (options.empty) {
  convertEmpty(options);
} else if (list.length > 0) {
  Promise.all(list.map((file) => convert(file, options)));
}

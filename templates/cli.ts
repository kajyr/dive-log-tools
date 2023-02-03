#!/usr/bin/env node
import { mclip } from 'mclip';
import { convert, convertEmpty } from '.';
import conf from './lib/options';
import { Options } from './lib/types';

const opts = mclip(process.argv, {
  debug: { default: false, description: 'Debug mode' },
  dest: { default: './export.pdf', description: 'Output file name', short: 'd' },
  empty: { default: false, description: 'Prints an empty sheet (Does not load any xml file)' },
  logo: { default: false, description: 'Prints the club logo', short: 'l' },
  template: { default: 'didattica', description: 'Template name', short: 't' },
  verbose: { default: false, description: 'Verbose mode', short: 'v' },
});

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

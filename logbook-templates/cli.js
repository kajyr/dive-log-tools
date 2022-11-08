#!/usr/bin/env node
const mclip = require('mclip');
const { convert, convertEmpty } = require('./');
const options = require('./lib/options');

const opts = mclip(process.argv, {
    dest: { default: './export.pdf', description: 'Output file name', alias: 'd' },
    template: { default: 'fipsas-didattica', description: 'Template name', alias: 't' },
    logo: { description: 'Prints the club logo', alias: 'l' },
    verbose: { description: 'Verbose mode', alias: 'v' },
    debug: { description: 'Debug mode' },
    empty: { description: 'Prints an empty sheet (Does not load any xml file)' },
});

const { verbose, empty, dest } = opts;

const globals = ['verbose', 'debug', 'logo', 'empty', 'template'];
globals.forEach((key) => {
    options[key] = opts[key];
});

if (verbose) {
    const activeFlags = globals.reduce((acc, key) => {
        const val = opts[key];
        return val ? acc.concat(typeof val === 'string' ? `${key}: ${val}` : key) : acc;
    }, []);

    console.log('Active flags: ', activeFlags);
}

if (empty) {
    convertEmpty(dest, options);
} else if (opts.list.length > 0) {
    Promise.all(opts.list.map((file) => convert(file, dest, options)));
}

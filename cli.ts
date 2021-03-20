import fs from 'fs';
import yargs from 'yargs';
import { importer } from './src';

const argv = yargs.usage('$0 file.xml').argv;

if (argv._.length === 0) {
  yargs.showHelp();
  process.exit();
}

argv._.forEach(async (file) => {
  const data = fs.readFileSync(file, 'utf8');
  const json = await importer(data);

  //console.log(json);
});

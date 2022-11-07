import { readFileSync } from 'node:fs';
import { importer } from './src';
import { mclip } from 'mclip';

const options = mclip(process.argv);

if (options.help) {
  process.exit();
}

(options.list as string[]).forEach((file) => {
  const data = readFileSync(file, 'utf8');
  const json = importer(data);

  console.log(json);
});

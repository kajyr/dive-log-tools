import path from 'node:path';
import fs from 'fs-extra';
import { Options } from './types';

const CONF_DIR = `.logbook-templates`;
const home = process.env.HOME || process.env.USERPROFILE || './';

type Config = { maps?: { key: string } };

const config: Config = require('home-config').load(path.join(CONF_DIR, 'config'));

const cacheDir = path.resolve(path.join(home, CONF_DIR, 'cache'));
fs.ensureDirSync(cacheDir);

const hasMaps = !!config.maps;
if (!hasMaps) {
  console.log('No maps api key found.');
}

const options: Options = {
  maps: config.maps,
  cacheDir,
};

export default options;

import path from 'node:path';
import fs from 'fs-extra';
import { Config } from './types';
import homeCfg from 'home-config';

const CONF_DIR = `.logbook-templates`;
const home = process.env.HOME || process.env.USERPROFILE || './';

// Config from home settings
const homeConfig: any = homeCfg.load(path.join(CONF_DIR, 'config'));
const hasMaps = !!homeConfig.maps;
if (!hasMaps) {
  console.log('No maps api key found.');
}

// Cache dir
const cacheDir = path.resolve(path.join(home, CONF_DIR, 'cache'));
fs.ensureDirSync(cacheDir);

const options: Config = {
  maps: homeConfig.maps,
  cacheDir,
};

export default options;

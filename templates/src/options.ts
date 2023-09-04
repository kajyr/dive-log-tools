import path from 'node:path';
import fs from 'fs-extra';
import { Config } from './types';
import { homedir } from 'node:os';
import dotenv from 'dotenv';

const CONF_DIR = `.logbook-templates`;
const home = path.join(homedir(), CONF_DIR);

dotenv.config({ path: path.join(home, 'config') });

// Config from home settings
const hasMaps = !!process.env.MAPS_KEY;
if (!hasMaps) {
  console.log('No maps api key found.');
}

// Cache dir
const cacheDir = path.resolve(path.join(home, 'cache'));
fs.ensureDirSync(cacheDir);

const options: Config = {
  cacheDir,
  maps: { key: process.env.MAPS_KEY || '' },
};

export default options;

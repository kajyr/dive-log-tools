/**
 * Url downloader to file module
 */
import path from 'path';
import https from 'https';
import { createWriteStream, existsSync } from 'fs';
import { Options } from '../types';

async function getUrl(url: string, output: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(output);
    https.get(url, (response) => {
      response
        .pipe(file)
        .on('finish', () => {
          resolve(output);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });
}

async function getUrlCached(url: string, destination: string, options: Options) {
  const { verbose, cacheDir } = options;
  const cached = path.join(cacheDir, destination);
  if (verbose) {
    console.log(`Downloading ${url}`);
  }
  if (existsSync(cached)) {
    //file exists
    if (verbose) {
      console.log(`Cached ${cached}`);
    }
    return Promise.resolve(cached);
  }

  return getUrl(url, cached);
}

export default getUrlCached;

import { Dive } from 'dive-log-importer';

import getUrl from './getUrl';
import mkHash from '../md5';
import { Options } from '../types';

const mapW = 900;
const mapH = 300;
const size = `${900}x${mapH}`;
const zoom = '12';

async function getMap(lat: string, lng: string, options: Options) {
  const markers = encodeURIComponent(`|${lat},${lng}|`);
  const params = [`size=${size}`, `zoom=${zoom}`, `markers=${markers}`].join('&');

  const url = `https://maps.googleapis.com/maps/api/staticmap?${params}&key=${options.maps?.key}`;

  const hash = mkHash(params);

  return getUrl(url, `${hash}.png`, options);
}

export async function getImage(dive: Partial<Dive>, options: Options) {
  if (!options?.maps) {
    return null;
  }
  if (!dive.location) {
    return null;
  }

  const { lat, lng } = dive.location;

  if (!lat || !lng) {
    return null;
  }

  const image = await getMap(lat, lng, options);

  return image;
}

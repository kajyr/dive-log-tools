import { EnricherFn } from '.';
import getUrl from '../neutrons/getUrl';
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

const enricher: EnricherFn = async (dive, options) => {
  if (!options?.maps) {
    return dive;
  }
  if (!dive.location) {
    return dive;
  }
  const { lat, lng } = dive.location;

  if (!lat || !lng) {
    return dive;
  }

  const image = await getMap(lat, lng, options);

  if (!image) {
    return dive;
  }
  return {
    ...dive,
    location: {
      ...dive.location,
      image,
    },
  };
};

export default enricher;

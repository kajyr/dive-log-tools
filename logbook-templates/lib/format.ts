/**
 * Takes a 14:13:22 string and return it formatted. 14:13
 */
export function time(str: string) {
  const [h, m, s] = str.split(':');
  return [h, m].join(':');
}

export function timefromSeconds(sec_str: string) {
  let sec = parseFloat(sec_str);

  const h = Math.floor(sec / 3600);
  sec %= 3600;
  const m = Math.floor(sec / 60);

  return [h, m].join(':');
}

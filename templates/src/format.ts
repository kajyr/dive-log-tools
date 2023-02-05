/**
 * Takes a 14:13:22 string and return it formatted. 14:13
 */
export function time(str: string | undefined) {
  if (!str) {
    return;
  }
  const [h, m] = str.split(':');
  return [h, m].join(':');
}

export function timefromSeconds(sec_str: string | number) {
  let sec = parseFloat(String(sec_str));

  const h = Math.floor(sec / 3600);
  sec %= 3600;
  const m = Math.floor(sec / 60);

  return [h, m].join(':');
}

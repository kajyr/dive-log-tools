/**
 * Fills a list of values, from a total amount.
 * @param list
 * @param total
 * @returns
 */

export function fillMissing(list: (number | null)[], total: number) {
  // 0 is not null, dont' want to count it
  const nulls = list.filter((v) => v == null);
  // the space already taken
  const taken = list.reduce((acc: number, cur) => {
    return cur ? (acc || 0) + cur : acc || 0;
  }, 0);

  const remaining = total - taken;

  if (remaining < 0) {
    throw new Error('There is not enough space available');
  }

  const spread = remaining / nulls.length;

  return list.map((v) => (v != null ? v : spread));
}

export function spread(list: (number | null)[], start: number, end: number, gutter: number) {
  const available = end - gutter * (list.length - 1);

  const rows = fillMissing(list, available);
  let cur = start;
  return rows.map((value) => {
    const r = [cur, value];
    cur = cur + value + gutter;
    return r;
  });
}

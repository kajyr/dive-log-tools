/**
 * Centers a length inside another.
 * Useful for v-centering text into an area
 * s       length
 * ---------
 *   ----
 *      l2
 */
export function center(start: number, length: number, l2: number) {
  return start + (length - l2) / 2;
}

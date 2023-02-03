export function trimNewLines(str: string | undefined) {
  if (!str) {
    return '';
  }
  return str.trim().replace(/^[\s\n]+|[\s\n]+$/, '');
}

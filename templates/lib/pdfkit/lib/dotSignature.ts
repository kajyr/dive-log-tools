export type SignOpts = { version: string; isFake: boolean };

export function sign({ version, isFake }: SignOpts) {
  const s = [isFake ? ':' : '.'];

  return `${s.join('')} ${version}`;
}

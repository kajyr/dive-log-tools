export type SignOpts = { version: string; isFake: boolean | undefined };

export function sign({ version, isFake }: SignOpts) {
  const s = [isFake ? ':' : '.'];

  return `${s.join('')} ${version}`;
}

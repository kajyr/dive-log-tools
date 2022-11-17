type Opts = { version: string; isFake: boolean };

export function sign({ version, isFake }: Opts) {
  const s = [isFake ? ':' : '.'];

  return `${s.join('')} ${version}`;
}

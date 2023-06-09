const size = 4;

function pushBack<T>(list: T[], index: number) {
  list.push(list.splice(index, 1)[0]);
}

function sortPagesForPrinting<T>(fns: T[]) {
  const arrays: T[][] = [];

  for (let i = 0; i < fns.length; i += size) {
    const block = fns.slice(i, i + size);
    pushBack(block, 1); // move page 2 to the end
    arrays.push(block);
  }

  return arrays.flat();
}

export default sortPagesForPrinting;

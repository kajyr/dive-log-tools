import page from '../atoms/page';
import { Doc } from '../types';

import { PageFactory } from './types';

export function blankPage(doc: Doc) {
  page(doc, true, () => {
    return;
  });
}

const draw: PageFactory = async (doc) => {
  return [() => blankPage(doc)];
};

export default draw;

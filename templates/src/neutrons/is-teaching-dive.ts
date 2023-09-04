import { Dive } from 'dive-log-importer';
import { Maybe } from 'types';

function lowerCaseInclude(list: Maybe<string[]>, words: string[]) {
  return list && list.some((element) => words.includes(element.toLowerCase()));
}

function isTeachingDive(dive: Partial<Dive>) {
  return lowerCaseInclude(dive.tags, ['istruttore', 'didattica']);
}

export default isTeachingDive;

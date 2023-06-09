import { Dive } from 'dive-log-importer';
import { Maybe } from 'types';

function lowerCaseInclude(list: Maybe<string[]>, word: string) {
  return list && list.some((element) => element.toLowerCase() === word);
}

function isTeachingDive(dive: Partial<Dive>) {
  return lowerCaseInclude(dive.tags, 'istruttore');
}

export default isTeachingDive;

import typeEnri from './type';
import gases from './gases';
import { Options, PartialLogbook } from '../types';
import { Dive } from 'dive-log-importer';

type MaybePromise<T> = Promise<T> | T;

export type EnricherFn = (dive: Partial<Dive>, options?: Options) => MaybePromise<Partial<Dive>>;

const enrichers = [typeEnri, gases];

const enricher = async (dive: Partial<Dive>, options: Options) => {
  let updated = dive;
  for (const fn of enrichers) {
    updated = await fn(updated, options);
  }
  return updated;
};

async function enrich(logbook: PartialLogbook, options: Options) {
  return Promise.all(logbook.dives.map((dive) => enricher(dive, options))).then((dives) => {
    return { ...logbook, dives };
  });
}

export default enrich;

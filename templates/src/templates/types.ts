import { Dive } from 'dive-log-importer';

import { Doc, Options, RenderOptions } from '../types';

export type PageFn = (doc: Doc) => void;

export type PageFactory = (
  doc: Doc,
  dive: Partial<Dive>,
  options: Options,
  renderOptions: RenderOptions,
) => Promise<PageFn[]>;

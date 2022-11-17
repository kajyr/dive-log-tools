import { EnricherFn } from '.';

const enricher: EnricherFn = (dive) => {
  const { types: scopo, ...other } = dive;

  return {
    ...other,
    scopo: (scopo || []).join(', '),
  };
};

export default enricher;

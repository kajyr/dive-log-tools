export function scale(in_min: number, in_max: number, out_min: number, out_max: number) {
  return (num: number) => {
    // short circuit
    if (in_min === in_max) {
      return out_min;
    }
    return ((num - in_min) * (out_min - out_max)) / (in_max - in_min) + out_max;
  };
}

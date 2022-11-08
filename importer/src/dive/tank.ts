export function tankName(size: string | number, name: string | null, isDouble: boolean) {
  if (name) {
    return name;
  }

  if (isDouble) {
    const sizeNumber = Number(size);
    const eachBottle = sizeNumber / 2;
    return `${eachBottle} + ${eachBottle}`;
  }

  return size.toString();
}

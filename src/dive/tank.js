function tankName(size, name, isDouble) {
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

module.exports = {
  tankName,
};

export const randomColors = (palettes, colors) => {
  const allColors = palettes.map(p => p.colors).flat();
  let rand;
  let randomColor;
  let isDuplicateColor = true;

  while (isDuplicateColor) {
    rand = Math.floor(Math.random() * allColors.length);
    randomColor = allColors[rand];
    const { name: randomColorName } = randomColor;

    /* eslint-disable no-loop-func */
    isDuplicateColor = colors.some(({ name }) => name === randomColorName);
    /* eslint-enable */
  }

  return randomColor;
};

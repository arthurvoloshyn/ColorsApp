export const randomColors = (palettes, colors, cb) => {
  const allColors = palettes.map(p => p.colors).flat();
  let rand;
  let randomColor;
  let isDuplicateColor = true;

  while (isDuplicateColor) {
    rand = Math.floor(Math.random() * allColors.length);
    randomColor = allColors[rand];

    /* eslint-disable no-loop-func */
    isDuplicateColor = colors.some(
      color => color.name === randomColor.name
    );
    /* eslint-enable */

  };

  return cb(randomColor);
};

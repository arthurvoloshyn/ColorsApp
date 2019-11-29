export const randomColors = (palettes, colors, cb) => {
  const allColors = palettes.map(p => p.colors).flat();
  let rand;
  let randomColor;
  let isDuplicateColor = true;

  while (isDuplicateColor) {
    rand = Math.floor(Math.random() * allColors.length);
    randomColor = allColors[rand];
    isDuplicateColor = colors.some(
      color => color.name === randomColor.name
    );
  };

  return cb(randomColor);
};

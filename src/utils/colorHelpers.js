import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = ({ paletteName, id, emoji, colors }) => {
  const newPalette = {
    paletteName,
    id,
    emoji,
    colors: {}
  };

  for (const level of levels) {
    newPalette.colors[level] = [];
  }

  for (const color of colors) {
    const { name, color: colour } = color;
    const scale = getScale(colour, 10).reverse();

    for (const i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${name} ${levels[i]}`,
        id: name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)')
      });
    }
  }

  return newPalette;
};

const getRange = hexColor => {
  const end = '#fff';

  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
};

const getScale = (hexColor, numberOfColors) => {
  return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(numberOfColors);
};

export { generatePalette };

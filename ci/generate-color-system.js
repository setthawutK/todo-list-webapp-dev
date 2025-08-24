const fs = require('fs');
// const colorsSystem = require('../build/token/json/variables.json');
const colorsSystem = require('../tokens_color.json');
const util = require('util');

function generate() {
  const colors = {};
  const safelist = [];
  const tailwindConfig = {
    theme: {
      extend: {},
    },
  };

  for (const pallete of Object.keys(colorsSystem.Palette.palette)) {
    colors[pallete.toLowerCase()] = {};
    for (const shade of Object.keys(colorsSystem.Palette.palette[pallete])) {
      const value = colorsSystem.Palette.palette[pallete][shade].value;
      colors[pallete.toLowerCase()][shade] = value;
    }

    if (pallete !== 'Gradient') {
      safelist.push(pallete.toLowerCase());
    }
  }

  let colorThemeData = {};

  for (const colorTheme of Object.keys(colorsSystem['Color Themes'])) {
    const colorThemeName = colorTheme.toLowerCase().replace(/[-\s]/g, '_');
    colorThemeData = { ...colorThemeData, [colorThemeName]: {} };

    for (const type of Object.keys(colorsSystem['Color Themes'][colorTheme])) {
      const typeName = type.toLowerCase().replace(/[-\s]/g, '_');
      colorThemeData[colorThemeName] = {
        ...colorThemeData[colorThemeName],
        [typeName]: {},
      };
      for (const subType of Object.keys(colorsSystem['Color Themes'][colorTheme][type])) {
        const subTypeName = subType.toLowerCase().replace(/[-\s]/g, '_');
        const subTypeValue = colorsSystem['Color Themes'][colorTheme][type][subType].value;
        const refColor = subTypeValue[0] === '{' ? subTypeValue.slice(1, -1) : subTypeValue.includes('$') ? subTypeValue.slice(5, -1) : '';
        let pallete = colorsSystem.Palette;
        let rgba = undefined;

        if (subTypeValue.includes('$')) {
          // Case RGBA
          const dataList = [];
          for (const key of refColor.split(', ')) {
            let rgbaPallete = colorsSystem.Palette;

            for (const subKey of key.split('.')) {
              if (subKey === '$opacity') {
                rgbaPallete = colorsSystem['Color Themes'];
              }

              rgbaPallete = rgbaPallete[subKey.replace('$', '')];
            }
            dataList.push(rgbaPallete.value);
          }
          rgba = `rgba(${dataList.join(', ')})`;
        } else {
          for (const key of refColor.split('.')) {
            pallete = pallete[key];
          }
        }

        const color = pallete?.value ?? rgba ?? subTypeValue;
        colorThemeData[colorThemeName][typeName] = {
          ...colorThemeData[colorThemeName][typeName],
          [subTypeName]: color,
        };
      }
    }
  }

  tailwindConfig.theme.extend = { colors: { ...colors, ...colorThemeData } };

  let data = util.inspect(tailwindConfig, false, 10, false);

  fs.writeFileSync('../preset-tailwind.config.ts', `module.exports = ${data}`);
}

generate();

import { colorsRgb, wikiColorsRgb } from '../data/colors.js';
import { hex2rgb, rgb2hslIntegers } from '../utils/utils.js';
const RGBCOLORS = { ...wikiColorsRgb, ...colorsRgb };

const approximateColor = color => {
  const [R, G, B] = hex2rgb(color);

  // find distance for all the colors
  const distances = Object.keys(RGBCOLORS).reduce((acc, clr) => {
    const [r, g, b] = RGBCOLORS[clr];
    const dist = Math.sqrt(Math.pow(r - R, 2) + Math.pow(g - G, 2) + Math.pow(b - B, 2));

    return { ...acc, [clr]: dist };
  }, {});

  // sort the list of colors by how close they are to the input color
  const matches = [...Object.keys(RGBCOLORS)].sort((a, b) => distances[a] - distances[b]);

  return([matches, distances]);
};

const getClosestHSL = color => {
  const [H, S, L] = rgb2hslIntegers(hex2rgb(color));

  // find distances for all the colors
  const distances = Object.keys(RGBCOLORS).reduce((acc, clr) => {
    const [h, s, l] = rgb2hslIntegers(RGBCOLORS[clr]);
    const dist = Math.sqrt(Math.pow(h - H, 2) + Math.pow(s - S, 2) + Math.pow(l - L, 2));

    return { ...acc, [clr]: dist };
  }, {});

  // sort the list of colors by how close they are to the input color
  const matches = [...Object.keys(RGBCOLORS)].sort((a, b) => distances[a] - distances[b]);

  return([matches, distances]);
};

const createListItem = (dist, name, vals) => {
  const item = document.createElement('li');

  const spnDist = document.createElement('span');
  spnDist.textContent = `${dist.toFixed(1)}`;
  
  const divSwatch = document.createElement('div');
  divSwatch.style.backgroundColor = vals;
  divSwatch.style.height = '1rem';
  divSwatch.style.width = '1rem';

  const spnName = document.createElement('span');
  spnName.textContent = `${name} ${vals}`;

  // append the list item to the list
  item.append(spnDist, divSwatch, spnName);
  return item;
};

export default options => {
  const opts = {
    ...options
  };

  // create parent element
  const parent = document.createElement('form');
  parent.className = 'color2name';

  // create color input
  const divIn = document.createElement('div');
  divIn.className = 'in';
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  const colorRGB = document.createElement('span');
  const colorHSL = document.createElement('span');

  // create results list
  const divOut = document.createElement('div');
  divOut.className = 'out';
  const resultsRGB = document.createElement('ul');
  const resultsHSL = document.createElement('ul');

  // event handler for color change
  colorInput.addEventListener('change', e => {
    // reset results
    resultsRGB.innerHTML = '<label>rgb<label>';
    resultsHSL.innerHTML = '<label>hsl<label>';

    // update the color values for rgb and hsl
    colorRGB.textContent = `rgb(${hex2rgb(e.target.value).join(', ')})`;
    const HSL = rgb2hslIntegers(hex2rgb(e.target.value));
    colorHSL.textContent = `hsl(${HSL[0]}, ${HSL[1]}%, ${HSL[2]}%)`;

    // find the closest colors
    const [rgbSorted, distsRGB] = approximateColor(e.target.value);
    const [hslSorted, distsHSL] = getClosestHSL(e.target.value);

    for (let i = 0; i <= 6; i++) {
      const rgbName = rgbSorted[i];
      const rgbCSS = `rgb(${RGBCOLORS[rgbName].join(', ')})`;
      const hslName = hslSorted[i];
      const hsl = rgb2hslIntegers(RGBCOLORS[hslName]);
      const hslCSS = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

      resultsRGB.append(createListItem(distsRGB[rgbName], rgbName, rgbCSS));
      resultsHSL.append(createListItem(distsHSL[hslName], hslName, hslCSS));
    }
  });

  // append children and return parent
  divIn.append(colorInput, colorRGB, colorHSL);
  divOut.append(resultsRGB, resultsHSL);
  parent.append(divIn, divOut);
  return parent;
};

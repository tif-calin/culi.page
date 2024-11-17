import { colorsRgb, wikiColorsRgb } from '../data/colors.js';
import { hex2rgb, rgb2hsl } from '../utils/utils.js';

let RGB_COLORS = { ...wikiColorsRgb, ...colorsRgb };

const getClosestRGB = color => {
  const [R, G, B] = hex2rgb(color);

  // find distance for all the colors
  const distances = Object.keys(RGB_COLORS).reduce((acc, clr) => {
    const [r, g, b] = RGB_COLORS[clr];
    const dist = Math.sqrt(Math.pow(r - R, 2) + Math.pow(g - G, 2) + Math.pow(b - B, 2));

    return { ...acc, [clr]: dist };
  }, {});

  // sort the list of colors by how close they are to the input color
  const matches = [...Object.keys(RGB_COLORS)].sort((a, b) => distances[a] - distances[b]);

  return([matches, distances]);
};

const getClosestHSL = color => {
  const [H, S, L] = rgb2hsl(hex2rgb(color), true);

  // find distances for all the colors
  const distances = Object.keys(RGB_COLORS).reduce((acc, clr) => {
    const [h, s, l] = rgb2hsl(RGB_COLORS[clr], true);
    const hDist = Math.min(Math.abs(h - H), Math.abs(360 - Math.abs(h + H)));
    const dist = Math.sqrt(Math.pow(hDist, 2) + Math.pow(s - S, 2) + Math.pow(l - L, 2));

    return { ...acc, [clr]: dist };
  }, {});

  // sort the list of colors by how close they are to the input color
  const matches = [...Object.keys(RGB_COLORS)].sort((a, b) => distances[a] - distances[b]);

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

/**
 * @param {{
 *  inventory?: Record<string, [number, number, number]>;
 * }} options
 */
export default options => {
  const opts = {
    inventory: RGB_COLORS,
    ...options
  };

  RGB_COLORS = opts.inventory;

  // create parent element
  const parent = document.createElement('form');
  parent.className = 'color2nearestname';

  // create color input
  const divIn = document.createElement('div');
  divIn.className = 'in';
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = 'hex value of color';
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  const colorRGB = document.createElement('span');
  const colorHSL = document.createElement('span');

  // create results list
  const divOut = document.createElement('div');
  divOut.className = 'out';
  divOut.style.display = 'none';
  const resultsRGB = document.createElement('ul');
  const resultsHSL = document.createElement('ul');

  // event handler for color change
  const updateView = hex => {
    divOut.style.display = 'flex';

    // reset results
    resultsRGB.innerHTML = '<label>rgb<label>';
    resultsHSL.innerHTML = '<label>hsl<label>';

    // update the color values for rgb and hsl
    colorRGB.textContent = `rgb(${hex2rgb(hex).join(', ')})`;
    const HSL = rgb2hsl(hex2rgb(hex), true);
    colorHSL.textContent = `hsl(${HSL[0]}, ${HSL[1]}%, ${HSL[2]}%)`;

    // find the closest colors
    const [rgbSorted, distsRGB] = getClosestRGB(hex);
    const [hslSorted, distsHSL] = getClosestHSL(hex);

    for (let i = 0; i <= 6; i++) {
      const rgbName = rgbSorted[i];
      const rgbCSS = `rgb(${RGB_COLORS[rgbName].join(', ')})`;
      const hslName = hslSorted[i];
      const hsl = rgb2hsl(RGB_COLORS[hslName], true);
      const hslCSS = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;

      resultsRGB.append(createListItem(distsRGB[rgbName], rgbName, rgbCSS));
      resultsHSL.append(createListItem(distsHSL[hslName], hslName, hslCSS));
    }
  };

  textInput.addEventListener('input', e => {
    e.preventDefault();

    if (!e.target) return;
    if (!('value' in e.target)) return;
    const targetValue = e.target.value;
    if (!(typeof targetValue === 'string')) return;

    let current = targetValue.toLowerCase();
    if (current[0] !== '#') current = `#${current}`;
    if (current.length > 7) current = `#${current.slice(-6)}`;

    e.target.value = current;
    colorInput.value = current;
    updateView(current);
  });

  colorInput.addEventListener('change', e => {
    e.preventDefault();

    if (!e.target) return;
    if (!('value' in e.target)) return;
    const targetValue = e.target.value;
    if (!(typeof targetValue === 'string')) return;

    textInput.value = targetValue;

    console.log(e.target.value);

    updateView(e.target.value);
  });

  // append children and return parent
  divIn.append(colorInput, textInput, colorRGB, colorHSL);
  divOut.append(resultsRGB, resultsHSL);
  parent.append(divIn, divOut);
  return parent;
};

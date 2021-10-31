const rgb2hex = (rgb, fromString = true) => fromString
  ? `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
  : `#${rgb.map(n => n.toString(16).padStart(2, '0')).join('')}`
;

const hex2rgb = hex => /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).map(str => parseInt(str, 16)).slice(1);

const rgb2hsl = (rgb, toIntegers = false) => {
  const rgbNorm = rgb.map(c => c /= 255);
  const max = Math.max(...rgbNorm);
  const min = Math.min(...rgbNorm);
  const dif = max - min;
  const ind = rgbNorm.indexOf(max);

  let h, s, l = (max + min) / 2;
  if (dif) {
    s = dif / (1 - Math.abs(2 * l - 1));
    h = 60 * ((2 * ind) + (rgbNorm[(ind + 1) % 3] - rgbNorm[(ind + 2) % 3]) / dif);
    h = (h + 360) % 360; // make sure not negative
  } else h = s = 0;

  return toIntegers 
    ? [h, s, l].map((c, i) => Math.round(c * (i ? 100 : 1)))
    : [h, s, l]
  ;
};

const rgb2hslIntegers = rgb => {
  const hsl = rgb2hsl(rgb);
  return [Math.round(hsl[0]), Math.round(hsl[1] * 100), Math.round(hsl[2] * 100)];
};

export {
  rgb2hex,
  hex2rgb,
  rgb2hsl,
  rgb2hslIntegers,
};

export const rgb2hex = rgb => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

export const hex2rgb = hex => /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).map(str => parseInt(str, 16)).slice(1);

export const rgb2hsl = rgb => {
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

  return [h, s, l];
};

export const rgb2hslIntegers = rgb => {
  const hsl = rgb2hsl(rgb);
  return [Math.round(hsl[0]), Math.round(hsl[1] * 100), Math.round(hsl[2] * 100)];
};

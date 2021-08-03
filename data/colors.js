const colors = {
  acid: '#00ff25',
  aero: '#7cb9e8',
  amaranth: '#e52b50',
  'amber': '#ffbf00',
  ao: '#008000',
  'aqua': '#00ffff',
  'aquamarine': '#7fffd4',
  artichoke: '#8f9779',
  asparagus: '#87a96b',
  aureolin: '#fdee00',
  'azure': '#0080ff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  'black': '#000000',
  'blue': '#0000ff',
  bluetiful: '#3c69e7',
  blush: '#ffb3bf',
  bone: '#fffaf2',
  brass: '#b5a642',
  bronze: '#cd7f32',
  burgundy: '#800020',
  'brown': '#964b00',
  canary: '#ffff99',
  'capri': '#00bfff',
  'carmine': '#960018',
  catawba: '#703642',
  celadon: '#ace1af',
  celeste: '#b2ffff',
  cerise: '#de3163',
  'charcoal': '#36454f',
  'chartreuse': '#7fff00',
  'cinnabar': '#e44d2e',
  'cream': '#feeddc',
  'crimson': '#dc143c',
  'cyan': '#00ffff',
  'denim': '#1b4b71',
  'ebony': '#91634d',
  'emerald': '#50c878',
  eminence: '#6c3082',
  erin: '#00ff40',
  fandango: '#b53389',
  flame: '#e25822',
  flirt: '#a2006d',
  'fuchsia': '#fe007c',
  'gainsboro': '#dcdcdc',
  'gamboge': '#d29f28',
  'gold': '#ffd700',
  'goldenrod': '#daa520',
  'green': '#00ff00',
  'gray': '#808080',
  'grey': '#808080',
  'harlequin': '#3fff00',
  'heliotrope': '#df73ff',
  icterine: '#fcf75e',
  'indigo': '#4b0082',
  'jade': '#00a86b',
  'khaki': '#bab37e',
  'lavender': '#cfb5e2',
  liberty: '#545aa7',
  'lilac': '#d1c9ff',
  'lime': '#00ff00',
  'magenta': '#ff00ff',
  'malachite': '#285044',
  'marigold': '#e7a20b',
  'maroon': '#800000',
  'mint': '#aefac6',
  moonstone: '#3aa8c1',
  'navy': '#000080',
  neon: '#39ff14',
  'olive': '#808000',
  'orange': '#ff8000',
  'orangered': '#fc5123',
  orchid: '#da70d6',
  'peach': '#fdbb8d',
  'periwinkle': '#ccccff',
  phlox: '#df00ff',
  'pink': '#ffc0cb',
  'puce': '#cc8899',
  'purple': '#800080',
  purpureus: '#9a4eae',
  'quicksilver': '#a6a6a6',
  'red': '#ff0000',
  ruby: '#e0115f',
  'salmon': '#fa8072',
  sapphire: '#0f52ba',
  scarlet: '#ff2400',
  seashell: '#fff5ee',
  sepia: '#704214',
  'shamrock': '#3abf31',
  'silver': '#c0c0c0',
  snow: '#fffafa',
  straw: '#e4d96f',
  'tan': '#d2b48c',
  taupe: '#483c32',
  'teal': '#008080',
  thistle: '#d8bfd8',
  timberwolf: '#dbd7d2',
  tomato: '#ff6347',
  'turquoise': '#40e0d0',
  'ultramarine': '#3f00ff',
  umber: '#635147',
  verdigris: '#43b3ae',
  'vermillion': '#ff3f00',
  'violet': '#7f00ff',
  viridian: '#40826d',
  volt: '#ceff00',
  wheat: '#f5deb3',
  'white': '#ffffff',
  'xanthic': '#666057',
  'yellow': '#ffff00',
  'zaffre': '#0014a8'
};

const colorsRgb = {
  aero: [124, 185, 232],
  acid: [0, 255, 37],
  amaranth: [229, 43, 80],
  "amber": [255, 191, 0],
  ao: [0, 128, 0],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  artichoke: [143, 151, 121],
  asparagus: [135, 169, 107],
  aureolin: [253, 238, 0],
  "azure": [0, 128, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  "black": [0, 0, 0],
  "blue": [0, 0, 255],
  bluetiful: [60, 105, 231],
  blush: [255, 179, 191],
  bone: [255, 250, 242],
  brass: [181, 166, 66],
  bronze: [205, 127, 50],
  burgundy: [128, 0, 32],
  "brown": [150, 75, 0],
  canary: [255, 255, 153],
  "capri": [0, 191, 255],
  "carmine": [150, 0, 24],
  catawba: [112, 54, 66],
  celadon: [172, 225, 175],
  celeste: [178, 255, 255],
  cerise: [222, 49, 99],
  "charcoal": [54, 69, 79],
  "chartreuse": [127, 255, 0],
  "cinnabar": [228, 77, 46],
  "cream": [254, 237, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "denim": [27, 75, 113],
  "ebony": [145, 99, 77],
  "emerald": [80, 200, 120],
  eminence: [108, 48, 130],
  erin: [0, 255, 64],
  fandango: [181, 51, 137],
  flame: [226, 88, 34],
  flirt: [162, 0, 109],
  "fuchsia": [254, 0, 124],
  "gainsboro": [220, 220, 220],
  "gamboge": [210, 159, 40],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "green": [0, 255, 0],
  "gray": [128, 128, 128],
  "grey": [128, 128, 128],
  "harlequin": [63, 255, 0],
  "heliotrope": [223, 115, 255],
  icterine: [252, 247, 94],
  "indigo": [75, 0, 130],
  "jade": [0, 168, 107],
  "khaki": [186, 179, 126],
  "lavender": [207, 181, 226],
  liberty: [84, 90, 167],
  "lilac": [209, 201, 255],
  "lime": [0, 255, 0],
  "magenta": [255, 0, 255],
  "malachite": [40, 80, 68],
  "marigold": [231, 162, 11],
  "maroon": [128, 0, 0],
  "mint": [174, 250, 198],
  moonstone: [58, 168, 193],
  "navy": [0, 0, 128],
  neon: [57, 255, 20],
  "olive": [128, 128, 0],
  "orange": [255, 128, 0],
  "orangered": [252, 81, 35],
  orchid: [218, 112, 214],
  "peach": [253, 187, 141],
  "periwinkle": [204, 204, 255],
  phlox: [223, 0, 255],
  "pink": [255, 192, 203],
  "puce": [204, 136, 153],
  "purple": [128, 0, 128],
  purpureus: [154, 78, 174],
  "quicksilver": [166, 166, 166],
  "red": [255, 0, 0],
  ruby: [224, 17, 95],
  "salmon": [250, 128, 114],
  sapphire: [15, 82, 186],
  scarlet: [255, 36, 0],
  seashell: [255, 245, 238],
  sepia: [112, 66, 20],
  "shamrock": [58, 191, 49],
  "silver": [192, 192, 192],
  snow: [255, 250, 250],
  straw: [228, 217, 111],
  "tan": [210, 180, 140],
  taupe: [72, 60, 50],
  "teal": [0, 128, 128],
  thistle: [216, 191, 216],
  timberwolf: [219, 215, 210],
  tomato: [255, 99, 71],
  "turquoise": [64, 224, 208],
  "ultramarine": [63, 0, 255],
  umber: [99, 81, 71],
  verdigris: [67, 179, 174],
  "vermillion": [255, 63, 0],
  "violet": [127, 0, 255],
  viridian: [64, 130, 109],
  volt: [206, 255, 0],
  wheat: [245, 222, 179],
  "white": [255, 255, 255],
  "xanthic": [102, 96, 87],
  "yellow": [255, 255, 0],
  "zaffre": [0, 20, 168]
}

const cssColors = {
  'aliceblue': '#f0f8ff',
  'antiquewhite': '#faebd7',
  'aqua': '#00ffff',
  'aquamarine': '#7fffd4',
  'azure': '#f0ffff',
  'beige': '#f5f5dc',
  'bisque': '#ffe4c4',
  'black': '#000000',
  'blanchedalmond': '#ffebcd',
  'blue': '#0000ff',
  'blueviolet': '#8a2be2',
  'brown': '#a52a2a',
  'burlywood': '#deb887',
  'cadetblue': '#5f9ea0',
  'chartreuse': '#7fff00',
  'chocolate': '#d2691e',
  'coral': '#ff7f50',
  'cornflowerblue': '#6495ed',
  'cornsilk': '#fff8dc',
  'crimson': '#dc143c',
  'cyan': '#00ffff',
  'darkblue': '#00008b',
  'darkcyan': '#008b8b',
  'darkgoldenrod': '#b8860b',
  'darkgray': '#a9a9a9',
  'darkgreen': '#006400',
  'darkgrey': '#a9a9a9',
  'darkkhaki': '#bdb76b',
  'darkmagenta': '#8b008b',
  'darkolivegreen': '#556b2f',
  'darkorange': '#ff8c00',
  'darkorchid': '#9932cc',
  'darkred': '#8b0000',
  'darksalmon': '#e9967a',
  'darkseagreen': '#8fbc8f',
  'darkslateblue': '#483d8b',
  'darkslategray': '#2f4f4f',
  'darkslategrey': '#2f4f4f',
  'darkturquoise': '#00ced1',
  'darkviolet': '#9400d3',
  'deeppink': '#ff1493',
  'deepskyblue': '#00bfff',
  'dimgray': '#696969',
  'dimgrey': '#696969',
  'dodgerblue': '#1e90ff',
  'firebrick': '#b22222',
  'floralwhite': '#fffaf0',
  'forestgreen': '#228b22',
  'fuchsia': '#ff00ff',
  'gainsboro': '#dcdcdc',
  'ghostwhite': '#f8f8ff',
  'goldenrod': '#daa520',
  'gold': '#ffd700',
  'gray': '#808080',
  'green': '#008000',
  'greenyellow': '#adff2f',
  'grey': '#808080',
  'honeydew': '#f0fff0',
  'hotpink': '#ff69b4',
  'indianred': '#cd5c5c',
  'indigo': '#4b0082',
  'ivory': '#fffff0',
  'khaki': '#f0e68c',
  'lavenderblush': '#fff0f5',
  'lavender': '#e6e6fa',
  'lawngreen': '#7cfc00',
  'lemonchiffon': '#fffacd',
  'lightblue': '#add8e6',
  'lightcoral': '#f08080',
  'lightcyan': '#e0ffff',
  'lightgoldenrodyellow': '#fafad2',
  'lightgray': '#d3d3d3',
  'lightgreen': '#90ee90',
  'lightgrey': '#d3d3d3',
  'lightpink': '#ffb6c1',
  'lightsalmon': '#ffa07a',
  'lightseagreen': '#20b2aa',
  'lightskyblue': '#87cefa',
  'lightslategray': '#778899',
  'lightslategrey': '#778899',
  'lightsteelblue': '#b0c4de',
  'lightyellow': '#ffffe0',
  'lime': '#00ff00',
  'limegreen': '#32cd32',
  'linen': '#faf0e6',
  'magenta': '#ff00ff',
  'maroon': '#800000',
  'mediumaquamarine': '#66cdaa',
  'mediumblue': '#0000cd',
  'mediumorchid': '#ba55d3',
  'mediumpurple': '#9370db',
  'mediumseagreen': '#3cb371',
  'mediumslateblue': '#7b68ee',
  'mediumspringgreen': '#00fa9a',
  'mediumturquoise': '#48d1cc',
  'mediumvioletred': '#c71585',
  'midnightblue': '#191970',
  'mintcream': '#f5fffa',
  'mistyrose': '#ffe4e1',
  'moccasin': '#ffe4b5',
  'navajowhite': '#ffdead',
  'navy': '#000080',
  'oldlace': '#fdf5e6',
  'olive': '#808000',
  'olivedrab': '#6b8e23',
  'orange': '#ffa500',
  'orangered': '#ff4500',
  'orchid': '#da70d6',
  'palegoldenrod': '#eee8aa',
  'palegreen': '#98fb98',
  'paleturquoise': '#afeeee',
  'palevioletred': '#db7093',
  'papayawhip': '#ffefd5',
  'peachpuff': '#ffdab9',
  'peru': '#cd853f',
  'pink': '#ffc0cb',
  'plum': '#dda0dd',
  'powderblue': '#b0e0e6',
  'purple': '#800080',
  'rebeccapurple': '#663399',
  'red': '#ff0000',
  'rosybrown': '#bc8f8f',
  'royalblue': '#4169e1',
  'saddlebrown': '#8b4513',
  'salmon': '#fa8072',
  'sandybrown': '#f4a460',
  'seagreen': '#2e8b57',
  'seashell': '#fff5ee',
  'sienna': '#a0522d',
  'silver': '#c0c0c0',
  'skyblue': '#87ceeb',
  'slateblue': '#6a5acd',
  'slategray': '#708090',
  'slategrey': '#708090',
  'snow': '#fffafa',
  'springgreen': '#00ff7f',
  'steelblue': '#4682b4',
  'tan': '#d2b48c',
  'teal': '#008080',
  'thistle': '#d8bfd8',
  'tomato': '#ff6347',
  'turquoise': '#40e0d0',
  'violet': '#ee82ee',
  'wheat': '#f5deb3',
  'white': '#ffffff',
  'whitesmoke': '#f5f5f5',
  'yellow': '#ffff00',
  'yellowgreen': '#9acd32'
}

const cssColorsRgb = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "goldenrod": [218, 165, 32],
  "gold": [255, 215, 0],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavenderblush": [255, 240, 245],
  "lavender": [230, 230, 250],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
}

const wikiColors = {
  "aero": "#7cb9e8",
  "amber": "#ffbf00",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "asparagus": "#87a96b",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blue": "#0000ff",
  "bronze": "#cd7f32",
  "carmine": "#960018",
  "celadon": "#ace1af",
  "cerulean": "#007ba7",
  "charcoal": "#36454f",
  "coral": "#ff7f50",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "eggshell": "#f0ead6",
  "eigengrau": "#16161d",
  "emerald": "#50c878",
  "feldgrau": "#4d5d53",
  "firebrick": "#b22222",
  "gainsboro": "#dcdcdc",
  "glaucous": "#6082b6",
  "green": "#00ff00",
  "heliotrope": "#df73ff",
  "honeydew": "#f0fff0",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "jade": "#00a86b",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "olive": "#808000",
  "orchid": "#da70d6",
  "periwinkle": "#ccccff",
  "pink": "#ffc0cb",
  "red": "#ff0000",
  "rose": "#ff007f",
  "ruby": "#e0115f",
  "salmon": "#fa8072",
  "scarlet": "#ff2400",
  "seashell": "#fff5ee",
  "silver": "#c0c0c0",
  "snow": "#fffafa",
  "tan": "#d2b48c",
  "taupe": "#483c32",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "turquoise": "#40e0d0",
  "ultramarine": "#3f00ff",
  "viridian": "#40826d",
  "white": "#ffffff",
  "xanadu": "#738678",
  "yellow": "#ffff00"
};

const wikiColorsRgb = {
  "aero": [
    49,
    73,
    91
  ],
  "amber": [
    100,
    75,
    0
  ],
  "aqua": [
    0,
    100,
    100
  ],
  "aquamarine": [
    50,
    100,
    83
  ],
  "asparagus": [
    53,
    66,
    42
  ],
  "bisque": [
    100,
    89,
    77
  ],
  "black": [
    0,
    0,
    0
  ],
  "blue": [
    0,
    0,
    100
  ],
  "bronze": [
    80,
    50,
    20
  ],
  "carmine": [
    59,
    0,
    9
  ],
  "celadon": [
    67,
    88,
    69
  ],
  "cerulean": [
    0,
    48,
    65
  ],
  "charcoal": [
    21,
    27,
    31
  ],
  "coral": [
    100,
    50,
    31
  ],
  "crimson": [
    86,
    8,
    24
  ],
  "cyan": [
    0,
    100,
    100
  ],
  "eggshell": [
    94,
    92,
    84
  ],
  "eigengrau": [
    9,
    9,
    11
  ],
  "emerald": [
    31,
    78,
    47
  ],
  "feldgrau": [
    30,
    36,
    33
  ],
  "firebrick": [
    70,
    13,
    13
  ],
  "gainsboro": [
    86,
    86,
    86
  ],
  "glaucous": [
    38,
    51,
    71
  ],
  "green": [
    0,
    100,
    0
  ],
  "heliotrope": [
    87,
    45,
    100
  ],
  "honeydew": [
    94,
    100,
    94
  ],
  "indigo": [
    29,
    0,
    51
  ],
  "ivory": [
    100,
    100,
    94
  ],
  "jade": [
    0,
    66,
    42
  ],
  "linen": [
    98,
    94,
    90
  ],
  "magenta": [
    100,
    0,
    100
  ],
  "olive": [
    50,
    50,
    0
  ],
  "orchid": [
    85,
    44,
    84
  ],
  "periwinkle": [
    80,
    80,
    100
  ],
  "pink": [
    100,
    75,
    80
  ],
  "red": [
    100,
    0,
    0
  ],
  "rose": [
    100,
    0,
    50
  ],
  "ruby": [
    88,
    7,
    37
  ],
  "salmon": [
    98,
    50,
    45
  ],
  "scarlet": [
    100,
    14,
    0
  ],
  "seashell": [
    100,
    96,
    93
  ],
  "silver": [
    75,
    75,
    75
  ],
  "snow": [
    100,
    98,
    98
  ],
  "tan": [
    82,
    71,
    55
  ],
  "taupe": [
    28,
    24,
    20
  ],
  "teal": [
    0,
    50,
    50
  ],
  "thistle": [
    85,
    75,
    85
  ],
  "turquoise": [
    25,
    88,
    82
  ],
  "ultramarine": [
    7,
    4,
    56
  ],
  "viridian": [
    25,
    51,
    43
  ],
  "white": [
    100,
    100,
    100
  ],
  "xanadu": [
    45,
    53,
    47
  ],
  "yellow": [
    100,
    100,
    0
  ]
};

export { colorsRgb, cssColors, cssColorsRgb, wikiColors, wikiColorsRgb };
export default colors;

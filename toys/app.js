import { getPrefs, updatePrefs } from '../utils/localStorage.js';
import solarnoon from './solarnoon.js';
import text2colorgradient from './text2colorgradient.js';
import name2color from './name2color.js';
import color2nearestname from './color2nearestname.js';
import catfoodcostcalc from './catfoodcostcalc.js';

// grab dom elements
const settingsContainer = document.getElementById('settings-container');
const toyContainer = document.querySelector('#toy-container');

// setup state
const TOY_INFO = {
  solarnoon: {
    name: 'solarnoon',
    description: '',
    renderer: solarnoon,
    category: 'time'
  },
  text2colorgradient: {
    name: 'text2colorgradient',
    description: '',
    renderer: text2colorgradient,
    category: 'color'
  },
  name2color: {
    name: 'name2color',
    description: '',
    renderer: name2color,
    category: 'color'
  },
  color2nearestname: {
    name: 'color2nearestname',
    description: '',
    renderer: color2nearestname,
    category: 'color'
  },
  catfoodcostcalc: {
    name: 'catfoodcostcalc',
    description: '',
    renderer: catfoodcostcalc,
    category: 'catfood'
  }
};

// functions
const loadToy = async key => {
  const toyTitle = document.createElement('h3');
  toyTitle.name = key;
  toyTitle.innerHTML = TOY_INFO[key].name;
  toyTitle.classList.add('toy-title');
  const toy = await TOY_INFO[key].renderer(prefs['opts_' + key]);
  toy.classList.add('toy');
  toy.name = key;

  const h2Category = document.querySelector(`.category-${TOY_INFO[key].category}`).nextSibling;
  toyContainer.insertBefore(toyTitle, h2Category);
  toyContainer.insertBefore(toy, toyTitle.nextSibling);
};

// get prefs from localStorage if exist
const loadPrefs = () => {
  prefs = {
    show_solarnoon: false,
    show_text2colorgradient: true,
    show_name2color: false,
    show_catfoodcostcalc: true,
    opts_solarnoon: {},
    opts_text2colorgradient: { loud: true, approximateColorNames: true },
    opts_name2color: { corsProxy: true },
    opts_catfoodcostcalc: {},
    ...getPrefs()
  };
  updatePrefs(prefs);

  // generate checkboxes for each toy
  for (let toy of Object.keys(TOY_INFO)) {
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.name = toy;
    if (prefs['show_' + toy]) chk.checked = true;
    const lbl = document.createElement('label');
    lbl.textContent = TOY_INFO[toy].name;

    // add event listener to handle checkbox change
    chk.addEventListener('change', async e => {
      const key = e.target.name;

      // // load or remove the toy
      // if (!prefs['show_' + key]) loadToy(key);
      // else document.querySelectorAll(`.toy[name=${key}], .toy-title[name=${key}]`).forEach(el => el.remove());

      // update state
      prefs = getPrefs();
      const newPrefs = { ...prefs, ['show_' + toy]: chk.checked };

      // update localStorage
      updatePrefs(newPrefs);

      const refreshMssg = document.querySelector('.refresh-message');
      refreshMssg.style.display = prefs !== newPrefs ? 'block' : 'none';
    });

    settingsContainer.append(chk, lbl);
  }

  const refreshMssg = document.createElement('span');
  refreshMssg.classList.add('refresh-message');
  refreshMssg.textContent = 'Refresh to see changes';
  refreshMssg.style.display = 'none';
  settingsContainer.appendChild(refreshMssg);
};
loadPrefs()

// load toys
const loadToysInCategories = () => {
  const categories = Object.values(TOY_INFO).map(toy => toy.category).filter((v, i, a) => a.indexOf(v) === i);
  for (let category of categories) {
    const h2 = document.createElement('h2');
    h2.textContent = category;
    h2.className = `category-${category}`;
    h2.style.display = 'none';
    toyContainer.appendChild(h2);

    for (let toy of Object.keys(TOY_INFO)) {
      if (prefs['show_' + toy] && TOY_INFO[toy].category === category) {
        h2.style.display = 'block';
        loadToy(toy);
      }
    }
  }
}
loadToysInCategories();

// const toysToLoad = {};
// Object.keys(TOY_INFO).forEach(async key => {
//   if (prefs['show_' + key]) toysToLoad[key.category] = [...toysToLoad[key.category], key];
// });
// Object.keys(toysToLoad).forEach(category => {
//   const h2 = document.createElement('h2').textContent = category;
//   toyContainer.appendChild(h2);
// })

// imports
import COLORS from '../data/colors.js';

// define functions
const populateSelect = (domSlct, lstOpts, lstVals = null) => {
  if (!lstVals) lstVals = lstOpts;

  for (let i = 0; i < lstOpts.length; i++) {
    const option = document.createElement('option');
    option.textContent = lstOpts[i];
    option.value = lstVals[i];
    domSlct.appendChild(option);
  }
};

const makeDot = (color, hex) => {
  const dot = document.createElement('div');

  dot.textContent = 'x';
  dot.value = color;
  dot.style.backgroundColor = hex;
  dot.classList.add('citizen-circle');

  dot.addEventListener('click', e => {
    let tgt = e.target;
    if (tgt.parentNode.id === "roster-candidates") {
      const option = document.createElement("option");
      option.text = tgt.value;
      slcCnds.add(option);
    }
    tgt.parentNode.removeChild(tgt);
  })

  return dot;
};

// grab dom elements
const slcVtrs = document.getElementById('select-voters');
const btnVtrAdd = document.getElementById('button-voters');
const divVtrRst = document.getElementById('roster-voters');

const slcCnds = document.getElementById('select-candidates');
const btnCndAdd = document.getElementById('button-candidates');
const divCndRst = document.getElementById('roster-candidates');

// initialize page
populateSelect(slcVtrs, Object.keys(COLORS));
populateSelect(slcCnds, Object.keys(COLORS));

btnCndAdd.addEventListener('click', () => {
    // add a div circle to the roster div with the name in select and remove that color from select 
    const new_cnd = makeDot(slcCnds.value, COLORS[slcCnds.value]);

    for (let i = 0; i < slcCnds.length; i++) {
        if (slcCnds[i].value === slcCnds.value) slcCnds.remove(i);
    }

    divCndRst.appendChild(new_cnd);
});

btnVtrAdd.addEventListener('click', () => {
    // add a div circle to the roster div with the name in select
    const new_vtr = makeDot(slcVtrs.value, COLORS[slcVtrs.value]);

    divVtrRst.appendChild(new_vtr);
});

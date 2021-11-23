import { getRandom } from './utils.js';

const loadData = async () => {
  const data = await fetch('./data.txt')
    .then(response => response.text())
  ;

  return data.trim().split('\n').map(line => line.trim()).sort();
};

const updateFullList = questions => {
  const fullCount = document.querySelector('#full-count');
  fullCount.innerHTML = questions.length;

  const fullList = document.querySelector('#full-list');
  fullList.innerHTML = '';

  questions.forEach(question => {
    const li = document.createElement('li');
    li.innerHTML = question;
    fullList.appendChild(li);
  });
};

const getRandomQuestions = data => {
  '🔊';
  const howMany = Number(document.querySelector('#selection > input[type=number]').value) || 4;

  const list = document.querySelector('#selected-list');
  list.innerHTML = '';

  getRandom(data, howMany).forEach(question => {
    const li = document.createElement('li');
    li.innerHTML = question;
    list.appendChild(li);
  });
};

const initializeUI = data => {
  updateFullList(data);

  const randomButton = document.querySelector('#selection > button');
  randomButton.addEventListener('click', () => getRandomQuestions(data));
};

loadData().then(initializeUI);

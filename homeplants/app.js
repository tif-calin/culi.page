
import { getObservations } from './app/gbif.js';

const tally = (arr) => {
  const counts = {};

  for (let loc of arr) {
    counts[loc] ||= 0;
    counts[loc] += 1;
  }

  return counts;
};

const main = async () => {
  const inputGbif = document.querySelector('#form_identifiers input[name="gbif-id"]');

  const { data, gadmToName } = await getObservations({ taxonKey: inputGbif.value });
  console.log(`Observations for ${inputGbif.value}: `, data);

  const tallies = tally(data.map(item => item.gadmIds).flat());
  const formattedTallies = Object.fromEntries(Object.entries(tallies).sort((a, b) => b[1] - a[1]).map(([key, value]) => [`${gadmToName[key]} (${key})`, value]))
  console.table(formattedTallies);

  console.log('Ready!');
};

main();

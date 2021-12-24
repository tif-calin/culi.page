const newick2wikiclade = () => {
  const textAreaInput = document.getElementById('newick-input');
  const textAreaOutput = document.getElementById('newick-output');
  const button = document.getElementById('button-clade');

  const newickToWiki = (newick) => {
    const last = newick.lastIndexOf(')');
    const first = newick.indexOf('(');
    let output = newick.trim().slice(first, last + 1).replaceAll('(', '[').replaceAll(')', ']');
    output = output.replaceAll(/:\d.\d*/g, '');
    output = output.replaceAll(/(\w+)/g, '"$1"');
    output = JSON.parse(output);

    const recurse = (arr, level) => {
      let out = level ? `{{clade\n` : '{{clade\n';

      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          out += `${'  '.repeat(level + 1)}|${i + 1}=${recurse(arr[i], level + 1)}`;
        } else {
          out += `${'  '.repeat(level + 1)}|${i + 1}=${arr[i]}\n`;
        }
      }

      return `${out}${'  '.repeat(level)}}}\n`;
    };

    output = recurse(output, 0);

    return output;
  };

  button.addEventListener('click', () => {
    const input = textAreaInput.value;
    const output = newickToWiki(input);
    textAreaOutput.value = output;
  });  
};

newick2wikiclade();

const latin2ottol = () => {
  const input = document.getElementById('input-ottol');
  const output = document.getElementById('output-ottol');
  const button = document.getElementById('button-ottol');

  const URL = 'https://api.opentreeoflife.org/v3/tnrs/match_names';

  const fetchOttol = async (name, options) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        names: [name],
        ...options
      })
    });

    const data = await response.json();

    return data?.results?.[0]?.matches?.[0]?.taxon?.ott_id || '';
  };

  button.addEventListener('click', async () => {
    const inputValue = input.value;
    const outputValue = await fetchOttol(inputValue);
    output.value = outputValue;
  });
};

latin2ottol();

const latin2wikidata = () => {
  const URL = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&language=en&format=json&search=';
  // e.g. https://www.wikidata.org/w/api.php?action=wbsearchentities&language=en&format=json&search=Orbexilum%20pedunculatum 
};

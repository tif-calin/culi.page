
const textAreaInput = document.getElementById('newick-input');
const textAreaOutput = document.getElementById('newick-output');
const button = document.getElementById('button-convert');

// const newickToWiki = (newick) => {
//   newick = newick.replaceAll(' ', '').trim().slice(1, -1);
//   newick = newick.replaceAll(/:\d.\d*/g, '');
//   let output = '{{clade\n';

//   let tab = 1;
//   let branch = { [1]: 0 };
//   let wordStart = 0;

//   console.log(newick);
  
//   for (let i = 0; i < newick.length; i++) {
//     const char = newick[i];
//     if (char === ')') {
//       output += ' '.repeat(tab * 2) + `|${branch[tab]}=${newick.slice(wordStart, i)}\n`;
//       wordStart = 0;
//       tab--;
//       output += ' '.repeat(tab * 2) + '}}\n';
//     } else if (char === '(') {
//       branch[tab]++;
//       output += ' '.repeat(tab * 2) + `|${branch[tab]}={{clade\n`;
//       tab++;
//       branch[tab] = 0;
//     } else if (char === ',') {
//       output += ' '.repeat(tab * 2) + `|${branch[tab]}=${newick.slice(wordStart, i)}\n`;
//       branch[tab]++;
//       wordStart = 0;
//     } else if (!wordStart) {
//       wordStart = i;
//     }
//   }

//   return output + '}}';
// };

const newickToWiki = (newick) => {
  const last = newick.lastIndexOf(')');
  let output = newick.trim().slice(0, last).replaceAll('(', '[').replaceAll(')', ']');
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

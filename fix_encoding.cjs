const fs = require('fs');
let content = fs.readFileSync('js/data/use-cases-data.js', 'utf8');

const replacements = {
  'â€”': '—',
  'ðŸ’¡': '💡',
  'ðŸ“‹': '📋',
  'â†’': '→',
  'âš ï¸ ': '⚠️',
  'âš ': '⚠️',
  'Â·': '·',
  'â‰ ': '≠',
  'â€˜': '‘',
  'â€™': '’',
  'â€œ': '“',
  'â€ ': '”',
  'Ã©': 'é',
  'Ã¨': 'è',
  'Ã ': 'à'
};

let count = 0;
for (const [bad, good] of Object.entries(replacements)) {
  const regex = new RegExp(bad, 'g');
  const matches = content.match(regex);
  if (matches) {
    console.log('Found ' + matches.length + ' instances of ' + bad);
    content = content.replace(regex, good);
    count += matches.length;
  }
}

if (count > 0) {
  fs.writeFileSync('js/data/use-cases-data.js', content, 'utf8');
  console.log('Fixed ' + count + ' encoding issues.');
} else {
  console.log('No encoding issues found.');
}

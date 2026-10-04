const fs = require('fs');
const files = [
  './js/data/m4/part1.js',
  './js/data/m4/part2.js',
  './js/data/m4/part3.js'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/language:\s*'markup'/g, "language: 'javascript'");
  fs.writeFileSync(file, content);
}
console.log('Replaced markup with javascript');

const fs = require('fs');
const glob = require('fs').readdirSync;

function updateFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      updateFiles(dir + '/' + file.name);
    } else if (file.name.endsWith('.js')) {
      const p = dir + '/' + file.name;
      const content = fs.readFileSync(p, 'utf8');
      if (content.includes("language: 'xml'")) {
        fs.writeFileSync(p, content.replace(/language: 'xml'/g, "language: 'javascript'"));
        console.log('Updated ' + p);
      }
    }
  }
}
updateFiles('./js/data');

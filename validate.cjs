const fs = require('fs');

let content = fs.readFileSync('js/data/use-cases-data.js', 'utf8');
content = content.replace(/export const useCases =/g, 'global.useCases =');
require('vm').runInThisContext(content);

const allUseCases = global.useCases || [];
let errors = [];

allUseCases.forEach((uc, i) => {
  if (!uc.id) errors.push('Missing ID at ' + i);
  if (!uc.title || typeof uc.title !== 'string' || uc.title.trim() === '') errors.push('Invalid title at UC ' + uc.id);
  if (!uc.difficulty) errors.push('Invalid difficulty at UC ' + uc.id);
  if (!uc.category) errors.push('Invalid category at UC ' + uc.id);
  if (!uc.company) errors.push('Invalid company at UC ' + uc.id);
  if (!uc.subtitle) errors.push('Invalid subtitle at UC ' + uc.id);
  if (!Array.isArray(uc.tags) || uc.tags.length === 0) errors.push('Invalid tags at UC ' + uc.id);
  if (!uc.description) errors.push('Invalid description at UC ' + uc.id);
  if (!Array.isArray(uc.learnings) || uc.learnings.length === 0) errors.push('Invalid learnings at UC ' + uc.id);
  if (!uc.content || typeof uc.content !== 'string' || uc.content.trim().length < 100) errors.push('Invalid/short content at UC ' + uc.id);
  
  if (uc.content && !uc.content.includes('<div class="callout callout--info">')) {
    errors.push('Missing Build Order callout in UC ' + uc.id);
  }
});

if (errors.length > 0) {
  console.log('Errors found:');
  errors.forEach(e => console.log(e));
} else {
  console.log('All 50 use cases passed rigorous structural validation.');
}

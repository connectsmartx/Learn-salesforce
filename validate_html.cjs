const fs = require('fs');

let content = fs.readFileSync('js/data/use-cases-data.js', 'utf8');
content = content.replace(/export const useCases =/g, 'global.useCases =');
require('vm').runInThisContext(content);

global.useCases.forEach(uc => {
    let html = uc.content;
    const tags = ['table', 'thead', 'tbody', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'div', 'p', 'h2', 'h3'];
    
    tags.forEach(tag => {
        let openCount = (html.match(new RegExp('<' + tag + '\\b[^>]*>', 'gi')) || []).length;
        let closeCount = (html.match(new RegExp('</' + tag + '\\s*>', 'gi')) || []).length;
        
        if (openCount !== closeCount) {
            console.log(`UC ${uc.id}: Unbalanced <${tag}> tags. Open: ${openCount}, Close: ${closeCount}`);
        }
    });
});

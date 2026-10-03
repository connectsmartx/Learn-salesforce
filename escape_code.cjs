const fs = require('fs');

const FILE_PATH = 'js/data/use-cases-data.js';
let content = fs.readFileSync(FILE_PATH, 'utf8');

// We want to escape < and > but ONLY inside <code>...</code> blocks, 
// and only if they are not already escaped and not standard HTML tags we want to keep (like <b>).
// Since the content is meant to be displayed as raw code, ANY < or > inside <pre><code> or <code> should be &lt; and &gt;

let modifiedContent = content.replace(/(<code[^>]*>)([\s\S]*?)(<\/code>)/g, (match, openTag, innerCode, closeTag) => {
    // replace < with &lt; and > with &gt; inside the innerCode
    // but what if innerCode already has some HTML like <br> that we wanted?
    // In our use cases, code blocks are usually raw code (Apex, SOQL, JSON, XML).
    // Let's replace < and > if they are not already &lt; and &gt;
    let escapedCode = innerCode
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    // if there was already an escape like &lt;, it would become &amp;lt; if we escaped &.
    // we didn't escape &, so &lt; remains &lt; and < becomes &lt;. Wait, if it had `<` it becomes `&lt;`. If it had `&lt;` it remains `&lt;`.
    
    return openTag + escapedCode + closeTag;
});

if (content !== modifiedContent) {
    fs.writeFileSync(FILE_PATH, modifiedContent, 'utf8');
    console.log('Escaped HTML tags inside <code> blocks.');
} else {
    console.log('No unescaped tags found in <code> blocks.');
}

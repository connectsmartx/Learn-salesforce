const fs = require('fs');

const FILE_PATH = 'js/data/use-cases-data.js';
let content = fs.readFileSync(FILE_PATH, 'utf8');

// We will do text replacement on the file content itself instead of evaluating and replacing to preserve formatting.
// Find all objects in the array. Since the file is well-formatted, we can use a regex that matches `content: \`...\``

const useCaseBlocks = content.match(/{\s*id:\s*\d+[\s\S]*?content:\s*`[\s\S]*?`\s*}/g);

if (!useCaseBlocks) {
  console.log('Could not parse use cases blocks.');
  process.exit(1);
}

let modifiedCount = 0;

useCaseBlocks.forEach(block => {
  const idMatch = block.match(/id:\s*(\d+)/);
  if (!idMatch) return;
  const id = parseInt(idMatch[1]);
  
  if (!block.includes('<div class="callout callout--info">')) {
    console.log('Fixing UC ' + id);
    
    // Extract steps from <h2> tags
    const h2Matches = block.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
    const steps = [];
    let stepNumber = 1;
    
    h2Matches.forEach(h2 => {
      const text = h2.replace(/<[^>]*>/g, '').trim();
      if (text.toLowerCase().includes('step') || text.toLowerCase().includes('flow') || text.toLowerCase().includes('task') || text.toLowerCase().includes('rule')) {
         let cleanText = text;
         if (cleanText.includes(':')) {
           cleanText = cleanText.split(':')[1].trim();
         } else if (cleanText.includes('-')) {
           cleanText = cleanText.split('-')[1].trim();
         }
         steps.push(`Step ${stepNumber} &rarr; ${cleanText}`);
         stepNumber++;
      }
    });
    
    let buildOrderText = steps.length > 0 ? steps.join(' &middot; ') : 'Review the instructions below to complete the build.';
    
    const calloutHTML = `
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>${buildOrderText}</p>
      </div>
`;
    
    // Insert calloutHTML after the first paragraph following an h2 (usually Background)
    let newBlock = block;
    const bgMatch = block.match(/(<h2[^>]*>.*?<\/h2>\s*<p>.*?<\/p>\s*)/);
    if (bgMatch) {
      newBlock = block.replace(bgMatch[1], bgMatch[1] + calloutHTML);
    } else {
      // If no <p> right after <h2>, just insert after the first <h2> block
      const firstH2 = block.match(/(<h2[^>]*>.*?<\/h2>\s*)/);
      if (firstH2) {
        newBlock = block.replace(firstH2[1], firstH2[1] + calloutHTML);
      }
    }
    
    if (newBlock !== block) {
      content = content.replace(block, newBlock);
      modifiedCount++;
    }
  }
});

fs.writeFileSync(FILE_PATH, content, 'utf8');
console.log(`Modified ${modifiedCount} use cases.`);

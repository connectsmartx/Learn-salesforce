import { renderCheatSheetsPage } from './js/components/cheat-sheet.js';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<div id="mainContent"></div>');
global.document = dom.window.document;
global.navigator = { clipboard: { writeText: () => {} } };

renderCheatSheetsPage();
const html = document.getElementById('mainContent').innerHTML;

const lwcCard = html.substring(html.indexOf('LWC Quick Reference'), html.indexOf('id="sheet-governor-limits"'));
console.log(lwcCard);

/* ============================================================
   CODE PLAYGROUND — Interactive Code Editor (View Only)
   ============================================================ */

import { highlight } from '../utils/syntax-highlighter.js';

export function renderCodePlayground(container, codeString, language = 'apex') {
  if (!container) return;

  const highlighted = highlight(codeString, language);
  const lineCount = codeString.trim().split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  container.innerHTML = `
    <div class="code-playground">
      <div class="code-playground__header">
        <div class="code-playground__dots">
          <span class="code-playground__dot code-playground__dot--red"></span>
          <span class="code-playground__dot code-playground__dot--yellow"></span>
          <span class="code-playground__dot code-playground__dot--green"></span>
        </div>
        <span class="code-playground__lang">${language.toUpperCase()}</span>
        <button class="code-playground__copy" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(codeString)}')).then(()=>{this.textContent='✓ Copied!';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button>
      </div>
      <div class="code-playground__body">
        <div class="code-playground__lines">${lineNumbers}</div>
        <pre class="code-playground__code"><code>${highlighted}</code></pre>
      </div>
    </div>`;
}

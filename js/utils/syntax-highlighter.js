/* ============================================================
   SYNTAX HIGHLIGHTER — Prism.js Wrapper
   ============================================================ */

import Prism from 'prismjs';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-markup.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-sql.min.js';

// Register Apex as a custom grammar (Java-superset)
Prism.languages.apex = Prism.languages.extend('java', {
  keyword: /\b(?:abstract|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|get|global|if|implements|import|insert|instanceof|interface|long|new|null|override|package|private|protected|public|return|set|short|static|super|switch|testMethod|this|throw|throws|transient|trigger|try|update|upsert|delete|undelete|virtual|void|webService|while|with\s+sharing|without\s+sharing|inherited\s+sharing)\b/,
  annotation: {
    pattern: /@\w+/,
    alias: 'builtin',
  },
  'soql-keyword': {
    pattern: /\b(?:SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|ASC|DESC|NULLS\s+FIRST|NULLS\s+LAST|COUNT|SUM|AVG|MIN|MAX|INCLUDES|EXCLUDES|TYPEOF|USING\s+SCOPE|WITH)\b/i,
    alias: 'keyword',
  },
});

// Register LWC HTML as markup extension
Prism.languages.lwc = Prism.languages.extend('markup', {
  'lwc-directive': {
    pattern: /\b(?:lwc:if|lwc:elseif|lwc:else|for:each|for:item|for:index|iterator:\w+|key|lwc:dom|lwc:ref|lwc:spread)\b/,
    alias: 'attr-name',
  },
});

// SOQL as standalone
Prism.languages.soql = {
  keyword: /\b(?:SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|ASC|DESC|NULLS\s+FIRST|NULLS\s+LAST|INCLUDES|EXCLUDES|TYPEOF|USING\s+SCOPE|WITH|ROLLUP|CUBE|FOR\s+UPDATE|FOR\s+REFERENCE|FOR\s+VIEW|ALL\s+ROWS|YESTERDAY|TODAY|TOMORROW|LAST_WEEK|THIS_WEEK|NEXT_WEEK|LAST_MONTH|THIS_MONTH|NEXT_MONTH|LAST_90_DAYS|NEXT_90_DAYS|LAST_N_DAYS|NEXT_N_DAYS|THIS_QUARTER|LAST_QUARTER|NEXT_QUARTER|THIS_YEAR|LAST_YEAR|NEXT_YEAR|THIS_FISCAL_QUARTER|LAST_FISCAL_QUARTER|NEXT_FISCAL_QUARTER|THIS_FISCAL_YEAR|LAST_FISCAL_YEAR|NEXT_FISCAL_YEAR)\b/i,
  function: /\b(?:COUNT|SUM|AVG|MIN|MAX|COUNT_DISTINCT|CALENDAR_MONTH|CALENDAR_YEAR|DAY_IN_MONTH|DAY_IN_WEEK|DAY_IN_YEAR|DAY_ONLY|FISCAL_MONTH|FISCAL_QUARTER|FISCAL_YEAR|HOUR_IN_DAY|WEEK_IN_MONTH|WEEK_IN_YEAR|convertTimezone|toLabel|FORMAT)\b/i,
  string: /'[^']*'/,
  number: /\b\d+\.?\d*\b/,
  operator: /[=<>!]+/,
  punctuation: /[(),.:]/,
};

/**
 * Highlight a code string with a given language.
 * Returns an HTML string with syntax-highlighted tokens.
 */
export function highlight(code, language = 'apex') {
  const lang = language.toLowerCase();
  const grammar = Prism.languages[lang] || Prism.languages.plain || Prism.languages.markup;
  try {
    return Prism.highlight(code.trim(), grammar, lang);
  } catch {
    return escapeHtml(code.trim());
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Highlight all <code> blocks on the page.
 */
export function highlightAll() {
  Prism.highlightAll();
}

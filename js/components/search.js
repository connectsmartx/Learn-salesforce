/* ============================================================
   SEARCH — Full-text Search Across All Lessons
   ============================================================ */

import { modules, getAllLessons } from '../data/modules.js';

export function initSearch() {
  const trigger = document.getElementById('searchTrigger');
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');

  if (!trigger || !modal || !input || !results) return;

  trigger.addEventListener('click', openSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  // Ctrl+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) {
        results.innerHTML = '<p class="search-modal__empty">Type at least 2 characters to search...</p>';
        return;
      }
      performSearch(query, results);
    }, 200);
  });

  function openSearch() {
    modal.classList.add('active');
    input.value = '';
    input.focus();
    results.innerHTML = '<p class="search-modal__empty">Type to search across all lessons...</p>';
    document.body.classList.add('no-scroll');
  }

  function closeSearch() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

function performSearch(query, resultsContainer) {
  const allLessons = getAllLessons();
  const matches = [];

  for (const lesson of allLessons) {
    const titleMatch = lesson.title.toLowerCase().includes(query);
    const subtitleMatch = lesson.subtitle.toLowerCase().includes(query);
    const moduleMatch = lesson.module.title.toLowerCase().includes(query);

    let score = 0;
    if (titleMatch) score += 10;
    if (subtitleMatch) score += 5;
    if (moduleMatch) score += 2;

    if (score > 0) {
      matches.push({ lesson, score });
    }
  }

  // Sort by relevance
  matches.sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p class="search-modal__empty">No results found for "${query}"</p>`;
    return;
  }

  resultsContainer.innerHTML = matches.slice(0, 15).map(({ lesson }) => `
    <a href="#/lesson/${lesson.id}" class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('active');document.body.classList.remove('no-scroll')">
      <span class="search-result-item__icon" style="background:${lesson.module.gradient}; padding: 8px; border-radius: 8px;">${lesson.module.icon}</span>
      <div class="search-result-item__info" style="flex:1">
        <span class="search-result-item__title" style="display:block;font-weight:600;margin-bottom:2px">${highlightMatch(lesson.title, query)}</span>
        <span class="search-result-item__subtitle" style="font-size:var(--font-size-xs);color:var(--text-muted)">${highlightMatch(lesson.subtitle, query)}</span>
      </div>
      <span class="search-result-item__module">${lesson.module.title}</span>
    </a>
  `).join('');
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

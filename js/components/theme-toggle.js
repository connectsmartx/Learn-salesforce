/* ============================================================
   THEME TOGGLE — Dark / Light Theme Switcher
   ============================================================ */

import { store } from '../store.js';

export function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // Apply saved theme
  const savedTheme = store.state.settings.theme || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.setSetting('theme', next);
    toggleBtn.classList.add('theme-btn--spin');
    setTimeout(() => toggleBtn.classList.remove('theme-btn--spin'), 400);
  });
}

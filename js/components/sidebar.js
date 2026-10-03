/* ============================================================
   SIDEBAR — Navigation & Module Tree
   ============================================================ */

import { modules } from '../data/modules.js';
import { store } from '../store.js';

export function initSidebar() {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;

  renderSidebar();
  store.subscribe(() => refreshSidebarState());
  window.addEventListener('hashchange', () => highlightActive());
}

function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;

  nav.innerHTML = modules.map(mod => {
    const completedCount = store.getModuleCompletedCount(mod.id);
    const totalLessons = mod.lessons.length;
    const progressPct = Math.round((completedCount / totalLessons) * 100);

    return `
      <div class="sidebar__module" data-module="${mod.id}">
        <button class="sidebar__module-header" data-toggle-module="${mod.id}">
          <span class="sidebar__module-icon" style="background:${mod.gradient}">${mod.icon}</span>
          <div class="sidebar__module-info">
            <span class="sidebar__module-title">${mod.title}</span>
            <div class="sidebar__module-bar">
              <div class="sidebar__module-bar-fill" style="width:${progressPct}%;background:${mod.color}"></div>
            </div>
            <span class="sidebar__module-progress">${completedCount}/${totalLessons} lessons</span>
          </div>
          <svg class="sidebar__module-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="sidebar__lessons" id="moduleLessons${mod.id}">
          ${mod.lessons.map(lesson => {
            const isCompleted = store.isLessonCompleted(lesson.id);
            return `
              <a href="#/lesson/${lesson.id}" class="sidebar__lesson-link${isCompleted ? ' sidebar__lesson-link--completed' : ''}" data-lesson="${lesson.id}">
                <span class="sidebar__lesson-id">${lesson.id}</span>
                <span class="sidebar__lesson-title">${lesson.title}</span>
                ${isCompleted ? '<svg class="sidebar__lesson-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
              </a>`;
          }).join('')}
          <a href="#/quiz/${mod.id}" class="sidebar__lesson-link sidebar__quiz-link${store.getQuizScore(mod.id) ? ' sidebar__lesson-link--completed' : ''}" data-quiz="${mod.id}">
            <span class="sidebar__lesson-id">📝</span>
            <span class="sidebar__lesson-title">Module Quiz</span>
            ${store.getQuizScore(mod.id) ? '<svg class="sidebar__lesson-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>' : ''}
          </a>
        </div>
      </div>`;
  }).join('');

  // Toggle module expansion
  nav.addEventListener('click', (e) => {
    const header = e.target.closest('[data-toggle-module]');
    if (!header) return;
    e.preventDefault();
    e.stopPropagation();
    const moduleEl = header.closest('.sidebar__module');
    // Close other modules for cleaner navigation
    nav.querySelectorAll('.sidebar__module.open').forEach(el => {
      if (el !== moduleEl) el.classList.remove('open');
    });
    moduleEl.classList.toggle('open');
  });

  highlightActive();
}

function highlightActive() {
  const hash = window.location.hash.slice(1) || '/';
  const lessonMatch = hash.match(/^\/lesson\/([\d.]+)/);
  const quizMatch = hash.match(/^\/quiz\/(\d+)/);

  // Clear all active states
  document.querySelectorAll('.sidebar__lesson-link').forEach(link => {
    link.classList.remove('sidebar__lesson-link--active');
  });

  if (lessonMatch) {
    const activeLink = document.querySelector(`[data-lesson="${lessonMatch[1]}"]`);
    if (activeLink) {
      activeLink.classList.add('sidebar__lesson-link--active');
      const moduleEl = activeLink.closest('.sidebar__module');
      if (moduleEl) moduleEl.classList.add('open');
    }
  } else if (quizMatch) {
    const quizLink = document.querySelector(`[data-quiz="${quizMatch[1]}"]`);
    if (quizLink) {
      quizLink.classList.add('sidebar__lesson-link--active');
      const moduleEl = quizLink.closest('.sidebar__module');
      if (moduleEl) moduleEl.classList.add('open');
    }
  }
}

function refreshSidebarState() {
  const progressCircle = document.getElementById('progressCircle');
  const progressText = document.getElementById('progressText');
  const streakCount = document.getElementById('streakCount');
  const xpCount = document.getElementById('xpCount');

  if (progressCircle && progressText) {
    const pct = store.getOverallProgress();
    const circumference = 2 * Math.PI * 35;
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference - (pct / 100) * circumference}`;
    progressText.textContent = `${pct}%`;
  }

  if (streakCount) streakCount.textContent = store.state.user.streak;
  if (xpCount) xpCount.textContent = store.state.user.xp;

  // Update lesson statuses in sidebar
  modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      const link = document.querySelector(`[data-lesson="${lesson.id}"]`);
      if (link) {
        const isCompleted = store.isLessonCompleted(lesson.id);
        link.classList.toggle('sidebar__lesson-link--completed', isCompleted);
        
        let checkEl = link.querySelector('.sidebar__lesson-check');
        if (isCompleted && !checkEl) {
          link.insertAdjacentHTML('beforeend', '<svg class="sidebar__lesson-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>');
        } else if (!isCompleted && checkEl) {
          checkEl.remove();
        }
      }
    });

    // Update module progress bar
    const completedCount = store.getModuleCompletedCount(mod.id);
    const totalLessons = mod.lessons.length;
    const progressPct = Math.round((completedCount / totalLessons) * 100);
    const moduleEl = document.querySelector(`[data-module="${mod.id}"]`);
    if (moduleEl) {
      const bar = moduleEl.querySelector('.sidebar__module-bar-fill');
      if (bar) bar.style.width = `${progressPct}%`;
      const info = moduleEl.querySelector('.sidebar__module-progress');
      if (info) info.textContent = `${completedCount}/${totalLessons} lessons`;
    }
  });
}

export function updateProgress() {
  refreshSidebarState();
}

export { renderSidebar };

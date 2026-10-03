/* ============================================================
   APP.JS — Entry Point
   ============================================================ */

import { router } from './router.js';
import { store } from './store.js';
import { modules } from './data/modules.js';
import { initSidebar, updateProgress } from './components/sidebar.js';
import { initThemeToggle } from './components/theme-toggle.js';
import { initMobileNav } from './components/mobile-nav.js';
import { initSearch } from './components/search.js';
import { initAuth } from './components/auth-modal.js';
import { renderLesson } from './components/lesson-viewer.js';
import { renderQuizStart } from './components/quiz-engine.js';
import { renderQuizHub } from './components/quiz-dashboard.js';
import { renderProfilePage } from './components/progress-tracker.js';
import { renderCheatSheetsPage } from './components/cheat-sheet.js';
import { renderInterviewPage } from './components/interview-prep.js';
import { renderUseCasesPage } from './components/use-cases.js';

/* ---- Initialize Components ---- */
initThemeToggle();
initSidebar();
initMobileNav();
initSearch();
initAuth();
updateProgress();

/* ---- Routes ---- */
router
  .on('/', () => renderHomePage())
  .on('/modules', () => renderModulesPage())
  .on('/lesson/:lessonId', ({ lessonId }) => renderLesson(lessonId))
  .on('/quiz-hub', () => renderQuizHub())
  .on('/quiz/:moduleId/:difficulty', ({ moduleId, difficulty }) => renderQuizStart(moduleId, difficulty))
  .on('/profile', () => renderProfilePage())
  .on('/cheatsheets', () => renderCheatSheetsPage())
  .on('/interview', () => renderInterviewPage())
  .on('/use-cases', () => renderUseCasesPage())
  .start();

/* ---- Subscribe to store changes ---- */
store.subscribe(() => {
  updateProgress();
});

/* ---- HOME PAGE ---- */
function renderHomePage() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const state = store.state;
  const levelInfo = store.getLevelInfo();
  const completedCount = store.getCompletedCount();
  const totalLessons = store.getTotalLessons();
  const overallPct = store.getOverallProgress();

  // Find next uncompleted lesson
  let nextLesson = null;
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      if (!store.isLessonCompleted(lesson.id)) {
        nextLesson = { ...lesson, module: mod };
        break;
      }
    }
    if (nextLesson) break;
  }

  main.innerHTML = `
    <div class="home-page">
      <!-- Hero -->
      <section class="hero">
        <div class="hero__content">
          <h1 class="hero__title">
            <span class="hero__greeting">Welcome back</span>
            Master Salesforce
            <span class="hero__gradient-text">From Scratch to Pro</span>
          </h1>
          <p class="hero__desc">
            55 comprehensive lessons across 4 modules. Learn theory, practice hands-on, 
            and prepare for interviews — all in one place.
          </p>
          <div class="hero__actions">
            ${nextLesson 
              ? `<a href="#/lesson/${nextLesson.id}" class="btn btn--primary btn--lg hero__cta">
                   Continue Learning: ${nextLesson.title} →
                 </a>`
              : `<a href="#/lesson/1.1" class="btn btn--primary btn--lg hero__cta">
                   Start Learning →
                 </a>`
            }
            <a href="#/cheatsheets" class="btn btn--ghost btn--lg">📋 Cheat Sheets</a>
          </div>
        </div>
        <div class="hero__stats-ring">
          <svg viewBox="0 0 120 120" width="180" height="180">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--glass-border)" stroke-width="6"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="url(#heroGrad)" stroke-width="6" 
              stroke-dasharray="${2 * Math.PI * 52}" 
              stroke-dashoffset="${2 * Math.PI * 52 * (1 - overallPct / 100)}"
              stroke-linecap="round" transform="rotate(-90 60 60)"/>
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#00a1e0"/>
                <stop offset="100%" style="stop-color:#7c3aed"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="hero__stats-ring-text">
            <span class="hero__stats-pct">${overallPct}%</span>
            <span class="hero__stats-label">Complete</span>
          </div>
        </div>
      </section>

      <!-- Quick Stats -->
      <section class="home-stats">
        <div class="home-stat-card">
          <span class="home-stat-card__icon">${levelInfo.icon}</span>
          <span class="home-stat-card__value">${levelInfo.name}</span>
          <span class="home-stat-card__label">Level ${state.user.level}</span>
        </div>
        <div class="home-stat-card">
          <span class="home-stat-card__icon">⭐</span>
          <span class="home-stat-card__value">${state.user.xp}</span>
          <span class="home-stat-card__label">XP Earned</span>
        </div>
        <div class="home-stat-card">
          <span class="home-stat-card__icon">🔥</span>
          <span class="home-stat-card__value">${state.user.streak}</span>
          <span class="home-stat-card__label">Day Streak</span>
        </div>
        <div class="home-stat-card">
          <span class="home-stat-card__icon">📚</span>
          <span class="home-stat-card__value">${completedCount}</span>
          <span class="home-stat-card__label">Lessons Done</span>
        </div>
      </section>

      <!-- Module Cards -->
      <section class="home-modules">
        <h2 class="home-section-title">Learning Modules</h2>
        <div class="module-cards-grid">
          ${modules.map(mod => {
            const modCompleted = store.getModuleCompletedCount(mod.id);
            const modTotal = mod.lessons.length;
            const modPct = Math.round((modCompleted / modTotal) * 100);
            return `
              <a href="#/lesson/${mod.lessons[0].id}" class="module-card">
                <div class="module-card__header" style="background:${mod.gradient}">
                  <span class="module-card__icon">${mod.icon}</span>
                  <span class="module-card__lesson-count">${modTotal} Lessons</span>
                </div>
                <div class="module-card__body">
                  <h3 class="module-card__title">${mod.title}</h3>
                  <p class="module-card__desc">${mod.description}</p>
                  <div class="module-card__progress">
                    <div class="module-card__progress-bar">
                      <div class="module-card__progress-fill" style="width:${modPct}%;background:${mod.color}"></div>
                    </div>
                    <span class="module-card__progress-text">${modCompleted}/${modTotal} complete</span>
                  </div>
                </div>
              </a>`;
          }).join('')}
        </div>
      </section>

      <!-- Quick Links -->
      <section class="home-quick-links">
        <h2 class="home-section-title">Quick Access</h2>
        <div class="quick-links-grid">
          <a href="#/quiz-hub" class="quick-link-card">
            <span class="quick-link-card__icon">📝</span>
            <span class="quick-link-card__title">Quizzes</span>
            <span class="quick-link-card__desc">Test your knowledge</span>
          </a>
          <a href="#/interview" class="quick-link-card">
            <span class="quick-link-card__icon">🎯</span>
            <span class="quick-link-card__title">Interview Prep</span>
            <span class="quick-link-card__desc">275+ scenario questions</span>
          </a>
          <a href="#/cheatsheets" class="quick-link-card">
            <span class="quick-link-card__icon">📋</span>
            <span class="quick-link-card__title">Cheat Sheets</span>
            <span class="quick-link-card__desc">Quick reference cards</span>
          </a>
          <a href="#/use-cases" class="quick-link-card">
            <span class="quick-link-card__icon">💡</span>
            <span class="quick-link-card__title">Use Cases</span>
            <span class="quick-link-card__desc">50 real-world examples</span>
          </a>
        </div>
      </section>
    </div>`;

  main.scrollTo({ top: 0 });
}

/* ---- MODULES PAGE ---- */
function renderModulesPage() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  main.innerHTML = `
    <div class="modules-page">
      <h1 class="modules-page__title">📚 All Modules</h1>
      <p class="modules-page__subtitle">Choose a module to begin learning. Complete lessons in order or jump to any topic.</p>
      <div class="modules-list">
        ${modules.map(mod => {
          const modCompleted = store.getModuleCompletedCount(mod.id);
          const modTotal = mod.lessons.length;
          return `
            <div class="module-detail-card">
              <div class="module-detail-card__header" style="background:${mod.gradient}">
                <span class="module-detail-card__icon">${mod.icon}</span>
                <div>
                  <h2 class="module-detail-card__title">${mod.title}</h2>
                  <p class="module-detail-card__desc">${mod.description}</p>
                </div>
                <span class="module-detail-card__count">${modCompleted}/${modTotal}</span>
              </div>
              <div class="module-detail-card__lessons">
                ${mod.lessons.map(lesson => {
                  const isCompleted = store.isLessonCompleted(lesson.id);
                  return `
                    <a href="#/lesson/${lesson.id}" class="module-lesson-row${isCompleted ? ' module-lesson-row--completed' : ''}">
                      <span class="module-lesson-row__status">${isCompleted ? '✅' : '○'}</span>
                      <div class="module-lesson-row__info">
                        <span class="module-lesson-row__title">${lesson.id}. ${lesson.title}</span>
                        <span class="module-lesson-row__subtitle">${lesson.subtitle}</span>
                      </div>
                      <span class="module-lesson-row__meta">
                        <span class="module-lesson-row__duration">${lesson.duration}</span>
                        <span class="module-lesson-row__diff module-lesson-row__diff--${lesson.difficulty}">${lesson.difficulty}</span>
                      </span>
                    </a>`;
                }).join('')}
                <a href="#/quiz/${mod.id}" class="module-lesson-row module-lesson-row--quiz">
                  <span class="module-lesson-row__status">📝</span>
                  <div class="module-lesson-row__info">
                    <span class="module-lesson-row__title">Module Quiz</span>
                    <span class="module-lesson-row__subtitle">20 questions • Test your knowledge</span>
                  </div>
                </a>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   PROGRESS TRACKER — XP, Streaks & Achievements
   ============================================================ */

import { store } from '../store.js';
import { modules } from '../data/modules.js';
import { launchAchievementConfetti } from '../utils/confetti.js';

export function showAchievement(achievement) {
  const toast = document.getElementById('achievementToast');
  const icon = document.getElementById('achievementIcon');
  const title = document.getElementById('achievementTitle');
  const desc = document.getElementById('achievementDesc');

  if (!toast || !icon || !title || !desc) return;

  icon.textContent = achievement.icon;
  title.textContent = 'Achievement Unlocked!';
  desc.textContent = `${achievement.name} — ${achievement.desc}`;

  toast.classList.add('achievement-toast--visible');
  launchAchievementConfetti();

  setTimeout(() => {
    toast.classList.remove('achievement-toast--visible');
  }, 4000);
}

export function renderProfilePage() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const state = store.state;
  const levelInfo = store.getLevelInfo();
  const nextLevel = store.getNextLevelInfo();
  const allAchievements = store.getAllAchievements();
  const totalLessons = store.getTotalLessons();
  const completedLessons = store.getCompletedCount();
  const overallProgress = store.getOverallProgress();

  const xpToNext = nextLevel.minXP - state.user.xp;
  const xpProgress = nextLevel.minXP > levelInfo.minXP 
    ? Math.round(((state.user.xp - levelInfo.minXP) / (nextLevel.minXP - levelInfo.minXP)) * 100) 
    : 100;

  main.innerHTML = `
    <div class="profile-page">
      <h1 class="profile-page__title">Your Learning Profile</h1>
      
      <!-- Stats Grid -->
      <div class="profile-stats">
        <div class="stat-card stat-card--primary">
          <div class="stat-card__icon">${levelInfo.icon}</div>
          <div class="stat-card__value">${levelInfo.name}</div>
          <div class="stat-card__label">Level ${state.user.level}</div>
          <div class="stat-card__bar">
            <div class="stat-card__bar-fill" style="width:${xpProgress}%;background:var(--gradient-primary)"></div>
          </div>
          <div class="stat-card__sublabel">${xpToNext > 0 ? `${xpToNext} XP to ${nextLevel.name}` : 'Max Level!'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon">⭐</div>
          <div class="stat-card__value">${state.user.xp}</div>
          <div class="stat-card__label">Total XP</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon">🔥</div>
          <div class="stat-card__value">${state.user.streak}</div>
          <div class="stat-card__label">Day Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon">📚</div>
          <div class="stat-card__value">${completedLessons}/${totalLessons}</div>
          <div class="stat-card__label">Lessons Complete</div>
        </div>
      </div>

      <!-- Module Progress -->
      <section class="profile-section">
        <h2 class="profile-section__title">Module Progress</h2>
        <div class="module-progress-grid">
          ${modules.map(mod => {
            const modCompleted = store.getModuleCompletedCount(mod.id);
            const modTotal = mod.lessons.length;
            const modPct = Math.round((modCompleted / modTotal) * 100);
            const quizScore = store.getQuizScore(mod.id);
            return `
              <div class="module-progress-card">
                <div class="module-progress-card__header" style="background:${mod.gradient}">
                  <span class="module-progress-card__icon">${mod.icon}</span>
                  <span class="module-progress-card__title">${mod.title}</span>
                </div>
                <div class="module-progress-card__body">
                  <div class="module-progress-card__stat">
                    <span>Lessons</span>
                    <strong>${modCompleted}/${modTotal}</strong>
                  </div>
                  <div class="module-progress-card__bar">
                    <div class="module-progress-card__bar-fill" style="width:${modPct}%;background:${mod.color}"></div>
                  </div>
                  <div class="module-progress-card__stat">
                    <span>Quiz</span>
                    <strong>${quizScore ? `${quizScore.bestScore}%` : 'Not taken'}</strong>
                  </div>
                </div>
              </div>`;
          }).join('')}
        </div>
      </section>

      <!-- Achievements -->
      <section class="profile-section">
        <h2 class="profile-section__title">Achievements (${state.user.achievements.length}/${allAchievements.length})</h2>
        <div class="achievements-grid">
          ${allAchievements.map(ach => {
            const unlocked = store.isAchievementUnlocked(ach.id);
            return `
              <div class="achievement-card${unlocked ? ' achievement-card--unlocked' : ''}">
                <span class="achievement-card__icon">${unlocked ? ach.icon : '🔒'}</span>
                <span class="achievement-card__name">${ach.name}</span>
                <span class="achievement-card__desc">${ach.desc}</span>
              </div>`;
          }).join('')}
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="profile-section">
        <h2 class="profile-section__title">Settings</h2>
        <button class="btn btn--danger" id="resetProgressBtn">🗑️ Reset All Progress</button>
      </section>
    </div>`;

  const resetBtn = document.getElementById('resetProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
        store.reset();
        window.location.hash = '#/';
        window.location.reload();
      }
    });
  }

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

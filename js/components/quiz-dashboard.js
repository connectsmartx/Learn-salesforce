/* ============================================================
   QUIZ DASHBOARD — Quiz Hub (All Module Quizzes Overview)
   ============================================================ */

import { modules } from '../data/modules.js';
import { store } from '../store.js';

export function renderQuizHub() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  main.innerHTML = `
    <div class="quiz-hub">
      <header class="quiz-hub__header" style="text-align:center; margin-bottom:3rem;">
        <h1 class="quiz-hub__title" style="font-size:2.5rem; margin-bottom:1rem;">📝 Quiz Center</h1>
        <p class="quiz-hub__subtitle" style="color:var(--text-muted); max-width:600px; margin:0 auto;">Test your knowledge with 3 difficulties per topic: Easy (10 Q), Medium (15 Q), and Hard (20 Q). Earn XP and track your best scores.</p>
      </header>

      <div class="quiz-hub__grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(350px, 1fr)); gap:2rem;">
        ${modules.map(mod => {
          const easyScore = store.getQuizScore(mod.id + '_easy');
          const medScore = store.getQuizScore(mod.id + '_medium');
          const hardScore = store.getQuizScore(mod.id + '_hard');
          const completedLessons = store.getModuleCompletedCount(mod.id);
          const totalLessons = mod.lessons.length;
          const lessonPct = Math.round((completedLessons / totalLessons) * 100);

          return `
            <div class="quiz-hub-card" style="background:var(--bg-surface); border:1px solid var(--glass-border); border-radius:12px; overflow:hidden; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
              <div class="quiz-hub-card__header" style="background:${mod.gradient}; padding:1.5rem; color:#fff; display:flex; align-items:center; gap:1rem;">
                <span class="quiz-hub-card__icon" style="font-size:2rem; background:rgba(255,255,255,0.2); padding:0.5rem; border-radius:8px;">${mod.icon}</span>
                <h2 class="quiz-hub-card__title" style="font-size:1.25rem; margin:0;">${mod.title}</h2>
              </div>
              <div class="quiz-hub-card__body" style="padding:1.5rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border-default);">
                  <span style="color:var(--text-muted);">Lessons Done</span>
                  <strong>${completedLessons}/${totalLessons} (${lessonPct}%)</strong>
                </div>
                
                <h3 style="font-size:1rem; margin-bottom:1rem; color:var(--text-secondary);">Select Difficulty</h3>
                
                <div style="display:flex; flex-direction:column; gap:0.75rem;">
                  <!-- Easy -->
                  <a href="#/quiz/${mod.id}/easy" style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-radius:8px; background:var(--bg-base); border:1px solid var(--border-default); text-decoration:none; color:var(--text-primary); transition:border-color 0.2s;">
                    <span style="font-weight:600; color:#10B981;">Easy (10 Q)</span>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${easyScore ? easyScore.bestScore + '% Best' : 'Not started'}</span>
                  </a>
                  
                  <!-- Medium -->
                  <a href="#/quiz/${mod.id}/medium" style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-radius:8px; background:var(--bg-base); border:1px solid var(--border-default); text-decoration:none; color:var(--text-primary); transition:border-color 0.2s;">
                    <span style="font-weight:600; color:#F59E0B;">Medium (15 Q)</span>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${medScore ? medScore.bestScore + '% Best' : 'Not started'}</span>
                  </a>

                  <!-- Hard -->
                  <a href="#/quiz/${mod.id}/hard" style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-radius:8px; background:var(--bg-base); border:1px solid var(--border-default); text-decoration:none; color:var(--text-primary); transition:border-color 0.2s;">
                    <span style="font-weight:600; color:#EF4444;">Hard (20 Q)</span>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${hardScore ? hardScore.bestScore + '% Best' : 'Not started'}</span>
                  </a>
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

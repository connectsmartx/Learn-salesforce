/* ============================================================
   QUIZ ENGINE — Quiz Runner & Scoring
   ============================================================ */

import { store } from '../store.js';
import { getModule } from '../data/modules.js';
import { launchConfetti } from '../utils/confetti.js';
import { showAchievement } from './progress-tracker.js';

let quizData = null;
async function loadQuizData() {
  if (!quizData) {
    try {
      const mod = await import('../data/quizzes.js');
      quizData = mod.quizzes;
    } catch {
      quizData = {};
    }
  }
  return quizData;
}

let currentQuiz = null;
let currentQuestion = 0;
let answers = [];
let startTime = null;

export async function renderQuizStart(moduleId, difficulty) {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const module = getModule(moduleId);
  if (!module || !difficulty) {
    main.innerHTML = '<div class="lesson-error"><h2>Quiz Not Found</h2><a href="#/quiz-hub">Go Back</a></div>';
    return;
  }

  const quizzes = await loadQuizData();
  const quiz = quizzes[moduleId] ? quizzes[moduleId][difficulty] : null;
  const storeKey = moduleId + '_' + difficulty;
  const previousScore = store.getQuizScore(storeKey);
  const diffTitle = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  if (!quiz || quiz.length === 0) {
    main.innerHTML = `
      <div class="quiz-start">
        <div class="quiz-start__icon" style="background:${module.gradient}">${module.icon}</div>
        <h1 class="quiz-start__title">${module.title} (${diffTitle})</h1>
        <div class="lesson__placeholder">
          <div class="lesson__placeholder-icon">🚧</div>
          <h3>Quiz Coming Soon</h3>
          <p>The quiz questions for this module are being prepared. Check back soon!</p>
        </div>
        <a href="#/quiz-hub" class="btn btn--ghost">← Back to Home</a>
      </div>`;
    return;
  }

  main.innerHTML = `
    <div class="quiz-start">
      <div class="quiz-start__icon" style="background:${module.gradient}">${module.icon}</div>
      <h1 class="quiz-start__title">${module.title} (${diffTitle})</h1>
      <p class="quiz-start__desc">${module.description}</p>
      
      <div class="quiz-start__stats">
        <div class="quiz-start__stat">
          <span class="quiz-start__stat-value">${quiz.length}</span>
          <span class="quiz-start__stat-label">Questions</span>
        </div>
        <div class="quiz-start__stat">
          <span class="quiz-start__stat-value">~${Math.ceil(quiz.length * 0.75)}</span>
          <span class="quiz-start__stat-label">Minutes</span>
        </div>
        <div class="quiz-start__stat">
          <span class="quiz-start__stat-value">${previousScore ? previousScore.bestScore + '%' : '—'}</span>
          <span class="quiz-start__stat-label">Best Score</span>
        </div>
      </div>

      <div class="quiz-start__actions">
        <button class="btn btn--primary btn--lg" id="startQuizBtn">🚀 Begin Quiz</button>
        ${previousScore ? `<button class="btn btn--accent btn--lg" id="retryWrongBtn">🔄 Retry Wrong Only</button>` : ''}
      </div>

      <a href="#/" class="btn btn--ghost" style="margin-top:var(--space-4)">← Back to Home</a>
    </div>`;

  document.getElementById('startQuizBtn').addEventListener('click', () => {
    startQuiz(moduleId, difficulty, quiz);
  });

  const retryWrongBtn = document.getElementById('retryWrongBtn');
  if (retryWrongBtn && previousScore) {
    retryWrongBtn.addEventListener('click', () => {
      const wrongQuestions = quiz.filter((q, i) => {
        const prevAnswer = previousScore.lastAnswers?.[i];
        return prevAnswer !== q.correct;
      });
      if (wrongQuestions.length > 0) {
        startQuiz(moduleId, difficulty, wrongQuestions);
      } else {
        alert('You got all questions correct! Try the full quiz instead.');
      }
    });
  }

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz(moduleId, difficulty, questions) {
  currentQuiz = { moduleId, difficulty, storeKey: moduleId + "_" + difficulty, questions: shuffleArray([...questions]) };
  currentQuestion = 0;
  answers = new Array(currentQuiz.questions.length).fill(null);
  startTime = Date.now();
  renderQuestion();
}

function renderQuestion() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const q = currentQuiz.questions[currentQuestion];
  const total = currentQuiz.questions.length;
  const module = getModule(currentQuiz.moduleId);
  const progressPct = ((currentQuestion + 1) / total) * 100;

  main.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-question__header">
        <div class="quiz-question__progress">
          <div class="quiz-question__progress-bar">
            <div class="quiz-question__progress-fill" style="width:${progressPct}%;background:${module.color}"></div>
          </div>
          <span class="quiz-question__progress-text">${currentQuestion + 1} / ${total}</span>
        </div>
        <span class="quiz-question__timer" id="quizTimer">⏱️ 0:00</span>
      </div>

      <div class="quiz-question__body">
        <span class="quiz-question__type quiz-question__type--${q.type || 'mcq'}">${getTypeLabel(q.type)}</span>
        <h2 class="quiz-question__text">${q.question}</h2>

        ${q.code ? `
          <div class="code-block code-block--quiz">
            <pre><code>${escapeHtml(q.code)}</code></pre>
          </div>
        ` : ''}

        <div class="quiz-options" id="quizOptions">
          ${q.options.map((opt, i) => `
            <button class="quiz-option${answers[currentQuestion] === i ? ' quiz-option--selected' : ''}" data-idx="${i}">
              <span class="quiz-option__letter">${String.fromCharCode(65 + i)}</span>
              <span class="quiz-option__text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="quiz-question__footer">
        <button class="btn btn--ghost" id="prevQBtn" ${currentQuestion === 0 ? 'disabled' : ''}>← Previous</button>
        <div class="quiz-question__palette" id="questionPalette">
          ${currentQuiz.questions.map((_, i) => `
            <button class="quiz-palette-dot${i === currentQuestion ? ' quiz-palette-dot--current' : ''}${answers[i] !== null ? ' quiz-palette-dot--answered' : ''}" data-qi="${i}">${i + 1}</button>
          `).join('')}
        </div>
        ${currentQuestion === total - 1 
          ? `<button class="btn btn--primary" id="submitQuizBtn">Submit Quiz</button>`
          : `<button class="btn btn--accent" id="nextQBtn">Next →</button>`
        }
      </div>
    </div>`;

  // Wire up option selection
  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    answers[currentQuestion] = idx;
    optionsContainer.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('quiz-option--selected'));
    btn.classList.add('quiz-option--selected');
  });

  // Navigation
  document.getElementById('prevQBtn')?.addEventListener('click', () => {
    if (currentQuestion > 0) { currentQuestion--; renderQuestion(); }
  });
  document.getElementById('nextQBtn')?.addEventListener('click', () => {
    if (currentQuestion < total - 1) { currentQuestion++; renderQuestion(); }
  });
  document.getElementById('submitQuizBtn')?.addEventListener('click', () => {
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0 && !confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
    finishQuiz();
  });

  // Question palette navigation
  document.getElementById('questionPalette')?.addEventListener('click', (e) => {
    const dot = e.target.closest('.quiz-palette-dot');
    if (!dot) return;
    currentQuestion = parseInt(dot.dataset.qi);
    renderQuestion();
  });

  // Timer
  updateTimer();

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateTimer() {
  const timerEl = document.getElementById('quizTimer');
  if (!timerEl || !startTime) return;
  
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  timerEl.textContent = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;
  
  if (currentQuiz) {
    requestAnimationFrame(() => setTimeout(updateTimer, 1000));
  }
}

function finishQuiz() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  let correct = 0;
  const results = currentQuiz.questions.map((q, i) => {
    const isCorrect = answers[i] === q.correct;
    if (isCorrect) correct++;
    return { question: q, answer: answers[i], isCorrect };
  });

  const total = currentQuiz.questions.length;
  const pct = Math.round((correct / total) * 100);

  // Save score
  const achievements = store.saveQuizScore(currentQuiz.storeKey, correct, total, elapsed, answers);

  if (pct >= 80) launchConfetti();
  if (achievements.length > 0) {
    achievements.forEach((ach, i) => setTimeout(() => showAchievement(ach), i * 1500));
  }

  renderQuizDashboard(currentQuiz.moduleId, results, correct, total, elapsed, pct);
  currentQuiz = null;
}

function renderQuizDashboard(moduleId, results, correct, total, elapsed, pct) {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const module = getModule(moduleId);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const previousBest = store.getQuizScore(moduleId)?.bestScore || pct;
  const wrong = total - correct;
  const skipped = results.filter(r => r.answer === null).length;

  const gradeEmoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '📖';
  const gradeText = pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Great Job!' : pct >= 50 ? 'Good Effort!' : 'Keep Learning!';

  main.innerHTML = `
    <div class="quiz-dashboard">
      <header class="quiz-dashboard__header">
        <span class="quiz-dashboard__emoji">${gradeEmoji}</span>
        <h1 class="quiz-dashboard__title">${gradeText}</h1>
        <p class="quiz-dashboard__subtitle">${module.icon} ${module.title} Quiz</p>
      </header>

      <div class="quiz-dashboard__score-ring">
        <svg viewBox="0 0 120 120" width="160" height="160">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--glass-border)" stroke-width="8"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="${module.color}" stroke-width="8" 
            stroke-dasharray="${2 * Math.PI * 52}" 
            stroke-dashoffset="${2 * Math.PI * 52 * (1 - pct / 100)}"
            stroke-linecap="round" transform="rotate(-90 60 60)"/>
        </svg>
        <div class="quiz-dashboard__score-text">
          <span class="quiz-dashboard__score-pct">${pct}%</span>
          <span class="quiz-dashboard__score-fraction">${correct}/${total}</span>
        </div>
      </div>

      <div class="quiz-dashboard__stats">
        <div class="quiz-dashboard__stat quiz-dashboard__stat--correct">
          <span>✅ Correct</span>
          <strong>${correct}</strong>
        </div>
        <div class="quiz-dashboard__stat quiz-dashboard__stat--wrong">
          <span>❌ Wrong</span>
          <strong>${wrong - skipped}</strong>
        </div>
        <div class="quiz-dashboard__stat quiz-dashboard__stat--skipped">
          <span>⏭️ Skipped</span>
          <strong>${skipped}</strong>
        </div>
        <div class="quiz-dashboard__stat">
          <span>⏱️ Time</span>
          <strong>${mins}:${secs.toString().padStart(2, '0')}</strong>
        </div>
        <div class="quiz-dashboard__stat">
          <span>🏆 Best</span>
          <strong>${previousBest}%</strong>
        </div>
      </div>

      <section class="quiz-dashboard__breakdown">
        <h2 class="quiz-dashboard__breakdown-title">Question Breakdown</h2>
        ${results.map((r, i) => `
          <details class="quiz-breakdown-item${r.isCorrect ? ' quiz-breakdown-item--correct' : r.answer === null ? ' quiz-breakdown-item--skipped' : ' quiz-breakdown-item--wrong'}">
            <summary class="quiz-breakdown-item__header">
              <span class="quiz-breakdown-item__status">${r.isCorrect ? '✅' : r.answer === null ? '⏭️' : '❌'}</span>
              <span class="quiz-breakdown-item__text">Q${i + 1}: ${truncate(r.question.question, 60)}</span>
            </summary>
            <div class="quiz-breakdown-item__detail">
              <p><strong>Question:</strong> ${r.question.question}</p>
              ${r.answer !== null ? `<p><strong>Your Answer:</strong> ${r.question.options[r.answer]}</p>` : '<p><strong>Your Answer:</strong> <em>Skipped</em></p>'}
              <p><strong>Correct Answer:</strong> ${r.question.options[r.question.correct]}</p>
              ${r.question.explanation ? `<p class="quiz-breakdown-item__explanation"><strong>📖 Explanation:</strong> ${r.question.explanation}</p>` : ''}
            </div>
          </details>
        `).join('')}
      </section>

      <div class="quiz-dashboard__actions">
        <a href="#/quiz/${moduleId}" class="btn btn--ghost btn--lg">🔄 Retry Quiz</a>
        ${(() => {
          const modIdNum = parseInt(moduleId);
          const nextMod = getModule((modIdNum + 1).toString());
          if (nextMod && nextMod.lessons.length > 0) {
            return `<a href="#/lesson/${nextMod.lessons[0].id}" class="btn btn--primary btn--lg">Next Module: ${nextMod.title} →</a>`;
          }
          return `<a href="#/" class="btn btn--primary btn--lg">🏠 Back to Home</a>`;
        })()}
      </div>
    </div>`;

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Helpers ---- */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTypeLabel(type) {
  const labels = {
    mcq: 'Multiple Choice',
    'true-false': 'True / False',
    'code-output': 'Code Output',
    scenario: 'Scenario Based',
  };
  return labels[type] || 'Multiple Choice';
}

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '...' : str;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ============================================================
   LESSON VIEWER — Renders Lesson Content
   ============================================================ */

import { getLesson, getNextLesson, getPrevLesson } from '../data/modules.js';
import { store } from '../store.js';
import { highlight } from '../utils/syntax-highlighter.js';
import { launchConfetti } from '../utils/confetti.js';
import { showAchievement } from './progress-tracker.js';

// Content loaders — lazy load module content on demand
const contentLoaders = {
  '1': () => import('../data/module1-content.js').then(m => m.module1Content),
  '2': () => import('../data/module2-content.js').then(m => m.module2Content),
  '3': () => import('../data/module3-content.js').then(m => m.module3Content),
  '4': () => import('../data/module4-content.js').then(m => m.module4Content),
};

const contentCache = {};

async function loadContent(lessonId) {
  const moduleId = lessonId.split('.')[0];
  if (!contentCache[moduleId]) {
    try {
      contentCache[moduleId] = await contentLoaders[moduleId]();
    } catch (e) {
      console.warn(`Content for module ${moduleId} not yet available`, e);
      return null;
    }
  }
  return contentCache[moduleId][lessonId] || null;
}

export async function renderLesson(lessonId) {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const lesson = getLesson(lessonId);
  if (!lesson) {
    main.innerHTML = '<div class="lesson-error"><h2>Lesson Not Found</h2><p>This lesson doesn\'t exist. <a href="#/">Go Home</a></p></div>';
    return;
  }

  // Show loading state
  main.innerHTML = `
    <div class="lesson-loading">
      <div class="lesson-loading__spinner"></div>
      <p>Loading lesson...</p>
    </div>`;

  const content = await loadContent(lessonId);
  const isCompleted = store.isLessonCompleted(lessonId);
  const nextLesson = getNextLesson(lessonId);
  const prevLesson = getPrevLesson(lessonId);

  main.innerHTML = `
    <article class="lesson" id="lessonContent">
      <!-- Lesson Header -->
      <header class="lesson__header">
        <div class="lesson__breadcrumb">
          <a href="#/">Home</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <a href="#/modules">Module ${lesson.module.id}</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span>${lesson.title}</span>
        </div>
        <div class="lesson__title-row">
          <div>
            <h1 class="lesson__title">${lesson.title}</h1>
            <p class="lesson__subtitle">${lesson.subtitle}</p>
          </div>
        </div>
        <div class="lesson__meta">
          <span class="lesson__meta-item" style="background:${lesson.module.gradient};color:#fff">
            ${lesson.module.icon} ${lesson.module.title}
          </span>
          <span class="lesson__meta-item">⏱️ ${lesson.duration}</span>
          <span class="lesson__meta-item lesson__meta-item--${lesson.difficulty}">
            ${lesson.difficulty === 'beginner' ? '🟢' : lesson.difficulty === 'intermediate' ? '🟡' : '🔴'} ${lesson.difficulty}
          </span>
          ${isCompleted ? '<span class="lesson__meta-item lesson__meta-item--completed">✅ Completed</span>' : ''}
        </div>
      </header>

      ${content ? renderContentSections(content, lessonId) : renderPlaceholderContent(lesson)}

      <!-- Mark Complete / Navigation -->
      <footer class="lesson__footer">
        ${!isCompleted ? `
          <button class="btn btn--primary btn--lg" id="markCompleteBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Mark as Complete (+10 XP)
          </button>
        ` : `
          <div class="lesson__completed-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Lesson Completed! +10 XP earned
          </div>
        `}
        <div class="lesson__nav-buttons">
          ${prevLesson ? `<a href="#/lesson/${prevLesson.id}" class="btn btn--ghost">← ${prevLesson.title}</a>` : '<span></span>'}
          ${nextLesson ? `<a href="#/lesson/${nextLesson.id}" class="btn btn--accent">Next: ${nextLesson.title} →</a>` : `<a href="#/quiz/${lesson.module.id}" class="btn btn--accent">Take Module Quiz →</a>`}
        </div>
      </footer>
    </article>`;

  // Apply syntax highlighting
  setTimeout(() => {
    if (window.Prism) {
      window.Prism.highlightAllUnder(main);
    }
    
    // Add Copy Code buttons to pre blocks
    main.querySelectorAll('pre').forEach(pre => {
      pre.style.position = 'relative';
      const btn = document.createElement('button');
      btn.className = 'btn btn--ghost copy-code-btn';
      btn.textContent = 'Copy';
      btn.style.position = 'absolute';
      btn.style.top = '8px';
      btn.style.right = '8px';
      btn.style.padding = '4px 8px';
      btn.style.fontSize = '12px';
      
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.innerText).then(() => {
            btn.textContent = 'Copied!';
            btn.style.color = 'var(--color-success)';
            setTimeout(() => {
              btn.textContent = 'Copy';
              btn.style.color = '';
            }, 2000);
          });
        }
      });
      pre.appendChild(btn);
    });
  }, 0);

  // Wire up events
  const markBtn = document.getElementById('markCompleteBtn');
  if (markBtn) {
    markBtn.addEventListener('click', () => {
      const achievements = store.completeLesson(lessonId);
      launchConfetti();
      markBtn.outerHTML = `
        <div class="lesson__completed-badge animate-fadeIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
          Lesson Completed! +10 XP earned
        </div>`;
      if (achievements.length > 0) {
        achievements.forEach((ach, i) => setTimeout(() => showAchievement(ach), i * 1500));
      }
    });
  }

  // Update bottom bar
  updateBottomBar(lessonId);

  // Scroll to top
  main.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderContentSections(content, lessonId) {
  let html = '';

  // Theory Section
  if (content.theory) {
    html += `
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">📚</span> Theory
        </h2>
        <div class="lesson__theory">${content.theory}</div>
      </section>`;
  }

  // Examples Section
  if (content.examples && content.examples.length > 0) {
    html += `
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">💡</span> Examples
        </h2>
        ${content.examples.map((ex, i) => `
          <div class="example-card">
            <h3 class="example-card__title">${escapeHTML(ex.title)}</h3>
            <p class="example-card__desc">${escapeHTML(ex.description)}</p>
            <div class="code-block">
              <div class="code-block__header">
                <span class="code-block__lang">${ex.language || 'apex'}</span>
                <button class="code-block__copy" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button>
              </div>
              <pre><code class="language-${ex.language || 'apex'}">${highlight(ex.code, ex.language || 'apex')}</code></pre>
            </div>
            ${ex.explanation ? `<div class="example-card__explanation"><strong>📖 Explanation:</strong> ${escapeHTML(ex.explanation)}</div>` : ''}
          </div>
        `).join('')}
      </section>`;
  }

  // Practice Section
  if (content.practice) {
    html += `
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">🛠️</span> Practice
        </h2>
        <div class="practice-card">
          <p class="practice-card__intro">${escapeHTML(content.practice.intro)}</p>
          <ol class="practice-card__steps">
            ${content.practice.steps.map(step => `<li style="white-space: pre-wrap; font-family: inherit; margin-bottom: 0.5rem; line-height: 1.5;">${escapeHTML(step)}</li>`).join('')}
          </ol>
          <div class="practice-card__outcome">
            <strong>✅ Expected Outcome:</strong> ${escapeHTML(content.practice.expectedOutcome)}
          </div>
        </div>
      </section>`;
  }

  // Interview Questions Section
  if (content.interviewQuestions && content.interviewQuestions.length > 0) {
    html += `
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">🎯</span> Interview Prep
        </h2>
        <div class="interview-questions">
          ${content.interviewQuestions.map((q, i) => `
            <details class="interview-card">
              <summary class="interview-card__header">
                <span class="interview-card__number">Q${i + 1}</span>
                <p class="interview-card__scenario">📋 <strong>Scenario:</strong> ${escapeHTML(q.scenario)}</p>
              </summary>
              <div class="interview-card__answer">
                <div class="interview-card__content">${escapeHTML(q.answer)}</div>
              </div>
            </details>
          `).join('')}
        </div>
      </section>`;
  }

  return html;
}

function renderPlaceholderContent(lesson) {
  return `
    <section class="lesson__section">
      <div class="lesson__placeholder">
        <div class="lesson__placeholder-icon">🚧</div>
        <h3>Content Coming Soon</h3>
        <p>The detailed content for <strong>${lesson.title}</strong> is being prepared. Check back soon!</p>
        <p>In the meantime, you can explore other available lessons or try the module quiz.</p>
      </div>
    </section>`;
}

function updateBottomBar(lessonId) {
  const prevBtn = document.getElementById('prevLesson');
  const nextBtn = document.getElementById('nextLesson');
  const progressFill = document.getElementById('lessonProgressFill');
  const prevLesson = getPrevLesson(lessonId);
  const nextLesson = getNextLesson(lessonId);

  if (prevBtn) {
    prevBtn.disabled = !prevLesson;
    prevBtn.onclick = prevLesson ? () => { window.location.hash = `#/lesson/${prevLesson.id}`; } : null;
  }
  if (nextBtn) {
    nextBtn.disabled = !nextLesson;
    nextBtn.onclick = nextLesson ? () => { window.location.hash = `#/lesson/${nextLesson.id}`; } : null;
  }
  if (progressFill) {
    const pct = store.getOverallProgress();
    progressFill.style.width = `${pct}%`;
  }
}

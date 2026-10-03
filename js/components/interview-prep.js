/* ============================================================
   INTERVIEW PREP — Interview Questions Hub Page
   ============================================================ */

import { modules } from '../data/modules.js';

let interviewData = null;
async function loadInterviewData() {
  if (!interviewData) {
    try {
      const mod = await import('../data/interview-questions.js');
      interviewData = mod.interviewQuestions;
    } catch {
      interviewData = {};
    }
  }
  return interviewData;
}

export async function renderInterviewPage() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  const data = await loadInterviewData();

  main.innerHTML = `
    <div class="interview-page">
      <header class="interview-page__header" style="text-align:center; margin-bottom: 2rem;">
        <h1 class="interview-page__title" style="font-size:2.5rem; margin-bottom:1rem;">🎯 Interview Prep Center</h1>
        <p class="interview-page__subtitle" style="color:var(--text-muted); max-width:600px; margin:0 auto;">Section-wise scenario questions and answers. All references sourced directly from official Salesforce Documentation and Trailhead.</p>
      </header>

      <div class="interview-page__filters" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:2rem;">
        <button class="btn btn--primary interview-filter interview-filter--active" data-filter="all">All Modules</button>
        ${modules.map(mod => `
          <button class="btn btn--ghost interview-filter" data-filter="${mod.id}">
            ${mod.icon} ${mod.title}
          </button>
        `).join('')}
      </div>

      <div class="interview-page__content" id="interviewContent" style="display:flex; flex-direction:column; gap:2rem;">
        ${modules.map(mod => {
          const questions = data[mod.id] || [];
          if (questions.length === 0) return '';
          return `
          <section class="interview-module" data-module="${mod.id}" style="background:var(--bg-surface); padding:2rem; border-radius:12px; border:1px solid var(--border-default);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
              <h2 class="interview-module__title" style="font-size:1.5rem; margin:0; display:flex; align-items:center; gap:0.5rem; color:var(--text-primary);">
                ${mod.icon} ${mod.title}
              </h2>
              <a href="#/quiz-hub" class="btn btn--outline" style="border-color:${mod.color}; color:${mod.color};">📝 Take Module Quizzes</a>
            </div>
            <div class="qa-list" style="display:flex; flex-direction:column; gap:1rem;">
              ${questions.map((q, i) => `
                <div class="qa-item" style="border:1px solid var(--glass-border); border-radius:8px; overflow:hidden;">
                  <button class="qa-question" style="width:100%; text-align:left; padding:1rem; background:var(--bg-base); border:none; color:var(--text-primary); font-size:1.1rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
                    <span><span style="color:var(--primary-color);">Q${i+1}.</span> ${q.question}</span>
                    <span class="qa-icon" style="transition:transform 0.2s;">▼</span>
                  </button>
                  <div class="qa-answer" style="display:none; padding:1rem; background:var(--bg-surface); border-top:1px solid var(--glass-border); line-height:1.6; color:var(--text-secondary);">
                    <p style="white-space:pre-wrap;">${q.answer}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        `}).join('')}
      </div>
    </div>`;

  // Filter functionality
  const filters = main.querySelectorAll('.interview-filter');
  const sections = main.querySelectorAll('.interview-module');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => {
        f.classList.remove('btn--primary', 'interview-filter--active');
        f.classList.add('btn--ghost');
      });
      btn.classList.remove('btn--ghost');
      btn.classList.add('btn--primary', 'interview-filter--active');
      
      const filter = btn.dataset.filter;
      sections.forEach(sec => {
        sec.style.display = (filter === 'all' || sec.dataset.module === filter) ? '' : 'none';
      });
    });
  });

  // Accordion functionality
  const qaButtons = main.querySelectorAll('.qa-question');
  qaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.qa-icon');
      const isVisible = answer.style.display === 'block';
      
      answer.style.display = isVisible ? 'none' : 'block';
      icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });

  main.scrollTo({ top: 0, behavior: 'smooth' });
}

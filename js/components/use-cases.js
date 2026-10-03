import { useCases } from '../data/use-cases-data.js';

export function renderUseCasesPage() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  main.innerHTML = `
    <div class="use-cases-page">
      <header class="use-cases-header" style="margin-bottom: 2rem; text-align: center;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">💡 50 Real-World Use Cases</h1>
        <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">
          From basic administration to expert-level architecture. Explore how Salesforce is used in the real world by businesses across the globe.
        </p>
      </header>

      <div class="use-cases-filters" style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap;">
        <button class="btn btn--primary filter-btn" data-filter="all">All</button>
        <button class="btn btn--ghost filter-btn" data-filter="Easy">Easy (Admin)</button>
        <button class="btn btn--ghost filter-btn" data-filter="Medium">Medium (Flows)</button>
        <button class="btn btn--ghost filter-btn" data-filter="Hard">Hard (Apex/Integration)</button>
        <button class="btn btn--ghost filter-btn" data-filter="Expert">Expert (LWC/Arch)</button>
      </div>

      <div class="use-cases-grid" id="useCasesGrid" style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
        ${generateUseCasesHTML(useCases)}
      </div>

      <!-- Use Case Modal -->
      <div class="modal-overlay" id="useCaseModal" style="display: none; align-items: center; justify-content: center; z-index: 1000;">
        <div class="modal-content" style="background: var(--bg-elevated); padding: 2rem; border-radius: 16px; border: 1px solid var(--border-default); box-shadow: 0 20px 40px rgba(0,0,0,0.4); max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto; position: relative; z-index: 1001;">
          <button id="closeUseCaseModal" class="btn btn--ghost btn--sm" style="position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; padding: 0.25rem 0.75rem; background: var(--bg-base);">&times;</button>
          <div id="useCaseModalBody"></div>
        </div>
      </div>
    </div>
  `;

  main.scrollTo({ top: 0, behavior: 'smooth' });

  // Attach filter logic
  const filterBtns = main.querySelectorAll('.filter-btn');
  const grid = document.getElementById('useCasesGrid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('btn--primary');
        b.classList.add('btn--ghost');
      });
      e.target.classList.remove('btn--ghost');
      e.target.classList.add('btn--primary');

      // Filter data
      const filter = e.target.dataset.filter;
      let data = useCases;
      if (filter !== 'all') {
        data = useCases.filter(uc => uc.difficulty === filter);
      }
      grid.innerHTML = generateUseCasesHTML(data);
      attachCardListeners();
    });
  });

  attachCardListeners();

  // Modal close logic
  const modal = document.getElementById('useCaseModal');
  const closeBtn = document.getElementById('closeUseCaseModal');
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function attachCardListeners() {
  const cards = document.querySelectorAll('.use-case-card');
  const modal = document.getElementById('useCaseModal');
  const modalBody = document.getElementById('useCaseModalBody');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id, 10);
      const uc = useCases.find(u => u.id === id);
      if (uc) {
        modalBody.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
              <span class="badge ${getBadgeClass(uc.difficulty)}">${uc.difficulty}</span>
              <span class="badge badge--neutral">${uc.category}</span>
              <span class="badge badge--neutral">🏢 ${uc.company}</span>
            </div>
            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">${uc.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem;">${uc.subtitle}</p>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Tags & Learning Objectives</h3>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
              ${(uc.tags || []).map(tag => `<span class="badge" style="background: rgba(124, 58, 237, 0.1); color: var(--primary-color); border: 1px solid rgba(124, 58, 237, 0.2);">${tag}</span>`).join('')}
            </div>
            <ul style="padding-left: 1.5rem; color: var(--text-primary);">
              ${(uc.learnings || []).map(l => `<li>${l}</li>`).join('')}
            </ul>
          </div>
          
          <div class="use-case-content" style="line-height: 1.6;">
            ${uc.content}
          </div>
        `;
        modal.style.display = 'flex';
      }
    });
  });
}

function getBadgeClass(difficulty) {
  if (difficulty === 'Medium') return 'badge--warning';
  if (difficulty === 'Hard') return 'badge--danger';
  if (difficulty === 'Expert') return 'badge--danger" style="background: var(--primary-color); color: #fff;';
  return 'badge--success';
}

function generateUseCasesHTML(cases) {
  return cases.map(uc => {
    return `
      <div class="use-case-card" data-id="${uc.id}" style="background: var(--bg-surface); border: 1px solid var(--glass-border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="badge ${getBadgeClass(uc.difficulty)}">${uc.difficulty}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">${uc.category}</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600;">#${uc.id} - ${uc.title}</h3>
        <div style="flex: 1;">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.5;">
            <strong>Scenario:</strong> ${uc.description}
          </p>
        </div>
        <div style="background: var(--bg-base); padding: 1rem; border-radius: 8px; font-size: 0.9rem; border-left: 3px solid var(--primary-color);">
          <strong>Focus:</strong> ${uc.subtitle || (uc.tags && uc.tags.join(', '))}
        </div>
        <button class="btn btn--outline btn--sm" style="width: 100%; margin-top: auto;">View Build Guide</button>
      </div>
    `;
  }).join('');
}


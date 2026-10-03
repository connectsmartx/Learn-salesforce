const fs = require('fs');
let code = fs.readFileSync('css/components.css', 'utf8');
code += `
/* ============================================================
   AUTH MODAL STYLES
   ============================================================ */
.modal-content {
  width: 440px;
  max-width: 95vw;
  background: var(--bg-elevated);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 2.5rem;
  animation: modalSlideDown 300ms cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.auth-modal-content h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  text-align: center;
}

.auth-modal-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-family);
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 161, 224, 0.15);
}

.auth-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: var(--text-muted);
  font-size: 0.875rem;
}
.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-default);
}
.auth-divider span {
  padding: 0 1rem;
}

.auth-google-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0.75rem;
  cursor: pointer;
}
.auth-google-btn:hover {
  background: var(--bg-hover);
}

.auth-toggle {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.btn--block {
  width: 100%;
  display: block;
}
`;
fs.writeFileSync('css/components.css', code, 'utf8');
console.log('Added Auth modal styles.');

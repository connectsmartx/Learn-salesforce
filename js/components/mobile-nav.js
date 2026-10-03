/* ============================================================
   MOBILE NAV — Hamburger Menu & Drawer
   ============================================================ */

import { store } from '../store.js';

export function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileBottomNav = document.getElementById('mobileBottomNav');

  if (!hamburger || !sidebar || !overlay) return;

  const toggleSidebar = () => {
    const isOpen = sidebar.classList.toggle('sidebar--open');
    overlay.classList.toggle('sidebar-overlay--visible', isOpen);
    hamburger.classList.toggle('hamburger--active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  };

  hamburger.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', toggleSidebar);

  // Close sidebar on link click (mobile)
  sidebar.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar__lesson-link') || e.target.closest('.sidebar__link');
    if (link && window.innerWidth < 1024) {
      sidebar.classList.remove('sidebar--open');
      overlay.classList.remove('sidebar-overlay--visible');
      hamburger.classList.remove('hamburger--active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Mobile bottom nav — highlight active tab
  if (mobileBottomNav) {
    const updateActiveTab = () => {
      const hash = window.location.hash.slice(1) || '/';
      const items = mobileBottomNav.querySelectorAll('.mobile-bottom-nav__item');
      items.forEach(item => {
        const href = item.getAttribute('href')?.slice(1) || '/';
        const isActive = hash === href || 
          (href === '/' && hash === '/') ||
          (href === '/modules' && hash.startsWith('/lesson')) ||
          (href === '/quiz-hub' && hash.startsWith('/quiz'));
        item.classList.toggle('active', isActive);
      });
    };
    window.addEventListener('hashchange', updateActiveTab);
    updateActiveTab();
  }
}

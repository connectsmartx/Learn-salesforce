/* ============================================================
   CONFETTI — Canvas Confetti Wrapper
   ============================================================ */

import confetti from 'canvas-confetti';

export function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#00a1e0', '#7c3aed', '#22c55e', '#f59e0b'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#00a1e0', '#7c3aed', '#22c55e', '#f59e0b'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function launchAchievementConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffd700', '#ffec8b', '#f59e0b', '#7c3aed'],
  });
}

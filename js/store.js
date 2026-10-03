/* ============================================================
   STORE — Centralized State Management (In-Memory Only)
   ============================================================ */

const DEFAULT_STATE = {
  user: {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    achievements: [],
  },
  progress: {
    completedLessons: [],
    quizScores: {},
  },
  settings: {
    theme: 'dark',
    fontSize: 'base',
    sidebarOpen: true,
  },
};

const LEVELS = [
  { name: 'Trailblazer', minXP: 0, icon: '🌱' },
  { name: 'Ranger', minXP: 100, icon: '🏕️' },
  { name: 'Explorer', minXP: 300, icon: '🧭' },
  { name: 'Builder', minXP: 600, icon: '🔨' },
  { name: 'Architect', minXP: 1000, icon: '🏛️' },
  { name: 'Guru', minXP: 1500, icon: '🧠' },
  { name: 'Master', minXP: 2500, icon: '👑' },
];

const ACHIEVEMENTS = [
  { id: 'first_steps', name: 'First Steps', icon: '👣', desc: 'Complete your first lesson', check: s => s.progress.completedLessons.length >= 1 },
  { id: 'getting_started', name: 'Getting Started', icon: '🚀', desc: 'Complete 5 lessons', check: s => s.progress.completedLessons.length >= 5 },
  { id: 'ten_down', name: 'Ten Down', icon: '🔟', desc: 'Complete 10 lessons', check: s => s.progress.completedLessons.length >= 10 },
  { id: 'halfway', name: 'Halfway There', icon: '⚡', desc: 'Complete 25 lessons', check: s => s.progress.completedLessons.length >= 25 },
  { id: 'completionist', name: 'Completionist', icon: '🏆', desc: 'Complete all lessons', check: s => s.progress.completedLessons.length >= 55 },
  { id: 'quiz_taker', name: 'Quiz Taker', icon: '📝', desc: 'Take your first quiz', check: s => Object.keys(s.progress.quizScores).length >= 1 },
  { id: 'quiz_ace', name: 'Quiz Ace', icon: '💯', desc: 'Score 100% on any quiz', check: s => Object.values(s.progress.quizScores).some(q => q.bestScore === 100) },
  { id: 'quiz_master', name: 'Quiz Master', icon: '🎓', desc: 'Complete all 4 quizzes', check: s => Object.keys(s.progress.quizScores).length >= 4 },
  { id: 'streak_3', name: 'On Fire', icon: '🔥', desc: '3-day learning streak', check: s => s.user.streak >= 3 },
  { id: 'streak_7', name: 'Week Warrior', icon: '⚔️', desc: '7-day learning streak', check: s => s.user.streak >= 7 },
  { id: 'apex_starter', name: 'Apex Starter', icon: '💻', desc: 'Complete first Apex lesson', check: s => s.progress.completedLessons.some(l => l.startsWith('3.')) },
  { id: 'lwc_starter', name: 'LWC Starter', icon: '⚡', desc: 'Complete first LWC lesson', check: s => s.progress.completedLessons.some(l => l.startsWith('4.')) },
  { id: 'admin_complete', name: 'Admin Pro', icon: '🛡️', desc: 'Complete all Admin lessons', check: s => { for(let i=1;i<=10;i++) if(!s.progress.completedLessons.includes('2.'+i)) return false; return true; }},
  { id: 'apex_complete', name: 'Apex Expert', icon: '🔮', desc: 'Complete all Apex lessons', check: s => { for(let i=1;i<=20;i++) if(!s.progress.completedLessons.includes('3.'+i)) return false; return true; }},
  { id: 'lwc_complete', name: 'LWC Champion', icon: '🏅', desc: 'Complete all LWC lessons', check: s => { for(let i=1;i<=15;i++) if(!s.progress.completedLessons.includes('4.'+i)) return false; return true; }},
  { id: 'xp_100', name: 'Century', icon: '💎', desc: 'Earn 100 XP', check: s => s.user.xp >= 100 },
  { id: 'xp_500', name: 'High Roller', icon: '🎰', desc: 'Earn 500 XP', check: s => s.user.xp >= 500 },
  { id: 'xp_1000', name: 'Thousandaire', icon: '💰', desc: 'Earn 1000 XP', check: s => s.user.xp >= 1000 },
];

class Store {
  constructor() {
    // In-memory only — no localStorage
    this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this._listeners = [];
  }

  get state() {
    return this._state;
  }

  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }

  _notify() {
    this._listeners.forEach(fn => fn(this._state));
  }

  /* ---- XP & Levels ---- */
  addXP(amount) {
    this._state.user.xp += amount;
    this._state.user.level = this._calculateLevel();
    this._notify();
    return this._checkAchievements();
  }

  _calculateLevel() {
    let level = 1;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (this._state.user.xp >= LEVELS[i].minXP) {
        level = i + 1;
        break;
      }
    }
    return level;
  }

  getLevelInfo() {
    const idx = Math.min(this._state.user.level - 1, LEVELS.length - 1);
    return LEVELS[idx];
  }

  getNextLevelInfo() {
    const idx = Math.min(this._state.user.level, LEVELS.length - 1);
    return LEVELS[idx];
  }

  /* ---- Lesson Progress ---- */
  completeLesson(lessonId) {
    if (this._state.progress.completedLessons.includes(lessonId)) return [];
    this._state.progress.completedLessons.push(lessonId);
    this._notify();
    return this.addXP(10);
  }

  isLessonCompleted(lessonId) {
    return this._state.progress.completedLessons.includes(lessonId);
  }

  getCompletedCount() {
    return this._state.progress.completedLessons.length;
  }

  getModuleCompletedCount(moduleId) {
    return this._state.progress.completedLessons.filter(l => l.startsWith(moduleId + '.')).length;
  }

  /* ---- Quiz Scores ---- */
  saveQuizScore(moduleId, score, total, timeSeconds, answers) {
    const existing = this._state.progress.quizScores[moduleId];
    const pct = Math.round((score / total) * 100);
    this._state.progress.quizScores[moduleId] = {
      lastScore: pct,
      bestScore: existing ? Math.max(existing.bestScore, pct) : pct,
      lastAnswers: answers,
      lastTime: timeSeconds,
      attempts: (existing?.attempts || 0) + 1,
    };
    this._notify();
    return this.addXP(25);
  }

  getQuizScore(moduleId) {
    return this._state.progress.quizScores[moduleId] || null;
  }

  /* ---- Settings ---- */
  setSetting(key, value) {
    this._state.settings[key] = value;
    this._notify();
  }

  /* ---- Achievements ---- */
  _checkAchievements() {
    const newAchievements = [];
    for (const ach of ACHIEVEMENTS) {
      if (!this._state.user.achievements.includes(ach.id) && ach.check(this._state)) {
        this._state.user.achievements.push(ach.id);
        newAchievements.push(ach);
      }
    }
    return newAchievements;
  }

  getAllAchievements() {
    return ACHIEVEMENTS;
  }

  isAchievementUnlocked(id) {
    return this._state.user.achievements.includes(id);
  }

  /* ---- Total Lessons ---- */
  getTotalLessons() {
    return 55;
  }

  getOverallProgress() {
    return Math.round((this.getCompletedCount() / this.getTotalLessons()) * 100);
  }

  /* ---- Reset ---- */
  reset() {
    this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this._notify();
  }
}

export const store = new Store();

/* ============================================================
   ROUTER — Hash-based SPA Router
   ============================================================ */

class Router {
  constructor() {
    this._routes = [];
    this._currentRoute = null;
    window.addEventListener('hashchange', () => this._resolve());
  }

  on(pattern, handler) {
    // Convert pattern like '/lesson/:moduleId/:lessonId' to regex
    const paramNames = [];
    const regexStr = pattern.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this._routes.push({
      pattern,
      regex: new RegExp('^' + regexStr + '$'),
      paramNames,
      handler,
    });
    return this;
  }

  start() {
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this._resolve();
  }

  navigate(path) {
    window.location.hash = '#' + path;
  }

  _resolve() {
    const hash = window.location.hash.slice(1) || '/';
    
    // Ignore Supabase auth hashes so they don't get cleared before Supabase can read them
    // but still render the home page underneath the modal
    if (hash.startsWith('access_token=') || hash.includes('type=recovery') || hash.includes('error=')) {
      const homeRoute = this._routes.find(r => r.pattern === '/');
      if (homeRoute) homeRoute.handler({});
      return;
    }

    for (const route of this._routes) {
      const match = hash.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = decodeURIComponent(match[i + 1]);
        });
        this._currentRoute = route.pattern;
        route.handler(params);
        return;
      }
    }
    // 404 fallback - redirect to home
    window.location.hash = '#/';
  }

  getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }
}

export const router = new Router();

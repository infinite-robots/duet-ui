export function requireAuth(to, from, next) {
  const isAuthenticated = localStorage.getItem('user');
  if (!isAuthenticated) {
    next({
      path: '/onboarding'
    });
  } else {
    next();
  }
}
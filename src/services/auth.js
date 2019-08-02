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

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}
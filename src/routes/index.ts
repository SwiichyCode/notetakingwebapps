export const routes = {
  home: '/',
  dashboard: '/dashboard',
  login: '/login',
  signup: '/signup',
  'verify-email': '/verify-email',
  'forgot-password': '/forgot-password',
  'reset-password': '/reset-password',
};

export const protectedRoutes = [routes.dashboard];
export const publicRoutes = [routes.login, routes.signup, routes.home];

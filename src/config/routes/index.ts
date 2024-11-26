export const routes = {
  home: '/',
  dashboard: '/dashboard/notes',
  createNote: '/dashboard/notes/create',
  archived: '/dashboard/archived',
  settings: '/dashboard/settings',
  login: '/login',
  signup: '/signup',
  'verify-email': '/verify-email',
  'forgot-password': '/forgot-password',
  'reset-password': '/reset-password',
};

export const protectedRoutes = [routes.dashboard, routes.archived];
export const publicRoutes = [routes.login, routes.signup, routes.home];

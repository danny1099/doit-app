export const publicRoutes = {
  Home: '/',
  Login: '/auth/login',
  Register: '/auth/register'
}

export const privateRoutes = {
  Workspace: (worspace: string) => `/private/ws/${worspace}`,
  Profile: '/private/profile'
}

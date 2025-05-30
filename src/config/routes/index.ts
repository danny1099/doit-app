const publicRoutes = {
  get_started: "/auth/get-started",
  sign_in: "/auth/sign-in",
};

const privateRoutes = {
  overview: "/private/ws/overview",
  links: "/private/ws/links",
  qr: "/private/ws/qr",
  settings: "/private/ws/settings",
};

export type PublicRoute = keyof typeof publicRoutes;
export type PrivateRoute = keyof typeof privateRoutes;
export const getPublicRoute = (route: PublicRoute): string => publicRoutes[route];
export const getPrivateRoute = (route: PrivateRoute): string => privateRoutes[route];

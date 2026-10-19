export const routes = {
  public: {
    prefix: "/",
    routes: {
      home: "",
      auth: {
        prefix: "auth",
        routes: {
          sign_in: "/sign-in",
          get_started: "/get-started",
          forgot_password: "/forgot-password",
        },
      },
      legal: {
        prefix: "legal",
        routes: {
          terms: "/terms",
          privacy: "/privacy",
          data_usage: "/data-usage",
          cookies: "/cookies",
        },
      },
    },
  },

  private: {
    prefix: "/",
    routes: {
      onboarding: "onboarding",
      main: {
        prefix: "main",
        routes: {
          overview: "/overview",
          organizations: "/organizations",
          organization: "/organizations/[slug]",
        },
      },
    },
  },
} as const;

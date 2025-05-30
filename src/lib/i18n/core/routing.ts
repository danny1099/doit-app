import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

/* get all messages translation config */
export type LangEn = typeof import("@/lib/i18n/lang/en.json");
export type LangEs = typeof import("@/lib/i18n/lang/es.json");

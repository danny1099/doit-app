import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/* prettier-ignore */
export default getRequestConfig(async ({ locale: requestedLocale }) => {
  const requested = await requestedLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale, 
    messages: (await import(`@/lib/i18n/locales/${locale}.json`)).default
  }
});

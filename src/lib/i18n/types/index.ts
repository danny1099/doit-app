import { LangEn, LangEs } from "@/lib/i18n/core/routing";

declare global {
  interface IntlMessages extends LangEn, LangEs {}
}

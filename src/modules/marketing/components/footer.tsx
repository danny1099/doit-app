import { getTranslations } from "next-intl/server";
import type { Route } from "next";
import Link from "next/link";
import { getPublicRoute } from "@/routes/utils";
import { Logo, P } from "@/shared/components";

const anchors = [
  { key: "how_it_works", href: "/#how-it-works" },
  { key: "features", href: "/#features" },
  { key: "pricing", href: "/#pricing" },
] as const;

const legalDocs = ["terms", "privacy", "cookies", "data_usage"] as const;

const linkClass = "w-fit text-2xs text-foreground/70 hover:text-tertiary transition-colors";
const columnTitleClass = "text-4xs text-foreground font-medium tracking-wider font-semibold uppercase";

/* prettier-ignore */
export const Footer = async () => {
  const t = await getTranslations("marketing.footer");
  const toSignIn = getPublicRoute("sign_in");
  const toGetStarted = getPublicRoute("get_started");

  return (
    <footer className="border-border/80 border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo showBrand />
            <P className="mt-3 leading-relaxed text-pretty">{t("tagline")}</P>
          </div>
          <nav className="flex flex-col gap-3">
            <span className={columnTitleClass}>{t("product")}</span>
            {anchors.map((anchor) => (
              <a key={anchor.href} href={anchor.href} className={linkClass}>{t(`links.${anchor.key}`)}</a>
            ))}
          </nav>
          <nav className="flex flex-col gap-3">
            <span className={columnTitleClass}>{t("account")}</span>
            <Link href={toGetStarted as Route} className={linkClass}>{t("links.get_started")}</Link>
            <Link href={toSignIn as Route} className={linkClass}>{t("links.sign_in")}</Link>
          </nav>
          <nav className="flex flex-col gap-3">
            <span className={columnTitleClass}>{t("legal")}</span>
            {legalDocs.map((doc) => (
              <Link key={doc} href={getPublicRoute(doc) as Route} className={linkClass}>{t(`links.${doc}`)}</Link>
            ))}
          </nav>
        </div>
        <div className="border-border/60 mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-3xs">{t("rights", { year: new Date().getFullYear() })}</p>
          <a href="#top" className="text-muted-foreground hover:text-tertiary text-3xs transition-colors">{t("back_to_top")}</a>
        </div>
      </div>
    </footer>
  );
};

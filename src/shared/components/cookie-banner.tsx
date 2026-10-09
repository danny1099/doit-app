"use client";
import { useEffect, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Icon, Switch } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

const STORAGE_KEY = "doit.cookie-consent";
const CONSENT_VERSION = 1;

interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  updatedAt: string;
}

/* prettier-ignore */
export const CookieBanner = () => {
  const t = useTranslations("legal.banner");
  const toCookies = getPublicRoute("cookies") as Route;
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Consent;
        if (parsed.version === CONSENT_VERSION) return;
      }
    } catch {
      /* ignore storage errors */
    }
    setVisible(true);
  }, []);

  const persist = (analyticsValue: boolean, marketingValue: boolean) => {
    try {
      const consent: Consent = {
        necessary: true,
        analytics: analyticsValue,
        marketing: marketingValue,
        version: CONSENT_VERSION,
        updatedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label={t("title")} aria-live="polite" className="fixed inset-x-0 bottom-0 z-50 p-3 md:p-5">
      <div className="border-border/60 bg-card/95 mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border p-5 shadow-[0_1px_0_0_rgba(0,0,0,0.03),0_30px_80px_-40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <span className="border-border/60 bg-muted/40 flex size-9 shrink-0 items-center justify-center rounded-xl border">
            <Icon name="shield" className="text-tertiary size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{t("title")}</p>
            <p className="text-muted-foreground mt-1 text-2xs leading-relaxed">
              {t.rich("description", {
                policy: (chunk) => (
                  <Link href={toCookies} className="text-tertiary underline underline-offset-2">{chunk}</Link>
                ),
              })}
            </p>
          </div>
          <Button variant="ghost" size="icon" aria-label={t("dismiss")} onClick={() => persist(false, false)} className="shrink-0">
            <Icon name="close" className="size-3.5" />
          </Button>
        </div>

        {showPrefs && (
          <div className="border-border/60 flex flex-col gap-3 rounded-xl border p-3">
            <label htmlFor="cookie-necessary" className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-2xs font-medium">{t("necessary_title")}</span>
                <span className="text-muted-foreground block text-3xs">{t("necessary_description")}</span>
              </span>
              <Switch id="cookie-necessary" checked disabled aria-label={t("necessary_title")} />
            </label>
            <label htmlFor="cookie-analytics" className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-2xs font-medium">{t("analytics_title")}</span>
                <span className="text-muted-foreground block text-3xs">{t("analytics_description")}</span>
              </span>
              <Switch id="cookie-analytics" checked={analytics} onCheckedChange={setAnalytics} aria-label={t("analytics_title")} />
            </label>
            <label htmlFor="cookie-marketing" className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-2xs font-medium">{t("marketing_title")}</span>
                <span className="text-muted-foreground block text-3xs">{t("marketing_description")}</span>
              </span>
              <Switch id="cookie-marketing" checked={marketing} onCheckedChange={setMarketing} aria-label={t("marketing_title")} />
            </label>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {showPrefs ? (
            <>
              <Button variant="outline" className="h-9" onClick={() => persist(true, true)}>{t("accept_all")}</Button>
              <Button className="h-9" onClick={() => persist(analytics, marketing)}>{t("save")}</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="h-9" onClick={() => setShowPrefs(true)}>{t("customize")}</Button>
              <Button variant="outline" className="h-9" onClick={() => persist(false, false)}>{t("reject_all")}</Button>
              <Button className="h-9" onClick={() => persist(true, true)}>{t("accept_all")}</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

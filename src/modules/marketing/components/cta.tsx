import { getTranslations } from "next-intl/server";
import { getPublicRoute } from "@/routes/utils";
import { Navlink, P, Reveal, Title } from "@/shared/components";

/* prettier-ignore */
export const Cta = async () => {
  const t = await getTranslations("marketing.cta");
  const toGetStarted = getPublicRoute("get_started");

  return (
    <section className="px-4 pb-24 md:px-6">
      <div className="border-border/40 relative mx-auto max-w-6xl overflow-hidden rounded-3xl border px-6 py-16 text-center md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_80%_at_50%_50%,black,transparent)]" />
          <div className="bg-tertiary/15 absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full blur-3xl" />
        </div>
        <Reveal className="flex flex-col items-center">
          <Title type="h2" className="max-w-2xl text-3xl leading-[1.05] tracking-tighter text-balance md:text-6xl">
            {t("title")}
          </Title>
          <P className="mt-4 max-w-md leading-relaxed text-pretty md:text-sm">{t("subtitle")}</P>
          <Navlink href={toGetStarted} icon="arrow_right" className="mt-8 h-10 rounded-full px-6 text-xs transition-transform active:scale-[0.97]">
            {t("button")}
          </Navlink>
        </Reveal>
      </div>
    </section>
  );
};

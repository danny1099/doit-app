import { getTranslations } from "next-intl/server";
import type { Route } from "next";
import Link from "next/link";
import { getPublicRoute } from "@/routes/utils";
import { Heading, P, Reveal, Title } from "@/shared/components";
import type { LegalContent, LegalDocKey } from "@/modules/legal/types";
import { cn } from "@/shared/utils";

const docs: readonly LegalDocKey[] = ["terms", "privacy", "data_usage", "cookies"];

interface Props {
  content: LegalContent;
  active: LegalDocKey;
}

/* prettier-ignore */
export const LegalPage = async ({ content, active }: Props) => {
  const t = await getTranslations("legal");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <Reveal className="flex flex-col items-start">
        <Title type="h1" className="mt-4 max-w-3xl text-4xl tracking-tighter text-balance md:text-5xl">{content.title}</Title>
        <P className="mt-4 max-w-2xl leading-relaxed text-pretty md:text-sm">{content.subtitle}</P>
        <p className="text-muted-foreground mt-3 text-3xs">{t("common.updated")} · {content.updated}</p>
      </Reveal>

      <nav aria-label={t("common.eyebrow")} className="border-border/60 mt-8 flex gap-2 overflow-x-auto border-b pb-px">
        {docs.map((doc) => {
          const isActive = doc === active;
          return (
            <Link
              key={doc}
              href={getPublicRoute(doc) as Route}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "-mb-px shrink-0 border-b-2 px-3 py-2.5 text-2xs font-medium whitespace-nowrap transition-colors",
                isActive ? "border-tertiary text-tertiary" : "text-muted-foreground hover:text-foreground border-transparent"
              )}
            >
              {t(`nav.${doc}`)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
        <Reveal className="min-w-0">
          <article className="max-w-3xl">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 not-first:mt-10">
                <Heading type="h2" className="text-lg tracking-tight md:text-xl">{section.title}</Heading>
                {section.paragraphs?.map((paragraph) => (
                  <P key={paragraph} className="text-foreground/75 mt-3 leading-relaxed text-pretty md:text-sm">{paragraph}</P>
                ))}
                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li key={item} className="text-foreground/75 flex gap-2.5 text-2xs leading-relaxed md:text-sm">
                        <span className="bg-tertiary mt-1.5 size-1.5 shrink-0 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </Reveal>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <span className="text-3xs text-muted-foreground font-medium tracking-wider uppercase">{t("common.toc")}</span>
            <nav className="border-border/60 mt-3 flex flex-col gap-2 border-l">
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-muted-foreground hover:text-tertiary hover:border-tertiary -ml-px border-l border-transparent pl-4 text-2xs transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

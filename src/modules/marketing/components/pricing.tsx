import { getTranslations } from "next-intl/server";
import { getPublicRoute } from "@/routes/utils";
import { Badge, Card, CardTitle, Icon, Navlink, P, Reveal } from "@/shared/components";
import { SectionHeading } from "@/modules/marketing/components";
import { cn } from "@/shared/utils";

const plans = ["free", "pro"] as const;

/* prettier-ignore */
export const Pricing = async () => {
  const t = await getTranslations("marketing.pricing");
  const toGetStarted = getPublicRoute("get_started");

  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
          {plans.map((plan, index) => {
            const featured = plan === "pro";
            const features = t.raw(`plans.${plan}.features`) as string[];

            return (
              <Reveal key={plan} delay={index * 0.08} className="h-full">
                <Card className={cn("bg-card/50 relative h-full gap-0 p-6", featured && "ring-tertiary/30 ring-2")}>
                  {featured && (
                    <Badge variant="tertiary" className="absolute top-5 right-5 text-3xs">{t("popular")}</Badge>
                  )}
                  <CardTitle className="text-sm">{t(`plans.${plan}.name`)}</CardTitle>
                  <div className="mt-3 flex items-end gap-1.5">
                    <span className="text-4xl font-bold tracking-tight tabular-nums">{t(`plans.${plan}.price`)}</span>
                    <span className="text-muted-foreground pb-1 text-2xs">{t(`plans.${plan}.period`)}</span>
                  </div>
                  <P className="mt-2 leading-relaxed text-pretty">{t(`plans.${plan}.description`)}</P>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-2xs">
                        <span className="border-border/60 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border">
                          <Icon name="check" className="text-tertiary size-2.5" />
                        </span>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Navlink
                    href={toGetStarted}
                    variant={featured ? "default" : "outline"}
                    icon="arrow_right"
                    className="mt-6 h-10 w-full rounded-full text-xs transition-transform active:scale-[0.97]"
                  >
                    {t(`plans.${plan}.cta`)}
                  </Navlink>
                  {featured && <p className="text-muted-foreground mt-3 text-center text-3xs">{t("plans.pro.note")}</p>}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

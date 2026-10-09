import { getTranslations } from "next-intl/server";
import { Card, CardDescription, CardTitle, IconName, Reveal } from "@/shared/components";
import { SectionHeading } from "@/modules/marketing/components";
import { CapturePreview, FocusPreview, IconChip, OrganizePreview } from "@/modules/marketing/components";

interface Step {
  key: "capture" | "organize" | "focus";
  icon: IconName;
  visual: React.ReactNode;
}

const steps: readonly Step[] = [
  { key: "capture", icon: "inbox", visual: <CapturePreview /> },
  { key: "organize", icon: "ia", visual: <OrganizePreview /> },
  { key: "focus", icon: "lightning", visual: <FocusPreview /> },
];

/* prettier-ignore */
export const HowItWorks = async () => {
  const t = await getTranslations("marketing.how_it_works");

  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.key} delay={index * 0.08} className="h-full">
              <Card className="bg-card h-full gap-5 p-5">
                <div className="flex items-center justify-between">
                  <span className="border-border text-muted-foreground flex size-6 items-center justify-center rounded-full border text-3xs font-semibold tabular-nums">
                    {index + 1}
                  </span>
                  <IconChip name={step.icon} className="size-8 rounded-lg" />
                </div>
                <div className="bg-accent flex min-h-24 items-center rounded-xl p-3">{step.visual}</div>
                <div>
                  <CardTitle className="text-sm">{t(`steps.${step.key}.title`)}</CardTitle>
                  <CardDescription className="mt-1.5 leading-relaxed text-pretty">{t(`steps.${step.key}.description`)}</CardDescription>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

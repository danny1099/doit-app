import { getTranslations } from "next-intl/server";
import { Card, CardDescription, CardTitle, IconName, P, Reveal } from "@/shared/components";
import { SectionHeading } from "@/modules/marketing/components";
import { IconChip, OrganizePreview } from "@/modules/marketing/components";

interface Feature {
  key: "focus" | "dependencies" | "location" | "resources" | "modes" | "workspaces";
  icon: IconName;
}

const features: readonly Feature[] = [
  { key: "focus", icon: "lightning" },
  { key: "dependencies", icon: "node" },
  { key: "location", icon: "globe" },
  { key: "resources", icon: "file" },
  { key: "modes", icon: "person" },
  { key: "workspaces", icon: "workspace" },
];

/* prettier-ignore */
export const Features = async () => {
  const t = await getTranslations("marketing.features");

  return (
    <section id="features" className="scroll-mt-20 border-border/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal className="md:col-span-3">
            <Card className="grid gap-6 p-6 md:grid-cols-2 md:items-center md:p-8">
              <div>
                <IconChip name="ia" />
                <CardTitle className="mt-4 text-base">{t("items.capture.title")}</CardTitle>
                <P className="mt-2 max-w-md leading-relaxed text-pretty">{t("items.capture.description")}</P>
              </div>
              <OrganizePreview className="w-full" />
            </Card>
          </Reveal>
          {features.map((feature, index) => (
            <Reveal key={feature.key} delay={index * 0.05} className="h-full">
              <Card className="bg-card h-full gap-0 p-5">
                <IconChip name={feature.icon} />
                <CardTitle className="mt-4 text-sm">{t(`items.${feature.key}.title`)}</CardTitle>
                <CardDescription className="mt-1.5 leading-relaxed text-pretty">{t(`items.${feature.key}.description`)}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

import { getTranslations } from "next-intl/server";
import { Icon, IconName } from "@/shared/components";

interface TrustItem {
  key: "capture" | "privacy" | "offline" | "devices";
  icon: IconName;
}

const items: readonly TrustItem[] = [
  { key: "capture", icon: "ia" },
  { key: "privacy", icon: "shield" },
  { key: "offline", icon: "refresh" },
  { key: "devices", icon: "globe" },
];

/* prettier-ignore */
export const TrustStrip = async () => {
  const t = await getTranslations("marketing.trust.items");

  return (
    <section className="border-border/60 bg-muted/20 border-y">
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 md:grid-cols-4">
        {items.map(({ key, icon }) => (
          <li key={key} className="border-border/60 flex items-center justify-center gap-2 border-r px-4 py-5 text-2xs font-medium text-muted-foreground last:border-r-0 nth-2:border-r-0 md:nth-2:border-r">
            <Icon name={icon} className="text-tertiary size-3.5" />
            {t(key)}
          </li>
        ))}
      </ul>
    </section>
  );
};

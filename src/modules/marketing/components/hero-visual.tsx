import { getTranslations } from "next-intl/server";
import { Icon, IconName } from "@/shared/components";
import { cn } from "@/shared/utils";

interface Task {
  key: "deck" | "email" | "errand" | "review";
  type: "digital" | "communication" | "location" | "scheduled";
  icon: IconName;
}

const tasks: readonly Task[] = [
  { key: "deck", type: "digital", icon: "ia" },
  { key: "email", type: "communication", icon: "email" },
  { key: "errand", type: "location", icon: "home" },
  { key: "review", type: "scheduled", icon: "calendar" },
];

/* prettier-ignore */
export const HeroVisual = async () => {
  const t = await getTranslations("marketing.hero.visual");

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="ring-foreground/10 bg-card/70 overflow-hidden rounded-2xl text-left shadow-[0_1px_0_0_rgba(0,0,0,0.03),0_30px_80px_-40px_rgba(0,0,0,0.35)] ring-1 backdrop-blur-xl">
        <div className="border-border/60 flex items-center gap-2 border-b px-4 py-3">
          <span className="bg-muted-foreground/25 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/25 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/25 size-2.5 rounded-full" />
          <span className="text-3xs text-muted-foreground ml-2 font-medium">Doit</span>
          <span className="bg-muted text-muted-foreground ml-auto rounded-full px-2.5 py-0.5 text-3xs font-medium">{t("today")}</span>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="border-border/60 flex flex-col p-5 md:border-r">
            <div className="text-3xs text-muted-foreground mb-2 font-medium tracking-wider uppercase">{t("label")}</div>
            <div className="border-border/60 bg-accent/80 rounded-xl border p-3.5">
              <p className="text-foreground/80 text-2xs leading-relaxed">
                {t("input")}
                <span className="bg-tertiary ml-0.5 inline-block h-3 w-px translate-y-0.5 animate-pulse align-middle" />
              </p>
            </div>
            <div className="text-tertiary mt-3 flex items-center gap-1.5 text-3xs font-medium md:mt-auto">
              <Icon name="ia" className="size-3 animate-pulse" />
              {t("organizing")}
            </div>
          </div>

          <div className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xs text-muted-foreground font-medium tracking-wider uppercase">{t("today")}</span>
              <span className="bg-tertiary/10 text-tertiary rounded-full px-2 py-0.5 text-3xs font-medium tabular-nums">4</span>
            </div>
            <ul className="flex flex-col gap-2">
              {tasks.map((task) => (
                <li key={task.key} className="border-border/60 bg-background/50 hover:bg-muted/40 flex items-start gap-3 rounded-xl border p-3 transition-colors">
                  <span className="border-border/60 bg-muted/40 flex size-7 shrink-0 items-center justify-center rounded-lg border">
                    <Icon name={task.icon} className="text-tertiary size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-2xs font-medium">{t(`tasks.${task.key}.title`)}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-3xs font-medium">{t(`types.${task.type}`)}</span>
                      <span className="text-muted-foreground text-3xs">{t(`tasks.${task.key}.meta`)}</span>
                    </div>
                    {task.key === "review" && (
                      <span className="text-muted-foreground mt-1.5 flex items-center gap-1 text-3xs">
                        <Icon name="node" className="size-3" />
                        {t("blocked_by")} · {t("tasks.deck.title")}
                      </span>
                    )}
                  </div>
                  <span className={cn("mt-0.5 size-3.5 shrink-0 rounded-full border", task.key === "errand" || task.key === "review" ? "border-border/60" : "border-tertiary bg-tertiary/20")} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

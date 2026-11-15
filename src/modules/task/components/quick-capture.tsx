"use client";
import { useTranslations } from "next-intl";
import { Button, Icon, Input, Kbd } from "@/shared/components";

export const QuickCapture = () => {
  const t = useTranslations("tasks.quick_capture");

  return (
    <div className="from-background via-background/95 pointer-events-none sticky bottom-0 z-20 flex justify-center bg-linear-to-t to-transparent px-4 pt-10 pb-4">
      <div className="border-border/70 bg-muted pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-xl border p-2 shadow-lg backdrop-blur-md">
        <div className="bg-tertiary/10 text-tertiary flex size-8 shrink-0 items-center justify-center rounded-lg">
          <Icon name="ia" className="size-4" />
        </div>
        <Input
          aria-label={t("placeholder")}
          placeholder={t("placeholder")}
          variant="ghost"
          sizes="md"
          className="placeholder:text-foreground/50 text-2xs min-w-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="hidden items-center gap-1 pr-1 sm:flex">
          <Kbd>{t("shortcut_first")}</Kbd>
        </div>
        <Button size="icon" icon="arrow_send" className="size-8 rounded-full" />
      </div>
    </div>
  );
};

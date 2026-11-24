"use client";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/shared/utils";
import { Badge, Button, Icon, IconName, P, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { views, addViewToStorage, getStoredViewList, getStoredActiveView, saveActiveView } from "@/modules/task/utils";

/* prettier-ignore */
export const ViewToggle = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("tasks.views");

  /* states for selection and active view */
  const [selectedViews, setSelectedViews] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<string>(searchParams.get("view") || "list");

  const setView = (viewName: string) => {
    const updated = addViewToStorage(viewName);
    setSelectedViews(updated);
    setViewActive(viewName)
  };

  const setViewActive = (viewName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", viewName);
    router.replace(`?${params.toString()}`);
    setActiveView(viewName);
    saveActiveView(viewName)
  }

  useEffect(() => {
    setSelectedViews(getStoredViewList());
    setActiveView(getStoredActiveView())
  }, []);

  return (
    <div className="group hover:text-foreground/80 flex h-fit flex-row items-center gap-1">
      <div className="flex flex-row items-center gap-2">
        {selectedViews.map((_view) => {
          const viewBase = views.find((v) => v.name === _view)!;
          const isSelected = viewBase.name === activeView;
          return (
            <Badge key={_view} variant={isSelected ? "accent" : "ghost"} onClick={() => setViewActive(_view)} className="min-w-16 gap-2 px-2 py-1.5 font-semibold">
              <Icon name={viewBase.icon as IconName} className="size-4 shrink-0" />
              {t(viewBase?.label!)}
            </Badge>
          );
        })}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" icon="add" size="icon" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-fit">
          <div className="flex h-fit flex-col">
            <span className="text-3xs text-foreground">{t("title")}</span>
            <P className="text-4xs -mt-0.5">{t("subtitle")}</P>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {views.map((view) => (
                <button key={view.name} onClick={() => setView(view.name)} className={cn("hover:bg-accent flex h-16 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-none outline-none", activeView === view.name && "bg-accent")}>
                  <Icon name={view.icon} className="size-4 shrink-0" />
                  <span className="text-2xs">{t(view.label)}</span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

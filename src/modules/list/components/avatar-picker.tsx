"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { List } from "@prisma/client";
import { baseColors, cn, Color, getColor } from "@/shared/utils";
import { Button, Icon, IconName, P } from "@/shared/components";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/popover";
import { listIcons } from "@/modules/list/types";
import { trpc, useUtils } from "@/trpc/client";

interface AvatarPickerProps {
  list: List;
  className?: string;
}

/* prettier-ignore */
export const AvatarPicker = ({ list }: AvatarPickerProps) => {
  const [selected, setSelected] = useState(list.icon ?? "file:black");
  const [iconActive, colorActive] = selected.split(":") ?? [];
  const [open, setOpen] = useState(false);
  const t = useTranslations("lists");

  /* update list logo using trpc mutation */
  const utils = useUtils();
  const { mutateAsync, isPending } = trpc.list.update.useMutation({ onSuccess: () => utils.list.getAll.invalidate() });

  const onSubmitIcon = async (icon: string) => {
    const { data, error } = await mutateAsync({ id: list.id, icon });
    if (error || !data) {
      console.error(error);
      return;
    }

    setSelected(icon);
    setOpen(false);
  };

  const onIconSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <div className={cn("relative flex size-8 items-center justify-center rounded-lg shrink-0", getColor(colorActive as Color))}>
      <Icon name={iconActive as IconName} className="size-4" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="absolute -right-1 -bottom-2 size-4 shrink-0 rounded-full">
            <Icon name="repeat" className="text-tertiary size-2.5 dark:text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-auto flex-col">
          <div className="flex h-fit w-full flex-col px-1 py-2 md:w-96">
            <div className="flex flex-row items-center gap-3">
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full flex-col">
                  <p className="text-3xs text-foreground">{t("icons_picker.title")}</p>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-2">
                  {listIcons.map((icon) => {
                    const isSelected = iconActive === icon;
                    return (
                      <Button
                        key={`picker-${icon}`}
                        type="button"
                        variant="ghost"
                        size="icon"
                        icon={icon}
                        onClick={() => onIconSelect(`${icon}:${colorActive}`)}
                        className={cn("ring-offset-background size-6 shrink-0", isSelected && `ring-2 ring-offset-1`, isSelected && getColor(colorActive as Color))}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-5 flex h-10 w-full flex-col gap-2 px-1">
              <P className="text-3xs">{t("icons_picker.icon_color")}</P>
              <div className="flex w-full flex-row items-center gap-2">
                {Object.entries(baseColors).map(([colorName]) => {
                  const isSelected = colorActive === colorName;
                  const styles = baseColors[colorName as Color];
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => setSelected(`${iconActive}:${colorName}`)}
                      className={cn("ring-offset-background size-4 rounded-full", styles,isSelected && "ring-1 ring-offset-1")}
                    />
                  );
                })}
                <Button
                  size="sm"
                  isLoading={isPending}
                  onClick={() => onSubmitIcon(selected)}
                  className="text-3xs ml-auto w-fit [&>svg]:size-2.5"
                >
                  {t("icons_picker.apply")}
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

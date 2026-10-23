"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Workspace } from "@prisma/client";
import { baseColors, cn, Color, getColor, isUrl } from "@/shared/utils";
import { ImageFromDevice, Avatar, Button, Icon, IconName, P } from "@/shared/components";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/popover";
import { workspaceIcons } from "@/modules/onboarding/types";
import { trpc } from "@/trpc/client";

interface AvatarPickerProps {
  workspace: Workspace;
  className?: string;
}

/* prettier-ignore */
export const AvatarPicker = ({ workspace }: AvatarPickerProps) => {
  const initialType = isUrl(workspace.logo as string) ? "image" : workspace.logo?.includes(":") ? "icon" : "image";
  const [selected, setSelected] = useState({ type: initialType, value: workspace.logo ?? "app:black" });
  const [open, setOpen] = useState(false);
  const [iconActive, colorActive] = (selected.value ?? "").split(":") ?? [];
  const t = useTranslations("workspaces");

  /* update workspace logo using trpc mutation */
  const { mutateAsync, isPending } = trpc.workspace.update.useMutation();

  const onSelectImageOrIcon = async (logo: string) => {
    const { data, error } = await mutateAsync({ id: workspace.id, logo });
    if (error || !data) {
      console.error(error);
      return;
    }

    /* update current avatar */
    setSelected({ type: initialType, value: logo });
    setOpen(false);
  };

  const onIconSelect = (value: string) => {
    setSelected({ type: "icon", value });
  };

  const onImageSelect = (value: string) => {
    setSelected({ type: "image", value });
  };

  return (
    <div className={cn("relative flex size-8 items-center justify-center rounded-full", selected.type === "icon" && getColor(colorActive as Color))}>
      {selected.type === "image" ? (
        <Avatar url={selected.value} size="md" />
      ) : (
        <Icon name={iconActive as IconName} className="size-5" />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="absolute -right-1 -bottom-2 size-4 shrink-0 rounded-full">
            <Icon name="repeat" className="text-tertiary size-2.5 dark:text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-auto flex-col">
          <div className="flex h-fit w-full flex-col px-1 py-4 md:w-96">
            <div className="flex flex-row items-center gap-3">
                {selected.type === "image" ? (
                  <Avatar url={selected.value} size="sm" />
                ) : (
                  <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", getColor(colorActive as Color))}>
                    <Icon name={iconActive as IconName} className="size-6 shrink-0" />
                  </div>
                )}
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full flex-col">
                  <p className="text-3xs text-foreground">{t("icons_picker.title")}</p>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-2">
                  {workspaceIcons.map((icon) => {
                    const isSelected = iconActive === icon;
                    return (
                      <Button
                        key={`picker-${icon}`}
                        variant="ghost"
                        type="button"
                        size="icon"
                        icon={icon}
                        onClick={() => onIconSelect(`${icon}:${colorActive}`)}
                        className={cn("ring-offset-background size-6 shrink-0", isSelected && `ring-2 ring-offset-1`, isSelected && getColor(colorActive as Color))}/>
                    );
                  })}
                </div>
                <ImageFromDevice imageUrl={onImageSelect} showIcon={false}>
                  <p className="text-4xs text-muted-foreground cursor-pointer">{t("icons_picker.upload_from_device")}</p>
                </ImageFromDevice>
              </div>
            </div>
            <div className="mt-5 flex h-10 w-full flex-col gap-2 px-1">
              <P className="text-3xs">{t("icons_picker.icon_color")}</P>
              <div className="flex w-full flex-row gap-2 items-center">
                {Object.entries(baseColors).map(([colorName]) => {
                  const isSelected = colorActive === colorName;
                  const styles = baseColors[colorName as Color];
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => setSelected({type: "icon", value: `${iconActive}:${colorName}`})}
                      className={cn("ring-offset-background size-4 rounded-full",styles, isSelected && "ring-1 ring-offset-1")}
                    />
                  );
                })}
                <Button size="sm" isLoading={isPending} onClick={() => onSelectImageOrIcon(selected.value)} className="w-fit ml-auto text-3xs">{t("icons_picker.apply")}</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

"use client";
import { useTranslations } from "next-intl";
import { Button, P } from "@/shared/components";
import { baseColors, cn, getColor, type Color } from "@/shared/utils";
import { listIcons } from "@/modules/list/types";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ListIconPicker = ({ value, onChange, className }: IconPickerProps) => {
  const [iconActive, colorActive] = (value || "file:black").split(":");
  const t = useTranslations("lists.icons_picker");

  return (
    <div className={cn("relative mt-3 flex flex-col", className)}>
      <div className="flex w-full flex-col gap-1">
        <p className="text-3xs text-foreground">{t("title")}</p>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {listIcons.map((icon) => {
            const isSelected = iconActive === icon;
            return (
              <Button
                key={`list-icon-${icon}`}
                type="button"
                variant="ghost"
                size="icon"
                icon={icon}
                aria-label={icon}
                onClick={() => onChange(`${icon}:${colorActive || "black"}`)}
                className={cn(
                  "ring-offset-background shrink-0",
                  isSelected && "ring-2 ring-offset-1",
                  isSelected && getColor((colorActive || "black") as Color)
                )}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex h-10 w-full flex-col gap-2 px-0.5">
        <P className="text-3xs">{t("icon_color")}</P>
        <div className="flex w-full flex-row gap-2">
          {Object.entries(baseColors).map(([colorName]) => {
            const isSelected = colorActive === colorName;
            const styles = baseColors[colorName as Color];
            return (
              <button
                key={colorName}
                type="button"
                aria-label={colorName}
                onClick={() => onChange(`${iconActive || "file"}:${colorName}`)}
                className={cn("ring-offset-background size-4 rounded-full", styles, isSelected && "ring-1 ring-offset-1")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

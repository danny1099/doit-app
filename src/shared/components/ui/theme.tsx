"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button, Icon, IconName } from "@/shared/components/ui";
import {
  DropdownMenu,
  MenuRadioGroup,
  MenuContent,
  MenuRadioItem,
  MenuTrigger,
} from "@/shared/components/ui/dropdown";

/* prettier-ignore */
export function ThemeToggle() {
  const t = useTranslations("system.theme")
  const { theme, setTheme } = useTheme();

  const themes = [{
    name: "light",
    icon: "sun",
    text: t("light")
  },{
    name: "dark",
    icon: "moon",
    text: t("dark")
  },{
    name: "system",
    icon: "system",
    text: t("system")
  }]


  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="sun" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icon name="moon" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </MenuTrigger>
      <MenuContent align="end">
        <MenuRadioGroup className="flex flex-col gap-1" value={theme}>
          {themes.map((t) => {
            return (
              <MenuRadioItem place="end" key={t.name} value={t.name} onClick={() => setTheme(t.name)}>
                <Icon name={t.icon as IconName} className="h-4 w-4 mr-2 text-foreground" />
                <p className="text-xs">{t.text}</p>
              </MenuRadioItem>
            );
          })}
        </MenuRadioGroup>
      </MenuContent>
    </DropdownMenu>
  );
}

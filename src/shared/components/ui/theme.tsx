"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button, Icon } from "@/shared/components/ui";
import { DropdownMenu, MenuContent, MenuItem, MenuTrigger } from "@/shared/components/ui/dropdown";

/* prettier-ignore */
export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="sun" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icon name="moon" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </MenuTrigger>
      <MenuContent align="end" className="flex flex-col gap-1">
        <MenuItem onClick={() => setTheme("light")}>
          <Icon name="sun" className="mr-1 h-4 w-4" />
          Light
        </MenuItem>
        <MenuItem onClick={() => setTheme("dark")}>
          <Icon name="moon" className="mr-1 h-4 w-4" />
          Dark
        </MenuItem>
        <MenuItem onClick={() => setTheme("system")}>
          <Icon name="system" className="mr-1 h-4 w-4" />
          System
        </MenuItem>
      </MenuContent>
    </DropdownMenu>
  );
}

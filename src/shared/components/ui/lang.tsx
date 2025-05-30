"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/lib/i18n/core";
import { Button, Icon } from "@/shared/components/ui";
import {
  DropdownMenu,
  MenuRadioGroup,
  MenuContent,
  MenuRadioItem,
  MenuTrigger,
} from "@/shared/components/ui/dropdown";

export const LangToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("system.langs");

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = locale;

    /* define current path */
    const currentPath = segments.join("/");
    router.push(currentPath, { scroll: false });
  };

  const getLocalesStack = () => {
    const locales = routing.locales;
    const langs: { locale: string; name: string }[] = [];

    locales.map((l: Locale) => {
      langs.push({
        locale: l,
        name: t(`${l}`),
      });
    });
    return langs;
  };

  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon" icon="translate">
          <span className="sr-only">Toggle Lang</span>
        </Button>
      </MenuTrigger>
      <MenuContent align="end">
        <MenuRadioGroup value={locale} onValueChange={redirectedPathname}>
          {getLocalesStack().map((lang) => {
            return (
              <MenuRadioItem place="end" indicator="check" key={lang.locale} value={lang.locale}>
                <div className="flex flex-row items-center gap-x-2 text-xs">
                  <img
                    src={`/images/img-flag-${lang.locale}.png`}
                    alt="Flag of locale selected"
                    className="h-4 w-4"
                    loading="lazy"
                  />
                  <span className="flex flex-col justify-center text-2xs text-foreground">{lang.name}</span>
                </div>
              </MenuRadioItem>
            );
          })}
        </MenuRadioGroup>
      </MenuContent>
    </DropdownMenu>
  );
};

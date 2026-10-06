import { getTranslations } from "next-intl/server";
import { Divider, LangToggle, Logo, Navlink, ThemeToggle } from "@/shared/components";
import { getPublicRoute } from "@/routes/utils";

const anchors = [
  { key: "how_it_works", href: "#how-it-works" },
  { key: "features", href: "#features" },
  { key: "pricing", href: "#pricing" },
] as const;

/* prettier-ignore */
export const Navbar = async () => {
  const t = await getTranslations("marketing.nav");
  const toGetStarted = getPublicRoute("get_started");
  const toSignIn = getPublicRoute("sign_in");

  return (
    <header className="bg-background sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 py-2 md:px-24">
        <a href="#top" aria-label="Doit" className="shrink-0">
          <Logo showBrand />
        </a>
        <nav className="hidden items-center gap-1 md:flex rounded-2xl px-1.5 ml-44 py-1">
          {anchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className="text-2xs text-foreground hover:font-semibold hover:text-tertiary rounded-lg px-3 py-2 font-medium transition-colors">
              {t(anchor.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LangToggle />
          <ThemeToggle />
          <Divider type="vertical" className="hidden h-6 md:block" />
          <Navlink href={toGetStarted} icon="arrow_right" className="rounded-full px-4 transition-transform active:scale-[0.97]">
            {t("get_started")}
          </Navlink>
        </div>
      </div>
    </header>
  );
};

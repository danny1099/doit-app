import { LangToggle, Logo, ThemeToggle } from "@/shared/components/ui";

export const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between px-4 py-2 md:px-28">
      <Logo />

      <nav className="inline-flex h-fit w-fit items-center justify-end gap-4 rounded-md px-2 py-1.5">
        <LangToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
};

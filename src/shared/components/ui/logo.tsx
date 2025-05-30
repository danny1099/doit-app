import { cn } from "@/shared/utils";

interface Props {
  className?: string;
}

export const Logo = async ({ className }: Props) => {
  return (
    <picture className="flex flex-row items-center">
      <source srcSet="/images/app-logo_dark.svg" media="(prefers-color-scheme: dark)" />
      <img
        src="/images/app-logo.svg"
        alt="Logo of DoIt Task Manager"
        className={cn("size-9", className)}
        loading="eager"
      />
    </picture>
  );
};

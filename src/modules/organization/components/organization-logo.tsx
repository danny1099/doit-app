import { Icon, type IconName } from "@/shared/components";
import { cn, isUrl } from "@/shared/utils";

interface OrganizationLogoProps {
  url: string;
  className?: string;
}

export const OrganizationLogo = ({ url, className }: OrganizationLogoProps) => {
  const isUrlType = isUrl(url);

  return !isUrlType ? (
    <div
      className={cn(
        "bg-accent text-accent-foreground flex size-7 shrink-0 items-center justify-center rounded-full",
        className
      )}
    >
      <Icon name="building" className="size-4 shrink-0" />
    </div>
  ) : (
    <img src={url} alt="Organization Logo" className={cn("size-7 shrink-0 rounded-md object-cover", className)} />
  );
};

import { Icon, type IconName } from "@/shared/components";
import { cn, isUrl } from "@/shared/utils";

interface OrganizationLogoProps {
  url: string;
  className?: string;
}

export const OrganizationLogo = ({ url, className }: OrganizationLogoProps) => {
  const isUrlType = isUrl("http");
  const [icon, _color] = url.split(":") ?? [];

  return isUrlType ? (
    <div className={cn("bg-accent size-7 shrink-0 rounded-full", className)}>
      <Icon name={icon as IconName} className="size-4 shrink-0" />
    </div>
  ) : (
    <img src={url} alt="Organization Logo" className={cn("size-7 shrink-0 rounded-md object-cover", className)} />
  );
};

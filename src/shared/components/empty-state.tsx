import { cn } from "@/shared/utils";
import { Icon, IconName } from "@/shared/components/icon";
import { Heading } from "@/shared/components/title";
import { P } from "@/shared/components/text";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: IconName;
  ctaButton?: React.ReactNode;
  className?: string;
}

export const EmptyData = ({ title, subtitle, icon = "file", ctaButton, className }: EmptyStateProps) => {
  return (
    <div className={cn("flex size-full flex-col items-center justify-center", className)}>
      <div className="bg-tertiary/20 text-tertiary flex size-14 items-center justify-center rounded-full p-3">
        <Icon name={icon} className="text-tertiary size-8" />
      </div>
      <Heading className="text-foreground mt-3 text-sm">{title}</Heading>
      <P className="max-w-78 text-center text-xs text-pretty">{subtitle}</P>
      {ctaButton && <div className="mt-3">{ctaButton}</div>}
    </div>
  );
};

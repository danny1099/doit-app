import { cn } from "@/shared/utils";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

export const P = ({ children, ...props }: Props) => {
  return (
    <p {...props} className={cn("text-pretty text-xs text-foreground-muted md:text-xs", props.className)}>
      {children}
    </p>
  );
};

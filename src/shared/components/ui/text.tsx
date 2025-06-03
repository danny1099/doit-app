import { cn } from "@/shared/utils";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

export const P = ({ children, ...props }: Props) => {
  return (
    <p {...props} className={cn("text-pretty text-xs text-foreground-muted", props.className)}>
      {children}
    </p>
  );
};

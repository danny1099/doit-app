import { brandFont } from "@/config/fonts";
import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export const Brand = ({ className, ...props }: Props) => {
  return (
    <span
      {...props}
      className={cn("text-foreground flex items-center text-2xl font-semibold", brandFont.className, className)}
    >
      Doit <span className="bg-tertiary mt-2.5 ml-1 inline-block size-1.5 rounded-full" />
    </span>
  );
};

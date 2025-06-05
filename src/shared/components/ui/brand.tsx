import { brandFont } from "@/config/fonts";
import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

/* prettier-ignore */
export const Brand = ({ className,...props }: Props) => {
  return (
    <span {...props} className={cn(`${brandFont.className} text-xl text-foreground`, className)}>
      doit
    </span>
  )
}

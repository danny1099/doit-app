import { type VariantProps } from "class-variance-authority";
import { avatarVariants } from "@/shared/components/variants";
import { cn } from "@/shared/utils";
import { Dot } from "./dot";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src: string;
  isBordered?: boolean;
  withDot?: boolean;
}

/* prettier-ignore */
export const Avatar = ({ src, className, variant, size, ring = "green", isBordered, withDot }: AvatarProps) => {
  return (
    <div className={cn(avatarVariants({ variant, size, ring }), isBordered && "border border-border", className)}>
      <img
        src={src}
        alt="Avatar of user"
        className="aspect-square size-full rounded-full object-cover"
        loading="eager"
      />
      {withDot && <Dot color={ring === "white" ? "green" : ring} />}
    </div>
  );
};

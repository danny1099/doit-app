import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { ctaVariants } from "@/shared/components/variants";
import { Icon, IconName } from "@/shared/components/ui/icon";
import { cn } from "@/shared/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: IconName;
  place?: "start" | "end";
}

/* prettier-ignore */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ( { children, className, variant, size, asChild = false, icon, isLoading = false, place = "end", ...props }, ref ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        ref={ref}
        className={cn(ctaVariants({ variant, size, className }))}
        disabled={isLoading}
      >
        <div className={cn("flex flex-row items-center gap-x-2", place === "start" ? "flex-row" : "flex-row-reverse")}>
          { icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
          { children }
        </div>
      </Comp>
    );
  }
);

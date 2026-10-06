"use client";
import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

/* prettier-ignore */
export const CheckboxCard = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, children, ...props }, ref) => (
      <CheckboxPrimitive.Root ref={ref} {...props} className={cn("peer group ring-input data-[state=checked]:bg-accent/65 data-[state=checked]:ring-tertiary/70 relative rounded-sm data-[state=checked]:ring-1", className)}>
        {children}
        <CheckboxPrimitive.Indicator className="absolute top-2 right-2">
          <div className="h-4 w-4 flex items-center justify-center rounded-full bg-tertiary text-tertiary-foreground">
            {props.checkedIcon || <Icon name="check" className="size-3 shrink-0" />}
          </div>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
  )
);

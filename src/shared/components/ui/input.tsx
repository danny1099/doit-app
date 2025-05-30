"use client";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "@/shared/components/variants";
import { Icon } from "@/shared/components/ui/icon";
import { cn } from "@/shared/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  place?: "left" | "right";
  icon?: string;
  isBordered?: boolean;
  child: React.ReactNode;
}

/* prettier-ignore */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, sizes, type, place = "right", icon, isBordered = false, child, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ variant, sizes }), place === "left" ? "flex-row" : "flex-row-reverse", isBordered && "border border-input", className )}>
        {icon && (
          <div className="flex size-8 items-center justify-center">
              {!child 
                  ? (<Icon name={icon} className="h-4 w-4" />)
                  : (child)
              }
          </div>
        )}
        <input
          {...props}
          ref={ref}
          type={type}
          autoComplete="off"
          className={cn("bg-transparent flex h-10 w-full px-1 text-xs outline-none placeholder:text-foreground-muted autofill:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70")}
        />
      </div>
    );
  }
);

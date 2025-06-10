"use client";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "@/shared/components/variants";
import { cn } from "@/shared/utils";
import { Button } from "./button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  place?: "left" | "right";
  isBordered?: boolean;
}

/* prettier-ignore */
export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, sizes, type, place = "right", isBordered = false,...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={cn(inputVariants({ variant, sizes }), place === "left" ? "flex-row" : "flex-row-reverse", isBordered && "border border-input", className )}>
        <Button icon={showPassword ? "eye_open" : "eye_close"} variant="ghost" size="icon" className="size-6" onClick={() => setShowPassword(!showPassword)} />
        <input
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          className={cn("bg-transparent flex h-10 w-full px-1 text-xs outline-none placeholder:text-foreground-muted autofill:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70")}
        />
      </div>
    );
  }
);

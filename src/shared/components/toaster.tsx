"use client";
import { Toaster as SileoToaster } from "sileo";
import { useSystemTheme } from "@/shared/hooks";

type ToasterProps = React.ComponentProps<typeof SileoToaster>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useSystemTheme();
  const fillColor = theme === "dark" ? "#171717" : "#f3f4f6";

  return (
    <SileoToaster
      {...props}
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      options={{
        duration: 5000,
        roundness: 16,
        fill: fillColor,
        styles: {
          title: "text-xs! font-semibold! text-foreground! dark:text-white/90!",
          description: "text-2xs! font-normal! text-foreground/80! dark:text-muted-foreground!",
        },
      }}
    />
  );
};

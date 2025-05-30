"use client";
import { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ClientProviders({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}

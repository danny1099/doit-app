"use client";
import { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

/* prettier-ignore */
export function ClientProviders({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
     <SessionProvider> {children} </SessionProvider>
    </NextThemesProvider>
  );
}

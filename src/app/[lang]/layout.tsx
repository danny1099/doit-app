import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { globalFont } from "@/config/fonts";
import { ThemeProvider, I18nProvider, ModalProvider, PwaProvider, TrpcProvider } from "@/lib/providers";
import { CookieBanner, Toaster, TooltipProvider } from "@/shared/components";
import "@/globals.css";

interface RootLayoutProps extends Children {
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning className={`${globalFont.className} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Doit" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Doit" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
      </head>
      <body className="flex min-h-full flex-col">
        <I18nProvider>
          <ThemeProvider>
            <TooltipProvider>
              <PwaProvider>
                <TrpcProvider>
                  <ModalProvider>
                    <ViewTransition>{children}</ViewTransition>
                  </ModalProvider>
                </TrpcProvider>
              </PwaProvider>
              <Toaster />
              <CookieBanner />
            </TooltipProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Doit | AI-native task management",
    template: "%s | Doit IA",
  },
  description:
    "DoIt is a task manager that makes organization simple, visual, and powerful. Get started today and take control of your tasks!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Doit IA",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/app-logo.svg",
        href: "/images/app-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/app-logo-dark.svg",
        href: "/images/app-logo-dark.svg",
      },
    ],
    apple: [{ url: "/images/icon-192x192.png", sizes: "192x192", type: "image/png" }],
  },
};

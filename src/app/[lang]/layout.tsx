import type { Metadata } from "next";
import { globalFont } from "@/config/fonts";
import { ServerProviders, ClientProviders } from "@/lib/providers";
import "@/globals.css";

interface RootLayoutProps extends Children {
  params: { lang: string };
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${globalFont.className} antialiased`}>
        <ServerProviders>
          <ClientProviders>{children}</ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "DoIt | Task Manager",
  description:
    "With DoIt, organization becomes simple, visual, and powerful. Perfect for professionals, students, and teams looking for efficiency without sacrificing elegance 🚀 Boost your productivity with DoIt and do more in less time!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/app-logo.svg",
        href: "/images/app-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/app-logo_dark.svg",
        href: "/images/app-logo_dark.svg",
      },
    ],
  },
};

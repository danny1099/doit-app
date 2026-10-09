import { Footer, Navbar } from "@/modules/marketing/components";

export default function LegalLayout({ children }: Children) {
  return (
    <div id="top" className="flex min-h-dvh flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

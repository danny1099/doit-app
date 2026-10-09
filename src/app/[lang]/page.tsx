import { Cta, Features, Footer, Hero, HowItWorks, Navbar, Pricing, TrustStrip } from "@/modules/marketing/components";

export default async function Home() {
  return (
    <div id="top" className="flex min-h-dvh flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Features />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

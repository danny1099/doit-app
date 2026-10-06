import { getTranslations } from "next-intl/server";
import { Hero, Navbar } from "@/modules/marketing/components";

export default async function Home() {
  const t = await getTranslations("marketing");

  return (
    <div id="top" className="flex min-h-dvh flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}

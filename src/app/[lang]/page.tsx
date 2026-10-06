import { getTranslations } from "next-intl/server";
import { Navbar, Title, P } from "@/shared/components";

export default async function Home() {
  const t = await getTranslations("marketing");

  return (
    <div id="top" className="flex min-h-dvh flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
          <Title>{t("title")}</Title>
          <P>{t("description")}</P>
        </section>
      </main>
    </div>
  );
}

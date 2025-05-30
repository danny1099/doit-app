import { getTranslations } from "next-intl/server";
import { P, Loader } from "@/shared/components/ui";

export default async function Loading() {
  const t = await getTranslations("system");

  return (
    <div className="flex h-screen items-center justify-center gap-2 bg-background backdrop-blur-sm">
      <Loader />
      <P>{t("loading")}</P>
    </div>
  );
}

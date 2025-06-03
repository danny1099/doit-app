import { getTranslations } from "next-intl/server";
import { P, Loader } from "@/shared/components/ui";

export default async function Loading() {
  const t = await getTranslations("system");

  return (
    <div className="flex size-full items-center justify-center gap-2 overflow-hidden bg-background backdrop-blur-md">
      <Loader />
      <P>{t("loading")}</P>
    </div>
  );
}

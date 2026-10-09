import { getMessages, getTranslations } from "next-intl/server";
import { LegalPage } from "@/modules/legal/components";

export async function generateMetadata() {
  const t = await getTranslations("legal.cookies");
  return { title: t("title"), description: t("subtitle") };
}

export default async function CookiesPage() {
  const messages = await getMessages();

  return <LegalPage content={messages.legal.cookies} active="cookies" />;
}

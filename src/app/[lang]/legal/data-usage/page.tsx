import { getMessages, getTranslations } from "next-intl/server";
import { LegalPage } from "@/modules/legal/components";

export async function generateMetadata() {
  const t = await getTranslations("legal.data_usage");
  return { title: t("title"), description: t("subtitle") };
}

export default async function DataUsagePage() {
  const messages = await getMessages();

  return <LegalPage content={messages.legal.data_usage} active="data_usage" />;
}

import { getMessages, getTranslations } from "next-intl/server";
import { LegalPage } from "@/modules/legal/components";

export async function generateMetadata() {
  const t = await getTranslations("legal.terms");
  return { title: t("title"), description: t("subtitle") };
}

export default async function TermsPage() {
  const messages = await getMessages();

  return <LegalPage content={messages.legal.terms} active="terms" />;
}

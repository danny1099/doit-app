import { getTranslations } from "next-intl/server";
import { Heading, P } from "@/shared/components/ui";
import { FormRegister } from "@/modules/auth/components";

export default async function GetStarted() {
  const t = await getTranslations("auth.sign_up");

  return (
    <section className="flex size-full flex-col items-center py-5">
      <Heading className="text-center text-xl md:text-3xl">{t("title")}</Heading>
      <P className="text-center">{t("description")}</P>

      <FormRegister />
    </section>
  );
}

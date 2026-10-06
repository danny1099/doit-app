import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { tryCatch } from "@/shared/utils";
import { VerifyEmail, ResetPassword } from "@/modules/auth/emails";
import { env } from "@/config/env";

/* initialize resend client with api key */
export const emailProvider = new Resend(env.RESEND_API_KEY);

interface SendEmailProps {
  email: string;
  token: string;
}

export const sendEmailVerification = async ({ email, token }: SendEmailProps) => {
  const t = await getTranslations("sign_up.verify_email");

  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: env.RESEND_SENDER_NAME,
      to: email,
      subject: t("subject"),
      react: VerifyEmail({ token }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};

export const sendEmailResetPassword = async ({ email, token }: SendEmailProps) => {
  const t = await getTranslations("forgot_password.reset_email");

  const { error } = await tryCatch(
    emailProvider.emails.send({
      from: env.RESEND_SENDER_NAME,
      to: email,
      subject: t("subject"),
      react: ResetPassword({ token }),
    })
  );

  if (error) {
    console.log("Error sending email: ", error);
  }
};

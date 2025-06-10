"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPrivateRoute } from "@/config/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input, Button, InputPassword } from "@/shared/components/ui";
import { AuthSchema, authSchema } from "@/modules/auth/schema";
import { FormAuthOauth } from "./form-oauth";
import { api } from "@/trpc/client";

export const FormRegister = () => {
  const t = useTranslations("auth");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const redirectTo = getPrivateRoute("overview");
  const apiServices = api.auth.signUpWithEmail.useMutation();

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* use form state to get errors */
  const { formState } = form;

  const onSubmit = async (data: AuthSchema) => {
    startTransition(async () => {
      await apiServices
        .mutateAsync(data)
        .then(async (res) => {
          await signIn("credentials", {
            email: res?.email,
            password: res?.password,
            redirect: false,
          }).then(() => router.push(redirectTo));
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <article className="mt-6 flex size-full flex-col px-4 md:w-1/3">
      <FormAuthOauth />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex size-full flex-col gap-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("form.email_placeholder")}
                      value={field.value as string}
                      variant="outline"
                      isBordered
                      icon="email"
                      className="w-full text-foreground"
                    />
                  </FormControl>
                  {formState.errors["email"] && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.password")}</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      type="text"
                      placeholder={t("form.password_placeholder")}
                      value={field.value as string}
                      variant="outline"
                      isBordered
                      className="w-full text-foreground"
                    />
                  </FormControl>
                  {formState.errors["password"] && <FormMessage />}
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full" icon="arrow_right" isLoading={isPending}>
              {t("form.submit")}
            </Button>
          </div>
        </form>
      </Form>
    </article>
  );
};

"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/modules/auth/hooks";
import { fallbackAvatar } from "@/shared/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input } from "@/shared/components";
import { infoUserSchema, type InfoUserSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { AvatarPicker } from "@/modules/onboarding/components";

export const FormInfo = () => {
  const { user, isPending } = useAuth();
  const store = useOnboardingStore((state) => state);
  const t = useTranslations("onboarding");

  const form = useForm<InfoUserSchema>({
    resolver: zodResolver(infoUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.image || "",
    },
  });

  useEffect(() => {
    if (store.name) form.setValue("name", store.name);
    if (store.avatar) form.setValue("avatar", store.avatar);
  }, []);

  useEffect(() => {
    if (user) {
      const userName = user.name || "";
      const userAvatar = user.image || fallbackAvatar(user?.email as string);
      const userEmail = user.email || "";

      store.setName(userName);
      store.setAvatar(userAvatar);

      if (!form.getValues("name")) form.setValue("name", userName);
      if (!form.getValues("email")) form.setValue("email", userEmail);
      if (!form.getValues("avatar")) form.setValue("avatar", userAvatar);
    }
  }, [user, isPending, form]);

  const onSubmit = async (data: InfoUserSchema) => {
    store.setName(data.name);
    store.setAvatar(data.avatar as string);
    store.nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex h-full flex-col max-sm:px-4 md:w-110">
        <div className="mt-5 flex h-fit w-full flex-col">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AvatarPicker url={field.value as string} onImageSelect={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-3 flex h-fit w-full flex-col gap-2 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("form.name.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {form.formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled
                      placeholder={t("form.email.placeholder")}
                      value={field.value as string}
                      icon="email"
                      variant="outline"
                      className="text-foreground w-full"
                    />
                  </FormControl>
                  {form.formState.errors["email"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
        </div>
        <footer className="mt-10 flex w-full flex-col gap-2">
          <Button type="submit" className="mt-auto w-full" icon="arrow_right">
            {t("form.continue")}
          </Button>
          <span className="text-3xs text-muted-foreground w-full text-center">{t("steps.account.disclaimer")}</span>
        </footer>
      </form>
    </Form>
  );
};

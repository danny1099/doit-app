"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/shared/hooks";
import { useAuth } from "@/modules/auth/hooks";
import { cn, Color, fallbackAvatar, getColor, isUrl } from "@/shared/utils";
import { Avatar, Button, Icon, IconName, P, Form } from "@/shared/components";
import { onboardingSchema, type OnboardingSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { trpc } from "@/trpc/client";
import { getPrivateRoute } from "@/routes/utils";

/* prettier-ignore */
export const FormFinish = () => {
  const store = useOnboardingStore((state) => state);
  const toast = useToast();
  const router = useRouter();
  const t = useTranslations("onboarding");
  const { user } = useAuth();

  /* use api services to set onboarding steps */
  const { mutateAsync } = trpc.onboarding.register.useMutation();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: store.name,
      email: user?.email,
      avatar: store.avatar,
      workspace: store.workspace,
      logo: store.logoUrl,
    },
  });

  useEffect(() => {
    if (store.name) form.setValue("name", store.name);
    if (store.avatar) form.setValue("avatar", store.avatar);
    if (store.workspace) form.setValue("workspace", store.workspace);
    if (store.logoUrl) form.setValue("logo", store.logoUrl);
  }, []);

  const onSubmit = async (values: OnboardingSchema) => {
    /* call api to register onboarding */
    const { data, status, message , errorMessage} = await mutateAsync({
      name: values.name,
      email: user?.email as string,
      avatar: values.avatar,
      workspace: values.workspace,
      logo: values.logo,
    });

    if (!data || status === "error") {
      toast({ message: message as I18nMessage, type: "error", details: errorMessage as string});
      return;
    }

    /* reset store state and navigate to overview */
    store.reset();
    toast({ message: message as I18nMessage, type: "success" });

    /* navigate to private route overview */
    const redirectTo = getPrivateRoute("overview");
    router.push(redirectTo, { scroll: false });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-1 flex h-full flex-col max-sm:px-4 md:w-110">
        <div className="mt-5 flex h-full w-full flex-col">
          <div className="border-border/80 flex h-fit pb-5 w-full flex-col gap-3 rounded-md border px-4 py-2">
            <div className="text-2xs border-border/80 flex flex-row items-center gap-2 border-b py-4 last:border-0">
              <Avatar url={store.avatar || fallbackAvatar(store.name)} size="sm" />
              <span className="text-2xs flex w-full flex-col">
                <p className="text-3xs text-muted-foreground font-medium">{t("steps.finish.resume.name")}</p>
                <P className="text-foreground -mt-0.5">{store.name}</P>
              </span>
            </div>
            <div className="text-2xs border-border/80 flex flex-row items-center gap-2 border-b py-3 last:border-0">
              {isUrl(store.logoUrl as string) ? (
                <img src={store.logoUrl} alt={store.workspace} className="size-7 shrink-0 rounded-md object-cover" />
              ) : (
                <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-full", getColor(store.logoUrl?.split(":")[1] as Color))}>
                  <Icon name={store.logoUrl?.split(":")[0] as IconName} />
                </div>
              )}
              <span className="text-2xs flex w-full flex-col">
                <p className="text-3xs text-muted-foreground font-medium">{t("steps.finish.resume.workspace")}</p>
                <P className="text-foreground -mt-0.5">{store.workspace}</P>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center  gap-1.5 px-6 py-3 text-center">
            <p className="text-4xs w-74 text-center leading-relaxed text-pretty text-muted-foreground">
              {t("steps.finish.resume.disclaimer")}
            </p>
          </div>
        </div>
        
        <footer className="mt-2 flex w-full flex-col gap-2">
          <Button type="submit" className="w-full" icon="arrow_right">
            {t("form.continue")}
          </Button>
          <Button type="reset" variant="outline" onClick={store.prevStep} className="w-full">
            {t("form.previous")}
          </Button>
        </footer>
      </form>
    </Form>
  );
};

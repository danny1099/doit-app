"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input } from "@/shared/components";
import { workspaceSchema, type WorkspaceSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { IconPicker } from "@/modules/onboarding/components";

export const FormWorkspace = () => {
  const store = useOnboardingStore((state) => state);
  const t = useTranslations("onboarding");

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspace: store.workspace || "",
      logo: store.logoUrl || "app:black",
    },
  });

  const onSubmit = async (data: WorkspaceSchema) => {
    store.setWorkspace(data.workspace);
    store.setLogoUrl(data.logo || "app:black");
    store.nextStep();
  };

  useEffect(() => {
    if (store.workspace) form.setValue("workspace", store.workspace);
    if (store.logoUrl) form.setValue("logo", store.logoUrl);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex h-full flex-col max-sm:px-4 md:w-110">
        <div className="flex h-fit w-full flex-col gap-2">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconPicker value={field.value as string} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-5 h-fit w-full">
            <FormField
              control={form.control}
              name="workspace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.workspace.label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("form.workspace.placeholder")}
                      value={field.value as string}
                      variant="outline"
                      className="text-foreground w-full"
                      icon="building"
                    />
                  </FormControl>
                  {form.formState.errors["workspace"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
        </div>
        <footer className="mt-10 flex w-full flex-col gap-2">
          <Button type="submit" className="w-full" icon="arrow_right" disabled={!form.formState.isValid}>
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

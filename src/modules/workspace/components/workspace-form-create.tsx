"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal, useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Button, Input } from "@/shared/components";
import { workspaceSchema, type WorkspaceSchema } from "@/modules/workspace/schema";
import { IconPicker } from "@/modules/workspace/components";
import { trpc, useUtils } from "@/trpc/client";

export const WorkspaceFormCreate = () => {
  const toast = useToast();
  const t = useTranslations("workspaces");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.workspace.create.useMutation({
    onSuccess: () => utils.workspace.getAll.invalidate(),
  });

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "app:black",
    },
  });

  const onSubmit = async (values: WorkspaceSchema) => {
    const { error, message } = await mutateAsync(values);

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    /* close the modal and show a success message */
    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col max-sm:px-4 md:w-110">
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
                      icon="building"
                    />
                  </FormControl>
                  {form.formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
        </div>
        <footer className="mt-10 flex w-full flex-col gap-2">
          <Button type="submit" className="w-full" icon="arrow_right" disabled={!form.formState.isValid}>
            {t("form.submit-button")}
          </Button>
          <Button type="reset" variant="outline" className="w-full">
            {t("form.cancel-button")}
          </Button>
        </footer>
      </form>
    </Form>
  );
};

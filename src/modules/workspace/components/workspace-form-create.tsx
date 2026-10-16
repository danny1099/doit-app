"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { fallbackAvatar } from "@/shared/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { Avatar, Button, ImageFromDevice, Input } from "@/shared/components";
import { workspaceSchema, type WorkspaceSchema } from "@/modules/workspace/schema";
import { trpc, useUtils } from "@/trpc/client";

export const WorkspaceFormCreate = () => {
  const toast = useToast();
  const t = useTranslations("workspaces");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.workspace.create.useMutation({
    onSuccess: () => utils.workspace.getAllWorkspaces.invalidate(),
  });

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
    },
  });

  const { formState } = form;

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
    <div className="flex h-auto w-full flex-col justify-center md:w-120">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-auto w-full flex-row items-center gap-3 py-2">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <ImageFromDevice imageUrl={field.onChange}>
                      <Avatar url={field.value} size="md" defaultImage={fallbackAvatar("unknown")} />
                    </ImageFromDevice>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
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
                  {formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="save" isLoading={formState.isSubmitting} className="w-full md:w-auto">
              {t("form.submit-button")}
            </Button>
            <Button type="button" variant="outline" onClick={closeModal} className="w-full md:w-32">
              {t("form.cancel-button")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

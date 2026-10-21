"use client";
import type { Organization } from "@prisma/client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { fallbackAvatar } from "@/shared/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Avatar, Button, ImageFromDevice, Input } from "@/shared/components";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { organizationSchemaUpdate, type OrganizationSchemaUpdate } from "@/modules/organization/schema";
import { trpc, useUtils } from "@/trpc/client";

export const OrganizationFormEdit = (organization: Organization) => {
  const toast = useToast();
  const t = useTranslations("organization");
  const { closeModal } = useModal();

  /* use trpc api services and utils to request and refresh data */
  const utils = useUtils();
  const { mutateAsync } = trpc.organization.update.useMutation({
    onSuccess: () => utils.organization.getAll.invalidate(),
  });

  const form = useForm<OrganizationSchemaUpdate>({
    resolver: zodResolver(organizationSchemaUpdate),
    defaultValues: {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      logo: organization.logo || "",
    },
  });

  const onSubmit = async (values: OrganizationSchemaUpdate) => {
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
                  {form.formState.errors["name"] && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 flex w-full flex-col gap-2 md:flex-row-reverse">
            <Button type="submit" icon="save" isLoading={form.formState.isSubmitting} className="w-full md:w-auto">
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

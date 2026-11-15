"use client";
import { useForm } from "react-hook-form";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import type { List, UserMode } from "@prisma/client";
import { getPrivateRoute } from "@/routes/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components";
import { ListIconPicker, ModePicker } from "@/modules/list/components";
import { listSchema, type ListSchema } from "@/modules/list/schema";
import { storeActiveListId } from "@/modules/list/helpers";
import { trpc, useUtils } from "@/trpc/client";

interface ListFormProps {
  list?: List;
}

/* prettier-ignore */
export const ListForm = ({ list }: ListFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const { organization } = useParams<{ organization: string }>();
  const { closeModal } = useModal();
  const t = useTranslations("lists");
  const isEditing = Boolean(list);

  const utils = useUtils();
  const createMutation = trpc.list.create.useMutation({ onSuccess: () => utils.list.getAll.invalidate() });
  const updateMutation = trpc.list.update.useMutation({ onSuccess: () => utils.list.getAll.invalidate() });

  const form = useForm<ListSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: list?.name || "",
      icon: list?.icon || "file:black",
      mode: (list?.mode || "PERSONAL") as UserMode,
    },
  });

  const onSubmit = async (values: ListSchema) => {
    const result = isEditing
      ? await updateMutation.mutateAsync({ id: list?.id as string, ...values })
      : await createMutation.mutateAsync(values);

    const { data, error, message } = result;

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    if (!isEditing && data) {
      storeActiveListId(data.id);
      router.push(getPrivateRoute("task", { organization, list: data.id }), { scroll: false });
    }

    if (isEditing) router.refresh();

    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col max-sm:px-4 md:w-110">
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ListIconPicker value={field.value as string} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-5 flex h-fit w-full flex-col gap-3">
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
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.mode.label")}</FormLabel>
                  <FormControl>
                    <ModePicker
                      value={field.value as string}
                      onChange={field.onChange}
                    />
                  </FormControl>
                {form.formState.errors["mode"] && <FormMessage />}
              </FormItem>
            )}
          />
        </div>
        <footer className="mt-10 flex w-full flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            icon="save"
            isLoading={createMutation.isPending || updateMutation.isPending}
            disabled={!form.formState.isValid}
          >
            {isEditing ? t("form.edit-submit-button") : t("form.create-submit-button")}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={closeModal}>
            {t("form.cancel-button")}
          </Button>
        </footer>
      </form>
    </Form>
  );
};

"use client";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { I18nMessage, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal, useToast } from "@/shared/hooks";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/shared/components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select";
import { taskSchema, type TaskSchema } from "@/modules/task/schema";
import { trpc, useUtils } from "@/trpc/client";

/* prettier-ignore */
export const TaskFormCreate = () => {
  const toast = useToast();
  const t = useTranslations("tasks");
  const { closeModal } = useModal();
  const { list } = useParams<{ list: string }>();
  
  const utils = useUtils();
  const { mutateAsync, isPending } = trpc.task.create.useMutation({
    onSuccess: () => utils.task.getByList.invalidate({ param: list }),
  });

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: "MEDIUM",
      type: "DIGITAL",
    },
  });

  const priorityOptions = [
    { value: "LOW", label: t("priority.low") },
    { value: "MEDIUM", label: t("priority.medium") },
    { value: "HIGH", label: t("priority.high") },
    { value: "URGENT", label: t("priority.urgent") },
  ] as const;

  const onSubmit = async (values: TaskSchema) => {
    const { error, message } = await mutateAsync({ ...values, listId: list });

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    closeModal();
    toast({ message: message as I18nMessage, type: "success" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col max-sm:px-4 md:w-110">
        <div className="bg-accent mb-4 flex flex-row items-center gap-2 rounded-lg px-3 py-2">
          <span className="text-muted-foreground text-3xs">{t("form.list.label")}</span>
          <span className="text-foreground text-2xs font-medium">{list}</span>
        </div>
        <div className="flex h-fit w-full flex-col gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.title.label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t("form.title.placeholder")}
                    value={field.value as string}
                    variant="outline"
                    className="text-foreground w-full"
                    icon="file"
                  />
                </FormControl>
                {form.formState.errors["title"] && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.content.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value as string}
                    placeholder={t("form.content.placeholder")}
                    className="min-h-24 resize-none"
                  />
                </FormControl>
                {form.formState.errors["content"] && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.priority.label")}</FormLabel>
                <Select value={field.value as string} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("form.priority.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorityOptions.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors["priority"] && <FormMessage />}
              </FormItem>
            )}
          />
        </div>
        <footer className="mt-10 flex w-full flex-col gap-2">
          <Button type="submit" className="w-full" icon="save" isLoading={isPending} disabled={!form.formState.isValid}>
            {t("form.submit-button")}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={closeModal}>
            {t("form.cancel-button")}
          </Button>
        </footer>
      </form>
    </Form>
  );
};

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import type { List } from "@prisma/client";
import { useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, FormMessage, Input, Button, Heading } from "@/shared/components";
import { listSchemaUpdate, type ListSchemaUpdate } from "@/modules/list/schema";
import { trpc, useUtils } from "@/trpc/client";

interface FormNameProps {
  list: List;
}

/* prettier-ignore */
export const FormName = ({ list }: FormNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations("lists");
  const toast = useToast();

  /* use trpc api services to update the workspace name */
  const utils = useUtils();
  const { mutateAsync } = trpc.list.update.useMutation({ onSuccess: () => utils.list.getAll.invalidate() });

  const form = useForm<ListSchemaUpdate>({
    resolver: zodResolver(listSchemaUpdate),
    defaultValues: {
      id: list.id,
      name: list.name,
    },
  });

  const { formState } = form;
  const debouncedSubmit = useDebounceCallback(() => form.handleSubmit(onSubmit)(), 1000);

  const onSubmit = async (values: ListSchemaUpdate) => {
    setIsEditing(false);
    const { error, message } = await mutateAsync({ ...values });

    if (error && message) {
      toast({ message, type: "error" });
      setIsEditing(true);
      return;
    }
  };

  return (
    <div className="flex h-auto w-full flex-row items-center" onKeyDown={(e) => {if (e.key === "Escape") setIsEditing(false)}}>
      {!isEditing ? (
        <span className="group hover:text-tertiary flex flex-row items-center gap-2">
          <Heading className="text-xl" onDoubleClick={() => setIsEditing(true)}>
            {form.watch("name")}
          </Heading>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            icon="edit"
            className="text-background hover:bg-accent group-hover:text-tertiary size-5 shrink-0 [&>svg]:size-3"
            onClick={() => setIsEditing(true)}
          />
        </span>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        variant="ghost"
                        sizes="sm"
                        placeholder={t("form.name.placeholder")}
                        value={field.value as string}
                        className="text-foreground focus:bg-accent hover:bg-accent w-fit px-0 text-xl scroll-m-20 tracking-tight text-balance first:mt-0 font-semibold"
                        onBlur={() => {
                          field.onBlur();
                          debouncedSubmit.cancel();
                          form.handleSubmit(onSubmit)();
                        }}
                      />
                    </FormControl>
                    {formState.errors["name"] && <FormMessage className="ml-2" />}
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    size="icon"
                    icon="check"
                    className="size-5 shrink-0 [&>svg]:size-3"
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

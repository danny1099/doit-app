"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Workspace } from "@prisma/client";
import { useToast } from "@/shared/hooks";
import { slugSanitize } from "@/shared/utils";
import { Form, FormControl, FormField, FormItem, FormMessage, Input, Title, Button } from "@/shared/components";
import { workspaceSchemaUpdate, type WorkspaceSchemaUpdate } from "@/modules/workspace/schema";
import { trpc } from "@/trpc/client";

interface FormNameProps {
  workspace: Workspace;
}

/* prettier-ignore */
export const FormName = ({ workspace }: FormNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations("workspaces");
  const toast = useToast();

  /* use trpc api services to update the workspace name */
  const { mutateAsync } = trpc.workspace.update.useMutation();

  const form = useForm<WorkspaceSchemaUpdate>({
    resolver: zodResolver(workspaceSchemaUpdate),
    defaultValues: {
      id: workspace.id,
      name: workspace.name,
    },
  });

  const { formState } = form;
  const debouncedSubmit = useDebounceCallback(() => form.handleSubmit(onSubmit)(), 1000);

  const onSubmit = async (values: WorkspaceSchemaUpdate) => {
    setIsEditing(false);
    const { data ,error, message } = await mutateAsync({
      ...values,
      slug: slugSanitize(values.name as string),
    });

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
          <Title className="text-xl ml-1.5" onDoubleClick={() => setIsEditing(true)}>
            {form.watch("name")}
          </Title>
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
                    className="size-5 shrink-0 [&>svg]:size-3.5"
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

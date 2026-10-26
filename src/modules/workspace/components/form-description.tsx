"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Workspace } from "@prisma/client";
import { useToast } from "@/shared/hooks";
import { Form, FormControl, FormField, FormItem, Textarea, P, Button } from "@/shared/components";
import { workspaceSchemaUpdate, type WorkspaceSchemaUpdate } from "@/modules/workspace/schema";
import { trpc } from "@/trpc/client";

interface FormDescriptionProps {
  workspace: Workspace;
}

/* prettier-ignore */
export const FormDescription = ({ workspace }: FormDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations("workspaces");
  const toast = useToast();

  /* use trpc api services to update the workspace description */
  const { mutateAsync } = trpc.workspace.update.useMutation();

  const form = useForm<WorkspaceSchemaUpdate>({
    resolver: zodResolver(workspaceSchemaUpdate),
    defaultValues: {
      id: workspace.id,
      description: workspace.description || "",
    },
  });

  const debouncedSubmit = useDebounceCallback(() => form.handleSubmit(onSubmit)(), 1000);

  const onSubmit = async (values: WorkspaceSchemaUpdate) => {
    setIsEditing(false);
    const { error, message } = await mutateAsync(values);

    if (error && message) {
      toast({ message, type: "error" });
      setIsEditing(true);
      return;
    }
  };

  return (
    <div className="flex h-auto w-fit flex-row items-center" onKeyDown={(e) => {if (e.key === "Escape") setIsEditing(false)}}>
      {!isEditing ? (
        <span className="group hover:text-tertiary -mt-1 ml-1.5 flex flex-row items-center gap-2" onDoubleClick={() => setIsEditing(true)}>
          <P className="text-2xs line-clamp-2 text-pretty">{form.watch("description") || t("no_description")}</P>
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
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("form.description.placeholder")}
                      value={field.value as string}
                      className="bg-accent text-wrap text-accent-foreground resize-none focus:bg-accent hover:bg-accent min-h-20 h-auto w-80 p-1.5 text-xs"
                      onBlur={() => {
                        field.onBlur();
                        debouncedSubmit.cancel();
                        form.handleSubmit(onSubmit)();
                      }}
                    />
                  </FormControl>
                  <div className="mt-1 flex w-full flex-row items-center justify-end gap-2">
                    <Button type="reset" variant="outline" size="sm" className="text-3xs size-fit py-0.5" onClick={() => setIsEditing(false)}>
                      {t("form.cancel-button")}
                    </Button>
                    <Button type="submit" size="sm" className="text-3xs size-fit py-0.5">
                      {t("form.submit-button")}
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

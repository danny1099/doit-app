"use client";
import React from "react";
import { Task, type TaskPriority } from "@prisma/client";
import { cn } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { CustomCheckbox, Icon } from "@/shared/components";
import { trpc, useUtils } from "@/trpc/client";

interface CheckPriorityProps extends React.ComponentProps<typeof CustomCheckbox> {
  className?: string;
}

interface PriorityToggleProps {
  task: Partial<Task>;
}

/* prettier-ignore */
export const PriorityCheckbox = ({ className, ...props }: CheckPriorityProps) => {
  return (
    <CustomCheckbox
      {...props}
      icon={<Icon name="flag" className="size-3.5 shrink-0" />}
      checkedIcon={<Icon name="flag_fill" className="size-3.5 shrink-0 text-red-500" />}
      className={cn("hover:bg-secondary ring-offset-background focus-visible:ring-ring flex size-6 items-center justify-center rounded-sm p-0.5 transition-colors focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-80", className )}
    />
  );
};

export const PriorityToggle = ({ task }: PriorityToggleProps) => {
  const toast = useToast();
  const utils = useUtils();

  const { mutateAsync } = trpc.task.update.useMutation({
    onSuccess: () => utils.task.getByList.invalidate({ param: task.listId }),
  });

  const handleChangePriority = async (priority: TaskPriority) => {
    const { error, message } = await mutateAsync({ priority, id: task.id! });

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }
  };

  return (
    <PriorityCheckbox
      checked={task.priority === "URGENT"}
      onCheckedChange={(checked) => {
        return handleChangePriority(checked ? "URGENT" : "LOW");
      }}
    />
  );
};

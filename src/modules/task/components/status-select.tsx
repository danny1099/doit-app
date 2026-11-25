"use client";
import { useTranslations } from "next-intl";
import type { Task, TaskStatus } from "@prisma/client";
import { cn } from "@/shared/utils";
import { useToast } from "@/shared/hooks";
import { Badge, Button, Icon, Popover, PopoverContent, PopoverTrigger, Divider } from "@/shared/components";
import { taskStatuses, TaskStatusGroups } from "@/modules/task/types";
import { trpc, useUtils } from "@/trpc/client";

interface StatusFieldProps {
  task: Partial<Task>;
  className?: string;
}

const statusesList: Record<TaskStatusGroups, TaskStatus[]> = {
  pending: ["TODO"],
  in_progress: ["IN_PROGRESS", "BLOCKED"],
  completed: ["DONE", "ARCHIVED"],
};

export const StatusButton = ({ task, className }: StatusFieldProps) => {
  const toast = useToast();
  const utils = useUtils();
  const t = useTranslations("tasks");
  const configField = taskStatuses[task.status!];

  const { mutateAsync } = trpc.task.update.useMutation({
    onSuccess: () => utils.task.getByList.invalidate({ param: task.listId }),
  });

  const handleChangeStatus = async (status: TaskStatus) => {
    const { error, message } = await mutateAsync({ status, id: task.id! });

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge variant="ghost" className={cn("w-fit shrink-0 cursor-pointer px-2 py-1", configField.className, className)}>
          <Icon name={configField.icon} className="size-3.5 shrink-0" />
          {t(`status.${configField.label}`)}
        </Badge>
      </PopoverTrigger>

      <PopoverContent align="end" className="flex w-fit flex-col">
        {(Object.entries(statusesList) as [TaskStatusGroups, TaskStatus[]][]).map(([group, statuses], idx, arr) => (
          <div key={group} className="flex flex-col gap-1">
            <span className="text-muted-foreground text-3xs -ml-1.5 px-2">{t(`status_groups.${group}`)}</span>
            {statuses.map((status) => {
              const configStatus = taskStatuses[status];
              return (
                <Button
                  key={`sbk-${status}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleChangeStatus(status)}
                  className={cn("w-32 cursor-pointer justify-baseline gap-2 outline-none", configStatus.className)}
                >
                  <Icon name={configStatus.icon} className="size-3.5 shrink-0" />
                  {t(`status.${configStatus.label}`)}
                </Button>
              );
            })}
            {idx < arr.length - 1 && <Divider type="horizontal" className="my-1 w-full" />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

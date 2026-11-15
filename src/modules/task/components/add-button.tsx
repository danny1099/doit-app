"use client";
import { useTranslations } from "next-intl";
import type { List } from "@prisma/client";
import { cn } from "@/shared/utils";
import { useModal } from "@/shared/hooks";
import { Button } from "@/shared/components";
import { TaskFormCreate } from "@/modules/task/components";

interface TaskProps {
  list: List;
  className?: string;
}

export const NewTaskButton = ({ className, list }: TaskProps) => {
  const { openModal } = useModal();
  const t = useTranslations("tasks");

  return (
    <Button
      icon="add"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <TaskFormCreate list={list} />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};

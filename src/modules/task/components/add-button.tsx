"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { useModal } from "@/shared/hooks";
import { Button } from "@/shared/components";
import { TaskFormCreate } from "@/modules/task/components";

interface TaskProps {
  className?: string;
}

export const NewTaskButton = ({ className }: TaskProps) => {
  const { openModal } = useModal();
  const t = useTranslations("tasks");

  return (
    <Button
      icon="add"
      size="sm"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <TaskFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};

"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { ListForm } from "@/modules/list/components/list-form";

interface Props {
  className?: string;
}

export const NewListButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("lists");

  return (
    <Button
      icon="add"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <ListForm />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};

export const WidgetListButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("lists");

  return (
    <Button
      icon="add"
      size="xs"
      variant="ghost"
      className={cn("text-2xs hover:text-foreground size-4", className)}
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <ListForm />,
        });
      }}
    />
  );
};

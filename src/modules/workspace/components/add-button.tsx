"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { WorkspaceFormCreate } from "@/modules/workspace/components";

interface Props {
  className?: string;
}

export const NewWorkspaceButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("workspaces");

  return (
    <Button
      icon="add"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <WorkspaceFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};

export const WiggetWorkspaceButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("workspaces");

  return (
    <Button
      icon="add"
      size="sm"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <WorkspaceFormCreate />,
        });
      }}
      className={cn("text-2xs mt-3 rounded-xl", className)}
    >
      {t("add-button")}
    </Button>
  );
};

"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks";
import { OrganizationFormCreate } from "@/modules/organization/components";

interface Props {
  className?: string;
}

export const NewOrganizationButton = ({ className }: Props) => {
  const { openModal } = useModal();
  const t = useTranslations("organization");

  return (
    <Button
      icon="add"
      onClick={() => {
        openModal({
          title: t("modal.title"),
          description: t("modal.subtitle"),
          content: <OrganizationFormCreate />,
        });
      }}
      className={cn("text-xs", className)}
    >
      {t("add-button")}
    </Button>
  );
};

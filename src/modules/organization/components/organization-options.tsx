"use client";
import type { Organization } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { cn } from "@/shared/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Divider, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { OrganizationFormDelete } from "@/modules/organization/components";
import { trpc } from "@/trpc/client";

export function ButtonActions(organization: Organization) {
  const { openModal } = useModal();
  const t = useTranslations("organization");
  const router = useRouter();
  const toast = useToast();

  /* use trpc api services and utils to request and refresh data */
  const { mutateAsync } = trpc.organization.makeAsDefault.useMutation();

  const setOrganizationAsDefault = async () => {
    const { data, error, message } = await mutateAsync({ param: organization.id });

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    const redirectTo = getPrivateRoute("organization", { slug: data?.slug as string });
    router.push(redirectTo, { scroll: false });
  };

  const items = [
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: () => {
        openModal({
          content: <OrganizationFormDelete {...organization} />,
        });
      },
    },
    {
      name: "set_as_default",
      label: t("options.set_as_default"),
      icon: "set_active",
      onClick: setOrganizationAsDefault,
    },
    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: () => {
        openModal({
          content: <OrganizationFormDelete {...organization} />,
        });
      },
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button icon="options" variant="ghost" size="icon" className="hover:bg-secondary shrink-0" />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-44 flex-col gap-1">
        {items.map(({ name, icon, label, onClick }) => {
          return (
            <div key={name} className="flex flex-col">
              {name === "delete" && <Divider type="horizontal" className="my-1.5 w-full" />}
              <Button
                icon={icon as IconName}
                placement="start"
                variant={name === "delete" ? "destructive" : "item"}
                size="lg"
                onClick={onClick}
                className={cn("text-2xs w-auto justify-start gap-2 font-normal [&_svg]:size-4")}
              >
                {label}
              </Button>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

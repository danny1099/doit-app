"use client";
import type { Workspace } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { cn } from "@/shared/utils";
import { useModal, useToast } from "@/shared/hooks";
import { Button, Divider, IconName, Popover, PopoverContent, PopoverTrigger } from "@/shared/components";
import { WorkspaceFormDelete } from "@/modules/workspace/components";
import { trpc } from "@/trpc/client";

export function ButtonActions(workspace: Workspace) {
  const { openModal } = useModal();
  const t = useTranslations("workspaces");
  const router = useRouter();
  const toast = useToast();

  /* use trpc api services and utils to request and refresh data */
  const { mutateAsync } = trpc.workspace.setWorkspaceAsDefault.useMutation();

  const getIntoWorkspace = () => {
    const goToWorkspace = getPrivateRoute("workspace", { slug: workspace.slug });
    router.push(goToWorkspace, { scroll: false });
  };

  const setWorkspaceAsDefault = async () => {
    const { data, error, message } = await mutateAsync({ param: workspace.id });

    if (error && message) {
      toast({ message, type: "error" });
      return;
    }

    const goToWorkspace = getPrivateRoute("workspace", { slug: data?.slug as string });
    router.push(goToWorkspace, { scroll: false });
  };

  const items = [
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: () => getIntoWorkspace(),
    },
    {
      name: "set_as_default",
      label: t("options.set_as_default"),
      icon: "set_active",
      onClick: setWorkspaceAsDefault,
    },
    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: () => {
        openModal({
          content: <WorkspaceFormDelete {...workspace} />,
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

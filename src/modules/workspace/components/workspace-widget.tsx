"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { Icon, P } from "@/shared/components";
import { WidgetWorkspaceButton, WorkspacesWidgetSkeleton } from "@/modules/workspace/components";
import { trpc } from "@/trpc/client";

export const WorkspacesWidget = () => {
  const [mounted, setMounted] = useState(false);
  const { data: workspaces } = trpc.workspace.getAll.useQuery();
  const allWorkspaces = workspaces?.data || [];
  const t = useTranslations("workspaces");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <WorkspacesWidgetSkeleton />;

  return (
    <div className="bg-accent mt-10 flex max-h-48 flex-col rounded-lg px-2 py-3">
      <P className="text-foreground text-3xs ml-1 font-medium">{t("title")}</P>
      <span className="text-4xs text-muted-foreground ml-1">{t("wigget")}</span>
      <ul className="border-border mx-4 mt-3 flex max-h-16 min-h-2 min-w-0.5 translate-x-px flex-col gap-1 border-l px-2 py-0.5">
        {allWorkspaces.map(({ id, name, slug, organizationId }) => {
          const pathWorkspace = getPrivateRoute("workspace", { slug, organization: organizationId });
          return (
            <Link key={id} href={pathWorkspace}>
              <li className="group hover:text-tertiary inline-flex h-7 w-full items-center gap-1.5 px-2">
                <Icon name="square" className="mb-0.5 size-1.5 shrink-0" />
                <span className="text-2xs">{name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
      <WidgetWorkspaceButton />
    </div>
  );
};

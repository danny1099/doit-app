"use client";
import Link from "next/link";
import moment from "moment";
import type { Workspace } from "@prisma/client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { useTableSelection } from "@/shared/hooks";
import { cn, defineColumns, getColor, isUrl, type Color } from "@/shared/utils";
import { AnimatedContent, SearchBox, EmptyData, Checkbox, Icon, IconName } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { ButtonActions, NewWorkspaceButton } from "@/modules/workspace/components";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const WorkspaceListed = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const { organization } = useParams<{ organization: string }>();
  const t = useTranslations("workspaces");

  const [workspaces] = trpc.workspace.getAll.useSuspenseQuery();
  const allWorkspaces = workspaces?.data || [];
  const filteredWorkspaces = allWorkspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(search.toLowerCase())
  );

  /* define table columns for table component */
  const columnsNames = defineColumns<Workspace>({
    name: { style: "w-auto", format: (name) => String(name) },
    slug: { style: "w-fit", format: (slug) => String(slug) },
    createdAt: { style: "w-fit", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
  });

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredWorkspaces);

  return (
    <article className="flex size-full flex-col gap-3">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        {filteredWorkspaces.length != 0 && <NewWorkspaceButton className="ml-auto max-sm:hidden md:w-fit" />}
      </div>
      <AnimatedContent className="bg-background flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredWorkspaces.length === 0 ? (
            <EmptyData title={t("no_results.title")} subtitle={t("no_results.subtitle")} icon="workspace" ctaButton={<NewWorkspaceButton className="md:w-fit" />} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox checked={isAllSelected} onCheckedChange={(checked) => toggleAll(checked === true)} />
                  </TableHead>
                  {columnsNames.map(({ column, style }) => (
                    <TableHead key={column} className={cn("text-foreground", style)}>
                      {/* @ts-ignore */}
                      {t(`table.${column}`)}
                    </TableHead>
                  ))}
                  <TableHead className="w-fit" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkspaces.map((workspace) => {
                  const workspacePath = getPrivateRoute("workspace", { slug: workspace.slug, organization });
                  const [icon, color] = workspace.logo?.split(":") || []

                  return (
                    <TableRow key={workspace.id} data-state={isSelected(workspace.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                      <TableCell>
                        <Checkbox checked={isSelected(workspace.id)} onCheckedChange={(checked) => toggleRow(workspace.id, checked === true)}/>
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => {
                        return (
                          <TableCell key={column} className={cn("text-foreground/80 text-xs", style)}>
                            {column === "name" && (
                              <div className="flex flex-row items-center gap-3">
                                <div className={cn("size-7 rounded-full flex items-center justify-center", getColor(color as Color || "black"))}>
                                  {isUrl(workspace.logo as string) ? (
                                      <img
                                        src={workspace.logo as string}
                                        alt={workspace.name}
                                        width={28}
                                        height={28}
                                        className="bg-accent size-6 rounded-full object-contain shrink-0"
                                        loading="lazy"
                                      />
                                  ): (
                                    <Icon name={icon as IconName || "workspace"} className="size-4 shrink-0" />
                                  )}
                                </div>
                                <Link href={workspacePath} className="text-foreground hover:text-tertiary">
                                  {format(workspace.name)}
                                </Link>
                              </div>
                            )}
                            {column !== "name" && format(workspace[column])}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex w-8 flex-row gap-2">
                        <ButtonActions {...workspace} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
       {filteredWorkspaces.length != 0 &&  <NewWorkspaceButton className="mt-auto flex w-full md:hidden" />}
      </AnimatedContent>
    </article>
  );
};

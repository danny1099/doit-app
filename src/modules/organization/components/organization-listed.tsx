"use client";
import moment from "moment";
import type { Organization } from "@prisma/client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { useTableSelection } from "@/shared/hooks";
import { cn, defineColumns, getColor, isUrl, type Color } from "@/shared/utils";
import { AnimatedContent, SearchBox, EmptyData, Checkbox, Badge, Icon, IconName } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { ButtonActions, NewOrganizationButton } from "@/modules/organization/components";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const OrganizationListed = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("organization");

  const [organizations] = trpc.organization.getAll.useSuspenseQuery();
  const allOrganizations = organizations?.data || [];
  const filteredOrganizations = allOrganizations.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));

  /* define table columns for table component */
  const columnsNames = defineColumns<Organization>({
    name: { style: "w-auto", format: (name) => String(name) },
    slug: { style: "w-fit", format: (slug) => String(slug) },
    createdAt: { style: "w-fit", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
  });

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredOrganizations);

  return (
    <article className="flex size-full flex-col gap-3">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        {filteredOrganizations.length != 0 && <NewOrganizationButton className="ml-auto max-sm:hidden md:w-fit" />}
      </div>
      <AnimatedContent className="bg-background flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredOrganizations.length === 0 ? (
            <EmptyData title={t("no_results.title")} subtitle={t("no_results.subtitle")} icon="workspace" ctaButton={<NewOrganizationButton className="md:w-fit" />} />
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
                {filteredOrganizations.map((organization) => {
                  const [icon, color] = organization.logo?.split(":") || []

                  return (
                    <TableRow key={organization.id} data-state={isSelected(organization.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                      <TableCell>
                        <Checkbox checked={isSelected(organization.id)} onCheckedChange={(checked) => toggleRow(organization.id, checked === true)}/>
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => {
                        return (
                          <TableCell key={column} className={cn("text-foreground/80 text-xs", style)}>
                            {column === "name" && (
                              <div className="flex flex-row items-center gap-3">
                                <div className={cn("size-7 rounded-full flex items-center justify-center", getColor(color as Color || "black"))}>
                                  {isUrl(organization.logo as string) ? (
                                      <img
                                        src={organization.logo as string}
                                        alt={organization.name}
                                        width={28}
                                        height={28}
                                        className="bg-accent size-6 rounded-full object-contain shrink-0"
                                        loading="lazy"
                                      />
                                  ): (
                                    <Icon name={icon as IconName || "workspace"} className="size-4 shrink-0" />
                                  )}
                                </div>
                                {format(organization.name)}
                                {organization.is_active && <Badge variant="tertiary" className="text-3xs ml-2">{t("current")}</Badge>}
                              </div>
                            )}
                            {column !== "name" && format(organization[column])}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex w-8 flex-row gap-2">
                        <ButtonActions {...organization} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
       {filteredOrganizations.length != 0 &&  <NewOrganizationButton className="mt-auto flex w-full md:hidden" />}
      </AnimatedContent>
    </article>
  );
};

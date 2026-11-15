"use client";
import moment from "moment";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import type { List, Task, TaskPriority, TaskStatus } from "@prisma/client";
import { useTableSelection } from "@/shared/hooks";
import { defineColumns, capitalize, cn, type Color, getColor } from "@/shared/utils";
import { AnimatedContent, Badge, Checkbox, EmptyData, Icon, SearchBox } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { NewTaskButton } from "@/modules/task/components";
import { trpc } from "@/trpc/client";

interface Props {
  list: List;
}

export const TaskListed = ({ list }: Props) => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("tasks");

  const priorityLabels: Record<TaskPriority, string> = {
    LOW: t("priority.low"),
    MEDIUM: t("priority.medium"),
    HIGH: t("priority.high"),
    URGENT: t("priority.urgent"),
  };

  const statusLabels: Record<TaskStatus, string> = {
    INBOX: t("status.inbox"),
    TODO: t("status.todo"),
    IN_PROGRESS: t("status.in_progress"),
    BLOCKED: t("status.blocked"),
    DONE: t("status.done"),
    ARCHIVED: t("status.archived"),
  };

  const [tasks] = trpc.task.getByList.useSuspenseQuery({ param: list.id });
  const allTasks = tasks?.data || [];
  const filteredTasks = allTasks.filter(
    (t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.content?.toLowerCase().includes(search.toLowerCase())
  );

  /* define table columns for table component */
  const columnsNames = defineColumns<Task>({
    title: { style: "w-auto", format: (name) => String(name) },
    priority: { style: "w-fit", format: (slug) => String(slug) },
    status: { style: "w-fit", format: (role) => capitalize(role as string) },
    createdAt: {
      style: "w-fit",
      format: (date) => moment(date as Date).fromNow(),
    },
  });

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredTasks);

  return (
    <article className="flex size-full flex-col gap-3">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center gap-2">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        {filteredTasks.length !== 0 && <NewTaskButton list={list} className="ml-auto max-sm:hidden md:w-fit" />}
      </div>
      <AnimatedContent className="bg-background flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredTasks.length === 0 ? (
            <EmptyData
              title={search ? t("no_results.title") : t("empty.title")}
              subtitle={search ? t("no_results.subtitle") : t("empty.subtitle")}
              icon="inbox"
              ctaButton={search ? undefined : <NewTaskButton list={list} className="md:w-fit" />}
            />
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
                {filteredTasks.map((task) => {
                  return (
                    <TableRow
                      key={task.id}
                      data-state={isSelected(task.id) && "selected"}
                      className="group hover:text-tertiary hover:bg-accent/80"
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected(task.id)}
                          onCheckedChange={(checked) => toggleRow(task.id, checked === true)}
                        />
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => {
                        return (
                          <TableCell key={column} className={cn("text-foreground/80 text-xs", style)}>
                            {column !== "priority" && column !== "status" && format(task[column])}
                            {column === "priority" && (priorityLabels[task.priority] || capitalize(task.priority))}
                            {column === "status" && (
                              <Badge variant="outline" className="text-3xs w-fit">
                                {statusLabels[task.status] || capitalize(task.status)}
                              </Badge>
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex w-8 flex-row gap-2"></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
        {filteredTasks.length !== 0 && (
          <NewTaskButton list={list} className="mt-auto flex w-full justify-center md:hidden" />
        )}
      </AnimatedContent>
    </article>
  );
};

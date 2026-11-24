"use client";
import moment from "moment";
import { useTranslations } from "next-intl";
import type { Task, TaskPriority, TaskStatus } from "@prisma/client";
import { useTableSelection } from "@/shared/hooks";
import { defineColumns, capitalize, cn } from "@/shared/utils";
import { AnimatedContent, Badge, Checkbox, EmptyData, Icon } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { taskPriorities } from "@/modules/task/types";
import { NewTaskButton, PriorityToggle } from "@/modules/task/components";

interface ViewTableProps {
  tasks: Task[];
  className?: string;
}

export const TaskViewTable = ({ tasks, className }: ViewTableProps) => {
  const t = useTranslations("tasks");

  const statusLabels: Record<TaskStatus, string> = {
    INBOX: t("status.inbox"),
    TODO: t("status.todo"),
    IN_PROGRESS: t("status.in_progress"),
    BLOCKED: t("status.blocked"),
    DONE: t("status.done"),
    ARCHIVED: t("status.archived"),
  };

  /* define table columns for table component */
  const columnsNames = defineColumns<Task>({
    title: { style: "w-xl", format: (name) => String(name) },
    status: { style: "w-fit", format: (role) => capitalize(role as string) },
    priority: { style: "w-fit", format: (slug) => String(slug) },
    createdAt: {
      style: "w-fit",
      format: (date) => moment(date as Date).format("YYYY-MM-DD"),
    },
  });

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(tasks);

  return (
    <AnimatedContent className={cn("bg-background flex size-full flex-col py-4", className)}>
      <section className="flex size-full flex-col">
        {tasks.length === 0 ? (
          <EmptyData
            title={t("empty.title")}
            subtitle={t("empty.subtitle")}
            icon="task"
            ctaButton={<NewTaskButton className="md:w-fit" />}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => {
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
                      const priorityField = taskPriorities[task.priority];
                      return (
                        <TableCell key={column} className={cn("text-foreground/80 text-2xs", style)}>
                          {column !== "priority" && column !== "status" && format(task[column])}
                          {column === "priority" && <PriorityToggle task={task} />}
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
    </AnimatedContent>
  );
};

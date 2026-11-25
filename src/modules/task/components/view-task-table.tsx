"use client";

import moment from "moment";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type CSSProperties, type DragEvent } from "react";
import type { Task, TaskStatus } from "@prisma/client";
import { useTableSelection } from "@/shared/hooks";
import { capitalize, cn } from "@/shared/utils";
import { AnimatedContent, Badge, Checkbox, EmptyData } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { TASK_TABLE_MIN_COLUMN_WIDTH, type TaskTableColumnId, type TaskTableColumnLayout } from "@/modules/task/types";
import { getDefaultTaskTableLayout, getStoredTaskTableLayout, saveTaskTableLayout } from "@/modules/task/utils";
import { NewTaskButton, PriorityToggle, StatusButton } from "@/modules/task/components";

interface ViewTableProps {
  tasks: Task[];
  className?: string;
}

const TABLE_LAYOUT_STORAGE_EVENT = "doit:task-table-layout";

export const TaskViewTable = ({ tasks, className }: ViewTableProps) => {
  const t = useTranslations("tasks");
  const [columns, setColumns] = useState<TaskTableColumnLayout[]>(() => getDefaultTaskTableLayout());
  const [draggingId, setDraggingId] = useState<TaskTableColumnId | null>(null);
  const [dragOverId, setDragOverId] = useState<TaskTableColumnId | null>(null);
  const dragIdRef = useRef<TaskTableColumnId | null>(null);
  const columnsRef = useRef(columns);

  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  useEffect(() => {
    const sync = () => setColumns(getStoredTaskTableLayout());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(TABLE_LAYOUT_STORAGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(TABLE_LAYOUT_STORAGE_EVENT, sync);
    };
  }, []);

  const persistColumns = (next: TaskTableColumnLayout[]) => {
    const normalized = saveTaskTableLayout(next);
    setColumns(normalized);
    window.dispatchEvent(new Event(TABLE_LAYOUT_STORAGE_EVENT));
  };

  const statusLabels: Record<TaskStatus, string> = {
    TODO: t("status.todo"),
    IN_PROGRESS: t("status.in_progress"),
    BLOCKED: t("status.blocked"),
    DONE: t("status.done"),
    ARCHIVED: t("status.archived"),
  };

  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(tasks);
  const getColumnLabel = (columnId: TaskTableColumnId) => t(`table.${columnId}`);
  const getColumnStyle = (width: number): CSSProperties => ({
    width,
    minWidth: width,
    maxWidth: width,
  });

  const reorderColumns = (sourceId: TaskTableColumnId, targetId: TaskTableColumnId) => {
    if (sourceId === targetId) return;
    const current = columnsRef.current;
    const sourceIndex = current.findIndex((column) => column.id === sourceId);
    const targetIndex = current.findIndex((column) => column.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...current];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    persistColumns(next);
  };

  const handleDragStart = (id: TaskTableColumnId) => (event: DragEvent<HTMLButtonElement>) => {
    dragIdRef.current = id;
    setDraggingId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (id: TaskTableColumnId) => (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
    if (dragOverId !== id) setDragOverId(id);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (id: TaskTableColumnId) => (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
    const sourceId = dragIdRef.current ?? (event.dataTransfer.getData("text/plain") as TaskTableColumnId);
    if (sourceId) reorderColumns(sourceId, id);
    dragIdRef.current = null;
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    dragIdRef.current = null;
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleResizeStart = (id: TaskTableColumnId) => (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startWidth = columnsRef.current.find((column) => column.id === id)?.width ?? TASK_TABLE_MIN_COLUMN_WIDTH;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextWidth = Math.max(TASK_TABLE_MIN_COLUMN_WIDTH, Math.round(startWidth + delta));
      setColumns((current) => current.map((column) => (column.id === id ? { ...column, width: nextWidth } : column)));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      persistColumns(columnsRef.current);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const renderCell = (task: Task, columnId: TaskTableColumnId) => {
    if (columnId === "title") {
      return <span className="block truncate">{task.title}</span>;
    }

    if (columnId === "status") {
      return <StatusButton task={task} />;
    }

    if (columnId === "priority") {
      return <PriorityToggle task={task} />;
    }

    return <span className="block truncate">{moment(task.createdAt).format("YYYY-MM-DD")}</span>;
  };

  return (
    <AnimatedContent className={cn("bg-background flex size-full flex-col py-4", className)}>
      <section className="flex size-full flex-col">
        {tasks.length === 0 ? (
          <EmptyData
            title={t("empty.title")}
            subtitle={t("empty.subtitle")}
            icon="task"
            ctaButton={<NewTaskButton className="my-auto md:w-fit" />}
          />
        ) : (
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" style={{ width: 40, minWidth: 40, maxWidth: 40 }}>
                  <Checkbox checked={isAllSelected} onCheckedChange={(checked) => toggleAll(checked === true)} />
                </TableHead>
                {columns.map((column) => {
                  const isDragging = draggingId === column.id;
                  const isDragOver = dragOverId === column.id && draggingId !== column.id;
                  return (
                    <TableHead
                      key={column.id}
                      className={cn(
                        "text-foreground border-border/40 relative border-r select-none",
                        isDragging && "opacity-50",
                        isDragOver && "bg-accent/40"
                      )}
                      style={getColumnStyle(column.width)}
                      onDragOver={handleDragOver(column.id)}
                      onDrop={handleDrop(column.id)}
                    >
                      <div className="hover:[&_>button]:text-muted-foreground flex items-center gap-2">
                        <span className="text-2xs truncate">{getColumnLabel(column.id)}</span>
                        <button
                          type="button"
                          draggable
                          onDragStart={handleDragStart(column.id)}
                          onDragEnd={handleDragEnd}
                          className="hover:text-muted-foreground ml-auto cursor-grab text-transparent active:cursor-grabbing"
                          aria-label={t("table.reorder_column", { column: getColumnLabel(column.id) })}
                        >
                          <svg viewBox="0 0 16 16" className="size-3 fill-current" aria-hidden="true">
                            <circle cx="5" cy="3" r="1" />
                            <circle cx="11" cy="3" r="1" />
                            <circle cx="5" cy="8" r="1" />
                            <circle cx="11" cy="8" r="1" />
                            <circle cx="5" cy="13" r="1" />
                            <circle cx="11" cy="13" r="1" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={t("table.resize_column", { column: getColumnLabel(column.id) })}
                        onPointerDown={handleResizeStart(column.id)}
                        className="hover:bg-border/60 absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none"
                      >
                        <span className="bg-border/0 hover:bg-border mx-auto block h-full w-px" />
                      </button>
                    </TableHead>
                  );
                })}
                <TableHead className="w-10" style={{ width: 40, minWidth: 40, maxWidth: 40 }} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  data-state={isSelected(task.id) && "selected"}
                  className="group hover:text-tertiary hover:bg-accent/80"
                >
                  <TableCell style={{ width: 40, minWidth: 40, maxWidth: 40 }}>
                    <Checkbox
                      checked={isSelected(task.id)}
                      onCheckedChange={(checked) => toggleRow(task.id, checked === true)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className="text-foreground/80 text-2xs border-border/40 overflow-hidden border-r"
                      style={getColumnStyle(column.width)}
                    >
                      {renderCell(task, column.id)}
                    </TableCell>
                  ))}
                  <TableCell className="w-10" style={{ width: 40, minWidth: 40, maxWidth: 40 }} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </AnimatedContent>
  );
};

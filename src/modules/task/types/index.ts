import type { useTranslations } from "next-intl";
import type { TaskPriority, TaskStatus } from "@prisma/client";
import { IconName } from "@/shared/components";

export const taskStatuses: TaskStatus[] = ["INBOX", "TODO", "IN_PROGRESS", "BLOCKED", "DONE", "ARCHIVED"];

export type TaskTableColumnId = "title" | "status" | "priority" | "createdAt";

export interface TaskTableColumnLayout {
  id: TaskTableColumnId;
  width: number;
}

export interface TaskTableLayout {
  order: TaskTableColumnId[];
  widths: Partial<Record<TaskTableColumnId, number>>;
}

export const DEFAULT_TASK_TABLE_COLUMNS: TaskTableColumnLayout[] = [
  { id: "title", width: 420 },
  { id: "status", width: 70 },
  { id: "priority", width: 80 },
  { id: "createdAt", width: 90 },
];

export const TASK_TABLE_MIN_COLUMN_WIDTH = 50;

/* types i18n translation for task view picker */
export type TaskViewsT = ReturnType<typeof useTranslations<"tasks.views">>;
export type TaskPriorityT = ReturnType<typeof useTranslations<"tasks.priority">>;
export type TaskPriorityKey = Parameters<TaskPriorityT>[0];
export type TaskViewKey = Parameters<TaskViewsT>[0];

interface configField {
  name: string;
  label?: TaskPriorityKey;
  icon?: IconName;
  className?: string;
}

export const taskPriorities: Record<TaskPriority, configField> = {
  LOW: { name: "low", label: "low", icon: "square", className: "text-gray-600" },
  MEDIUM: { name: "medium", label: "medium", icon: "square", className: "text-blue-600" },
  HIGH: { name: "high", label: "high", icon: "square", className: "text-yellow-600" },
  URGENT: { name: "urgent", label: "urgent", icon: "square", className: "text-red-600" },
};

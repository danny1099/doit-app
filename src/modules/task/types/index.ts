import type { useTranslations } from "next-intl";
import type { Task, TaskPriority, TaskStatus, User } from "@prisma/client";
import { IconName } from "@/shared/components";

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

export const TASK_TABLE_MIN_COLUMN_WIDTH = 70;

/* types i18n translation for task view picker */
export type TaskViewsT = ReturnType<typeof useTranslations<"tasks.views">>;
export type TaskPriorityT = ReturnType<typeof useTranslations<"tasks.priority">>;
export type TaskStatusT = ReturnType<typeof useTranslations<"tasks.status">>;

export type TaskPriorityKey = Parameters<TaskPriorityT>[0];
export type TaskStatusKey = Parameters<TaskStatusT>[0];
export type TaskViewKey = Parameters<TaskViewsT>[0];

interface configPriorityField {
  name: string;
  label?: TaskPriorityKey;
  icon?: IconName;
  className?: string;
}

interface configStatusField {
  name: string;
  label: TaskStatusKey;
  icon: IconName;
  className?: string;
}

export const taskPriorities: Record<TaskPriority, configPriorityField> = {
  LOW: { name: "low", label: "low", icon: "square", className: "text-gray-600" },
  MEDIUM: { name: "medium", label: "medium", icon: "square", className: "text-blue-600" },
  HIGH: { name: "high", label: "high", icon: "square", className: "text-yellow-600" },
  URGENT: { name: "urgent", label: "urgent", icon: "square", className: "text-red-600" },
};

export type TaskStatusGroups = "pending" | "in_progress" | "completed";

export const taskStatuses: Record<TaskStatus, configStatusField> = {
  TODO: { name: "todo", label: "todo", icon: "pending", className: "text-gray-700 bg-gray-200 hover:bg-gray-200" },
  IN_PROGRESS: {
    name: "in_progress",
    label: "in_progress",
    icon: "in_progres",
    className: "bg-blue-200 text-blue-700 hover:bg-blue-200 hover:text-blue-700",
  },
  BLOCKED: {
    name: "blocked",
    label: "blocked",
    icon: "bloqued",
    className: "text-yellow-700 bg-yellow-200 hover:bg-yellow-200",
  },
  DONE: { name: "done", label: "done", icon: "complete", className: "text-green-700 bg-green-200 hover:bg-green-200" },
  ARCHIVED: {
    name: "archived",
    label: "archived",
    icon: "archive",
    className: "text-purple-700 bg-purple-200 hover:bg-purple-200",
  },
};

export interface TaskWithData extends Task {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

import type { useTranslations } from "next-intl";
import type { TaskPriority, TaskStatus } from "@prisma/client";

export const taskPriorities: TaskPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];
export const taskStatuses: TaskStatus[] = ["INBOX", "TODO", "IN_PROGRESS", "BLOCKED", "DONE", "ARCHIVED"];

/* types i18n translation for task view picker */
export type TaskViewsT = ReturnType<typeof useTranslations<"tasks.views">>;
export type TaskViewKey = Parameters<TaskViewsT>[0];

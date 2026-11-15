import type { TaskPriority, TaskStatus } from "@prisma/client";

export const taskPriorities: TaskPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export const taskStatuses: TaskStatus[] = ["INBOX", "TODO", "IN_PROGRESS", "BLOCKED", "DONE", "ARCHIVED"];

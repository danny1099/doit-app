import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  content: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  type: z.enum(["DIGITAL", "LOCATION_BASED", "COMMUNICATION", "SCHEDULED"]).optional(),
  status: z.enum(["INBOX", "TODO", "IN_PROGRESS", "BLOCKED", "DONE", "ARCHIVED"]).optional(),
  dueDate: z.string().optional(),
});

export const taskSchemaCreate = taskSchema.extend({
  listId: z.string().nonempty({ message: "required" }),
});

export const taskSchemaUpdate = taskSchema.partial().extend({
  id: z.string().nonempty({ message: "required" }),
  listId: z.string().optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export type TaskSchemaCreate = z.infer<typeof taskSchemaCreate>;
export type TaskSchemaUpdate = z.infer<typeof taskSchemaUpdate>;

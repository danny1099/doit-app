import { z } from "zod";

export const listSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  icon: z.string().optional(),
  mode: z.enum(["DEV", "STUDENT", "PERSONAL"]).optional(),
  typeList: z.enum(["LIST", "PROJECT"]).optional(),
});

export const listSchemaCreate = listSchema.extend({
  workspaceId: z.string().optional(),
});

export const listSchemaUpdate = listSchema.partial().extend({
  id: z.string().nonempty({ message: "required" }),
});

export type ListSchema = z.infer<typeof listSchema>;
export type ListSchemaCreate = z.infer<typeof listSchemaCreate>;
export type ListSchemaUpdate = z.infer<typeof listSchemaUpdate>;

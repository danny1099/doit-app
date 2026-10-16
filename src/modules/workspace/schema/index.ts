import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string().nonempty({ message: "invalid_name" }),
  description: z.string().optional(),
  logo: z.string().optional(),
});

export const workspaceSchemaUpdate = workspaceSchema
  .extend({
    id: z.string().nonempty({ message: "required" }),
    slug: z.string().optional(),
    email: z.email().optional(),
  })
  .partial()
  .required({ id: true });

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type WorkspaceSchemaUpdate = z.infer<typeof workspaceSchemaUpdate>;

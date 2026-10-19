import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().nonempty({ message: "invalid_name" }),
  logo: z.string().optional(),
});

export const organizationSchemaUpdate = organizationSchema
  .extend({
    id: z.string().nonempty({ message: "required" }),
    slug: z.string().optional(),
    domain: z.string().optional(),
  })
  .partial()
  .required({ id: true });

export type OrganizationSchema = z.infer<typeof organizationSchema>;
export type OrganizationSchemaUpdate = z.infer<typeof organizationSchemaUpdate>;

import { z } from "zod";

export const authSchema = z.object({
  email: z.string().nonempty({ message: "required" }).email({ message: "invalid_email" }),
  password: z.string().nonempty({ message: "required" }).min(8, { message: "invalid_password" }),
});

export type AuthSchema = z.infer<typeof authSchema>;

import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(3, { message: "invalid_name" }),
  email: z.email({ message: "invalid_email" }),
  avatar: z.string().optional(),
  workspace: z.string().min(1, { message: "required" }),
  logo: z.string().optional(),
});

export const infoUserSchema = onboardingSchema.pick({
  name: true,
  avatar: true,
  email: true,
});

export const workspaceSchema = onboardingSchema.pick({
  workspace: true,
  logo: true,
});

export const paymentProcessorSchema = z.object({
  processor: z.enum(["STRIPE"], { message: "invalid_processor" }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
export type InfoUserSchema = z.infer<typeof infoUserSchema>;
export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type PaymentProcessorSchema = z.infer<typeof paymentProcessorSchema>;

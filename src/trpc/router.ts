import { procedure, router } from "@/trpc/init";
import { authRouter } from "@/modules/auth/router";

export const appRouter = router({
  health: procedure.query(() => "Server is healthy!"),
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

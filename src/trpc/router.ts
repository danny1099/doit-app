import { procedure, router } from "@/trpc/init";
import { workspaceRouter } from "@/modules/workspace/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;

import { procedure, router } from "@/trpc/init";
import { onboardingRouter } from "@/modules/onboarding/router";
import { organizationRouter } from "@/modules/organization/router";
import { listRouter } from "@/modules/list/router";
import { taskRouter } from "@/modules/task/router";
import { workspaceRouter } from "@/modules/workspace/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  onboarding: onboardingRouter,
  organization: organizationRouter,
  list: listRouter,
  task: taskRouter,
  workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;

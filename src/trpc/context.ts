import { prisma } from "@/lib/db/prisma";
import { getAuthSession } from "@/modules/auth/session";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const auth = await getAuthSession();

  return {
    ...opts,
    db: prisma,
    userId: auth?.user.id,
    workspaceId: auth?.user.activeWorkspaceId as string | undefined,
    organizationId: "" as string | undefined, // TODO: implement organizationId in auth session
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const user: any = await getAuthSession();

  return {
    db: prisma,
    user,
    ...opts,
  };
};

import { prisma } from "@/lib/db/prisma";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
    db: prisma,
    userId: "123", // TODO: Implement user authentication and retrieve the user ID from the request headers or session
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

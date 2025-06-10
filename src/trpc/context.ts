import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const user = await getServerSession();
  console.log("user on context", user);
  return {
    db: prisma,
    ...opts,
  };
};

import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Loader } from "@/shared/components";
import { TasksRedirect } from "@/modules/task/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Tasks() {
  await trpc.list.getAll.prefetch();

  return (
    <HydrateClient>
      <Suspense fallback={<Loader />}>
        <TasksRedirect />
      </Suspense>
    </HydrateClient>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tasks.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { P, Loader } from "@/shared/components";
import { AvatarPicker, FormName } from "@/modules/list/components";
import { TaskContent } from "@/modules/task/components";
import { trpc, HydrateClient } from "@/trpc/server";

interface TaskListProps {
  params: Promise<{ list: string; organization: string }>;
}

export default async function TaskList({ params }: TaskListProps) {
  const { list: listId, organization } = await params;
  const t = await getTranslations("tasks");

  /* fetch list and tasks  */
  const [list] = await Promise.all([trpc.list.getById({ param: listId }), trpc.task.getByList.prefetch({ param: listId })]);

  if (!listId || !list.data) redirect(getPrivateRoute("workspaces", { organization }));

  return (
    <section className="relative flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <div className="flex h-fit w-full flex-row items-center gap-3">
        <AvatarPicker list={list.data} />
        <div className="flex flex-col">
          <FormName list={list.data} />
          <P className="text-2xs -mt-1 max-sm:line-clamp-1">{t("description")}</P>
        </div>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <TaskContent />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export async function generateMetadata({ params }: TaskListProps): Promise<Metadata> {
  const { list: listId } = await params;
  const { data: list } = await trpc.list.getById({ param: listId });
  const t = await getTranslations("tasks.metadata");

  return {
    title: t("title", { list: list?.name || "" }),
    description: t("description", { list: list?.name || "" }),
  };
}

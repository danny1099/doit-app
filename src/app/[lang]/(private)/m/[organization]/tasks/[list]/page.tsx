import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { List } from "@prisma/client";
import { getPrivateRoute } from "@/routes/utils";
import { Loader, P } from "@/shared/components";
import { AvatarPicker, FormName } from "@/modules/list/components";
import { trpc, HydrateClient } from "@/trpc/server";

interface TaskListProps {
  params: Promise<{ list: string; organization: string }>;
}

export default async function TaskList({ params }: TaskListProps) {
  const { list: listId, organization } = await params;
  const t = await getTranslations("tasks");

  const { data: list } = await trpc.list.getById({ param: listId });

  if (!listId || !list) redirect(getPrivateRoute("workspaces", { organization }));

  return (
    <section className="relative flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <div className="flex h-fit w-full flex-row items-center gap-3 pl-4 md:pl-1">
        <AvatarPicker list={list} />
        <div className="flex flex-col">
          <FormName list={list} />
          <P className="text-2xs -mt-1">{t("description")}</P>
        </div>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}></Suspense>
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

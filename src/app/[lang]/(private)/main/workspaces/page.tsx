import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { P, Title, Loader } from "@/shared/components";
import { trpc, HydrateClient } from "@/trpc/server";
import { WorkspaceListed } from "@/modules/workspace/components";

export default async function Workspaces() {
  const t = await getTranslations("workspaces");
  await trpc.workspace.getAllWorkspaces.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <div className="flex h-fit w-full flex-col">
        <Title className="text-2xl">{t("title")}</Title>
        <P className="text-2xs">{t("description")}</P>
      </div>
      <HydrateClient>
        <Suspense fallback={<Loader />}>
          <WorkspaceListed />
        </Suspense>
      </HydrateClient>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("workspaces.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

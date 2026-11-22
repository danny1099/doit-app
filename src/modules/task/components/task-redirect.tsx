"use client";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { EmptyData, Loader } from "@/shared/components";
import { NewListButton } from "@/modules/list/components/add-button";
import { getStoredActiveListId, storeActiveListId } from "@/modules/list/helpers";
import { trpc } from "@/trpc/client";

export const TasksRedirect = () => {
  const router = useRouter();
  const { organization } = useParams<{ organization: string }>();
  const [lists] = trpc.list.getAll.useSuspenseQuery();
  const allLists = useMemo(() => lists?.data || [], [lists?.data]);
  const t = useTranslations("tasks");

  useEffect(() => {
    if (allLists.length === 0) return;

    const storedList = getStoredActiveListId();
    const selected = allLists.find((list) => list.id === storedList)?.id || allLists[0].id;

    storeActiveListId(selected);
    router.replace(getPrivateRoute("task", { organization, list: selected }), { scroll: false });
  }, [allLists, organization, router]);

  if (allLists.length === 0) {
    return (
      <section className="flex size-full items-center justify-center px-4 py-5">
        <EmptyData title={t("empty.title")} subtitle={t("empty.subtitle")} icon="task" ctaButton={<NewListButton />} />
      </section>
    );
  }

  return <Loader />;
};

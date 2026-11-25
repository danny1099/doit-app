"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDebounceCallback } from "usehooks-ts";
import { Button, SearchBoxMobile } from "@/shared/components";
import { NewTaskButton, TaskViewTable, ViewToggle } from "@/modules/task/components";
import { trpc } from "@/trpc/client";

export const TaskContent = () => {
  const { list } = useParams<{ list: string }>();
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("tasks");

  /* get tasks from prefech data*/
  const [tasks] = trpc.task.getByList.useSuspenseQuery({ param: list });
  const allTasks = tasks?.data || [];
  const filteredTasks = allTasks.filter(
    (t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <article className="flex size-full flex-col">
      <div className="flex h-fit w-full flex-row items-center justify-between gap-2 py-0.5">
        <ViewToggle />
        <div className="flex h-fit flex-row items-center gap-1 px-4">
          <SearchBoxMobile placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
          <Button variant="ghost" icon="filter" size="icon" />
          <Button variant="ghost" icon="sort" size="icon" />
          {filteredTasks.length != 0 && <NewTaskButton className="ml-auto max-sm:hidden md:w-fit" />}
        </div>
      </div>
      <TaskViewTable tasks={filteredTasks} className="mt-5" />
    </article>
  );
};

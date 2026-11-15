"use client";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import type { List } from "@prisma/client";
import { getPrivateRoute } from "@/routes/utils";
import { useIsClient, useModal } from "@/shared/hooks";
import { Button, Icon, IconName, P, Tooltip, Popover, PopoverContent, PopoverTrigger, Divider } from "@/shared/components";
import { ListForm, WidgetListButton, ListsWidgetSkeleton, ListFormDelete } from "@/modules/list/components";
import { getStoredActiveListId, storeActiveListId } from "@/modules/list/helpers";
import { trpc } from "@/trpc/client";
import { cn } from "@/shared/utils";

export const ListsWidget = () => {
  const isClient = useIsClient();
  const pathname = usePathname();
  const { openModal } = useModal();
  const { data, isLoading } = trpc.list.getAll.useQuery();
  const { organization } = useParams<{ organization: string }>();
  const lists = useMemo(() => data?.data || [], [data?.data]);
  const t = useTranslations("lists");

  const listFromUrl = pathname.split("/tasks/")[1]?.split("/")[0] || null;
  const storedList = isClient ? getStoredActiveListId() : null;
  const activeListId = useMemo(() => {
    const candidate = listFromUrl || storedList;
    return lists.find((list) => list.id === candidate)?.id || lists[0]?.id || null;
  }, [listFromUrl, storedList, lists]);

  useEffect(() => {
    if (activeListId && activeListId !== storedList) storeActiveListId(activeListId);
  }, [activeListId, storedList]);

  const items = [
    {
      name: "edit",
      label: t("options.edit"),
      icon: "edit",
      onClick: (list: List) => {
        openModal({
          title: t("modal.edit.title"),
          description: t("modal.edit.subtitle"),
          content: <ListForm list={list} />,
        });
      },
    },
    {
      name: "delete",
      label: t("options.delete"),
      icon: "delete",
      onClick: (list: List) => {
        openModal({
          content: <ListFormDelete {...list} />,
        });
      },
    },
  ];

  if (!isClient || isLoading) return <ListsWidgetSkeleton />;

  return (
    <div className="bg-accent mt-10 flex max-h-56 flex-col rounded-lg px-2 py-3">
      <P className="text-foreground text-3xs ml-1 font-medium">{t("title")}</P>
      <div className="flex w-full flex-row items-center gap-1 pr-1">
        <span className="text-4xs text-muted-foreground ml-1">{t("widget")}</span>
        <Tooltip text={t("add-button")}>
          <WidgetListButton className="ml-auto" />
        </Tooltip>
      </div>

      <ul className="border-border mx-4 my-2 flex max-h-16 min-h-2 w-full min-w-0.5 translate-x-px flex-col gap-1 border-l px-2 py-0.5">
        {lists.map((list) => {
          const pathTasks = getPrivateRoute("task", { list: list.id, organization });
          const [icon, _color] = (list.icon || "file:black").split(":") as [IconName, string];

          return (
            <li key={list.id} className="group hover:text-tertiary flex h-7 w-full flex-row items-center gap-1.5 px-2">
              <Link href={pathTasks} onClick={() => storeActiveListId(list.id)} className="flex items-center gap-1.5">
                <Icon name={icon} className="mb-0.5 size-3 shrink-0" />
                <span className="text-2xs">{list.name}</span>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    icon="options"
                    variant="ghost"
                    size="xs"
                    className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 hover:bg-transparent [&_svg]:size-3"
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="flex w-44 flex-col gap-1">
                  {items.map(({ name, icon, label, onClick }) => {
                    return (
                      <div key={name} className="flex flex-col">
                        <Button
                          icon={icon as IconName}
                          placement="start"
                          variant={name === "delete" ? "destructive" : "item"}
                          size="sm"
                          onClick={() => onClick(list)}
                          className={cn("text-2xs w-auto justify-start gap-2 font-normal [&_svg]:size-3")}
                        >
                          {label}
                        </Button>
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

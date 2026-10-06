# Server Component Example

- This is an example of server component using trpc server prefetch and hydraclient

```tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { P, Loader, Title } from "@/shared/components";
import { WorkspaceListed } from "@/modules/workspace/components";
import { trpc, HydrateClient } from "@/trpc/server";

export default async function Workspaces() {
  const t = await getTranslations("workspaces");
  await trpc.workspace.getAll.prefetch();

  return (
    <section className="flex size-full flex-col gap-4 px-4 py-5 md:px-16">
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

export const metadata: Metadata = {
  title: "Workspaces",
  description: "All your workspaces will be listed here. You can create new ones or join existing ones.",
};
```

- This is example for client components using cache data for prefetch

```tsx
"use client";
import Link from "next/link";
import moment from "moment";
import type { Workspace } from "@prisma/client";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { getPrivateRoute } from "@/routes/utils";
import { cn, defineColumns, fallbackAvatar } from "@/shared/utils";
import { useTableSelection } from "@/shared/hooks";
import { AnimatedContent, SearchBox, EmptyData, Checkbox } from "@/shared/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/table";
import { ButtonActions, NewWorkspaceButton } from "@/modules/workspace/components";
import { trpc } from "@/trpc/client";

/* prettier-ignore */
export const WorkspaceListed = () => {
  const [search, setSearch] = useState("");
  const setDebouncedSearch = useDebounceCallback(setSearch, 300);
  const t = useTranslations("workspaces");

  const [workspaces] = trpc.workspace.getAll.useSuspenseQuery();
  const allWorkspaces = workspaces?.data || [];
  const filteredWorkspaces = allWorkspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(search.toLowerCase())
  );

  /* define table columns for table component */
  const columnsNames = defineColumns<Workspace>({
    name: { style: "w-110", format: (name) => String(name) },
    slug: { style: "w-fit", format: (slug) => String(slug) },
    createdAt: { style: "w-fit", format: (date) => moment(date as Date).format("DD-MMM-YYYY") },
  });

  /* handle table selection functions for table */
  const { isAllSelected, isSelected, toggleAll, toggleRow } = useTableSelection(filteredWorkspaces);

  return (
    <article className="flex size-full flex-col gap-3">
      <div className="bg-background mt-3 flex h-fit w-full flex-row items-center">
        <SearchBox placeholder={t("search_box")} onChange={(e) => setDebouncedSearch(e.target.value)} />
        <NewWorkspaceButton className="ml-auto max-sm:hidden md:w-fit" />
      </div>
      <AnimatedContent className="bg-background flex size-full flex-col py-4">
        <section className="flex size-full flex-col">
          {filteredWorkspaces.length === 0 ? (
            <EmptyData title={t("no_results.title")} subtitle={t("no_results.subtitle")} icon="workspace" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox checked={isAllSelected} onCheckedChange={(checked) => toggleAll(checked === true)} />
                  </TableHead>
                  {columnsNames.map(({ column, style }) => (
                    <TableHead key={column} className={cn("text-foreground", style)}>
                      {/* @ts-ignore */}
                      {t(`table.${column}`)}
                    </TableHead>
                  ))}
                  <TableHead className="w-fit" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkspaces.map((workspace) => {
                  const workspacePath = getPrivateRoute("workspace", { slug: workspace.slug });
                  return (
                    <TableRow key={workspace.id} data-state={isSelected(workspace.id) && "selected"} className="group hover:text-tertiary hover:bg-accent/80">
                      <TableCell>
                        <Checkbox checked={isSelected(workspace.id)} onCheckedChange={(checked) => toggleRow(workspace.id, checked === true)}/>
                      </TableCell>
                      {columnsNames.map(({ column, format, style }) => {
                        return (
                          <TableCell key={column} className={cn("text-foreground/80 text-xs", style)}>
                            {column === "name" && (
                              <div className="flex flex-row items-center gap-3">
                                <img
                                  src={workspace.logo || fallbackAvatar(workspace.name)}
                                  alt={workspace.name}
                                  width={28}
                                  height={28}
                                  className="bg-accent size-7 rounded-full object-contain"
                                  loading="lazy"
                                />
                                <Link href={workspacePath} className="text-foreground hover:text-tertiary">
                                  {format(workspace.name)}
                                </Link>
                              </div>
                            )}
                            {column !== "name" && format(workspace[column])}
                          </TableCell>
                        );
                      })}
                      <TableCell className="flex w-8 flex-row gap-2">
                        <ButtonActions {...workspace} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </section>
        <NewWorkspaceButton className="mt-auto flex w-full md:hidden" />
      </AnimatedContent>
    </article>
  );
};
```

- This is another example for server components using client components and redirect

```tsx
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPrivateRoute } from "@/routes/utils";
import { P, Navbar, Title } from "@/shared/components";
import { isAuthenticated } from "@/modules/auth/session";
import { OnboardingSteps } from "@/modules/onboarding/components";

export default async function Onboarding() {
  const { hasOnboarding, organization } = await isAuthenticated();
  const t = await getTranslations("onboarding");

  /* if user has onboarding redirect to overview inmediately */
  const redirectTo = getPrivateRoute("overview", { organization: organization as string });
  if (hasOnboarding) redirect(redirectTo);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="bg-background flex size-full flex-col items-center gap-2 px-4 py-6 md:px-24">
        <div className="mt-10 flex h-fit w-full flex-col text-center">
          <Title>{t("title")}</Title>
          <P className="line-clamp-2">{t("description")}</P>
        </div>
        <OnboardingSteps />
      </main>
    </div>
  );
}

export const metadata = {
  title: "Onboarding",
  description: "Welcome to your onboarding, let’s get started by creating your key account.",
};
```

import { redirect } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { Navlink } from "@/shared/components";
import { AvatarPicker, FormDescription, FormName } from "@/modules/workspace/components";
import { trpc } from "@/trpc/server";

interface WorkspaceProps {
  params: Promise<{ slug: string; organization: string }>;
}

/* prettier-ignore */
export default async function WorkspaceDetail({ params }: WorkspaceProps) {
  /* get workspace slug with organization and search if it exists in database */
  const { slug, organization } = await params;
  const { data } = await trpc.workspace.getBySlug({ param: slug });
  const redirectTo = getPrivateRoute("workspaces", {organization})

  if (!slug || !data) redirect(redirectTo);

  return (
    <section className="relative flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <Navlink href={redirectTo} variant="ghost" size="icon" icon="chevron_left" className="hover:bg-secondary absolute top-7 left-6 shrink-0">
        <span className="sr-only">go back</span>
      </Navlink>
      <div className="flex h-fit w-full flex-row gap-3 items-center pl-4 md:pl-1">
        <AvatarPicker workspace={data} />
        <div className="flex flex-col">
          <FormName workspace={data} />
          <FormDescription workspace={data} />
        </div>
      </div>
      <article className="mt-3 flex size-full flex-col gap-8 px-1 py-3 md:flex-row md:gap-4">
      </article>
    </section>
  );
}

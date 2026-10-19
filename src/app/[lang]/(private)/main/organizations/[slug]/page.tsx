import { redirect } from "next/navigation";
import { getPrivateRoute } from "@/routes/utils";
import { Navlink } from "@/shared/components";
import { trpc } from "@/trpc/server";

interface OrganizationProps {
  params: Promise<{ slug: string }>;
}

export default async function OrganizationDetail({ params }: OrganizationProps) {
  const redirectTo = getPrivateRoute("organizations");

  /* get brand slug and search if it exists in database */
  const { slug } = await params;
  const { data } = await trpc.organization.getBySlug({ param: slug });

  if (!slug || !data) redirect(redirectTo);

  return (
    <section className="relative flex size-full flex-col gap-4 px-4 py-5 md:px-14">
      <Navlink
        href={redirectTo}
        variant="ghost"
        size="icon"
        icon="chevron_left"
        className="hover:bg-secondary absolute top-7 left-6 shrink-0"
      >
        <span className="sr-only">go back</span>
      </Navlink>
      <div className="flex h-fit w-full flex-row items-center gap-3 pl-4 md:pl-1">{slug}</div>
      <article className="mt-3 flex size-full flex-col gap-8 px-1 py-3 md:flex-row md:gap-4"></article>
    </section>
  );
}

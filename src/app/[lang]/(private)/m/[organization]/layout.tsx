import { Aside, Navbar, Menu } from "@/modules/private/components";
import { QuickCapture } from "@/modules/task/components";
import { requireAuth } from "@/modules/auth/session";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-auto">
      <Navbar />
      <Aside child={<Menu />} />
      <main className="bg-background col-span-2 col-start-2 row-start-2 flex size-full min-h-0 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        <QuickCapture />
      </main>
    </div>
  );
}

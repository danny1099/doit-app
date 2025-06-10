import { HydrateClient } from "@/trpc/server";
import { Navbar } from "@/shared/components/ui";

export default async function Layout({ children }: Children) {
  return (
    <HydrateClient>
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar />
        {children}
      </div>
    </HydrateClient>
  );
}

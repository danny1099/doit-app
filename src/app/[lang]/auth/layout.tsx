import { Navbar } from "@/shared/components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-y-clip">
      <Navbar options={{ logo: true }} />
      <main className="bg-background size-full">{children}</main>
    </div>
  );
}

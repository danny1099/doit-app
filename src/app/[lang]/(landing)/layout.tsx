import { Navbar } from "@/shared/components/ui";

export default async function Layout({ children }: Children) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}

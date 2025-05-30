import { Navbar } from "@/shared/components/ui";

export default async function Layout({ children }: Children) {
  return (
    <div className="h-screen flex-1">
      <Navbar />
      {children}
    </div>
  );
}

import { getAuthSession } from "@/lib/auth";

export default async function Overview() {
  const user = await getAuthSession();

  return (
    <section>
      <h1>Overview</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}

import { getServerSession } from "next-auth";

export default async function Home() {
  const user = await getServerSession();

  return (
    <section>
      <h1>Home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}

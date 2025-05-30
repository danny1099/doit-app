import { sleep } from "@/shared/utils";

export default async function SignIn() {
  await sleep(3000);

  return (
    <section>
      <h1>Sign In</h1>
    </section>
  );
}

import { Heading, P } from "@/shared/components/ui";
import { FormAuth } from "@/modules/auth/components";

export default async function SignIn() {
  return (
    <section className="flex size-full flex-col items-center py-5">
      <Heading className="text-center text-xl md:text-3xl">Welcome Back to DoIt</Heading>
      <P className="text-center">Sign in to your account to continue and manage your tasks</P>

      <FormAuth />
    </section>
  );
}

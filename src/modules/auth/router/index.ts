import { compare, hash } from "bcryptjs";
import { procedure, router } from "@/trpc/init";
import { authSchema } from "@/modules/auth/schema";

export const authRouter = router({
  signInWithEmail: procedure.input(authSchema).query(async ({ ctx, input }) => {
    const { email, password } = input;

    /* check if user exists with email */
    const user = await ctx.db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("credentials_invalid");
    }

    /* check if password is valid compared to user password */
    const isValidPassword = await compare(password, user.password as string);
    if (!isValidPassword) {
      throw new Error("credentials_invalid");
    }

    return user;
  }),

  signUpWithEmail: procedure.input(authSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    /* check if user exists with email */
    const user = await ctx.db.user.findUnique({ where: { email } });
    if (user) {
      throw new Error("email_already_exists");
    }

    const newDate = new Date();
    const hashedPassword = await hash(password, 10);
    const newUser = await ctx.db.user
      .create({
        data: {
          email,
          password: hashedPassword,
          name: email.split("@")[0],
          createdAt: newDate,
          updatedAt: newDate,
        },
      })
      .catch((error) => console.log(error));

    return newUser;
  }),
});

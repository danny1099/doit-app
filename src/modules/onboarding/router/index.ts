import type { Workspace } from "@prisma/client";
import { procedure, router } from "@/trpc/init";
import { isBase64Image, slugSanitize, base64ToFile, tryCatch, generateRandomNumber } from "@/shared/utils";
import { onboardingSchema } from "@/modules/onboarding/schema";
import { uploadImage } from "@/shared/upload/cloudinary";
import { role } from "better-auth/plugins";

export const onboardingRouter = router({
  register: procedure.input(onboardingSchema).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { name, avatar, workspace, logo } = input;

    if (!ctx.userId)
      return {
        data: null,
        status: "error",
        message: "unauthorized",
        code: 401,
      };

    /* search if user exists with current signed in user */
    const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
    if (!user) {
      return {
        data: null,
        status: "error",
        message: "user_not_found",
        code: 409,
      };
    }

    const organizationName = `${name.split(" ")[0]}'s Org. Default`;
    const organizationSlug = slugSanitize(`${organizationName}-${generateRandomNumber(4)}`);

    const { data: orgData, error: orgError } = await tryCatch(
      ctx.db.organization.upsert({
        where: { slug: organizationSlug },
        update: {},
        create: {
          name: organizationName,
          slug: organizationSlug,
          status: "ACTIVE",
          userId: ctx.userId,
        },
      })
    );

    if (!orgData || orgError) {
      return {
        data: null,
        status: "error",
        message: "organization_error",
        code: 409,
      };
    }

    /* create user as member of organization*/
    await tryCatch(
      ctx.db.member.upsert({
        where: {
          userId_organizationId: {
            userId: ctx.userId,
            organizationId: orgData.id,
          },
        },
        create: {
          organizationId: orgData.id,
          userId: ctx.userId,
          role: "owner",
        },
        update: {
          status: "ACTIVE",
          updatedAt: new Date(),
        },
      })
    );

    /* convert workspace name to slug workspace does not exist */
    const workspaceSlug = slugSanitize(workspace);
    const { data: workspaceData } = await tryCatch(
      ctx.db.workspace.findUnique({
        where: { slug: workspaceSlug },
      })
    );

    if (workspaceData) {
      return {
        data: null,
        status: "error",
        message: "workspace_already_exists",
        code: 409,
      };
    }

    /* upload image logo to cloudinary and get secure url */
    const logoIsBase64 = isBase64Image(logo as string);
    const logoToFile = logoIsBase64 ? await base64ToFile(logo as string) : null;
    const logoUrl = logoToFile ? await uploadImage(logoToFile) : logo;

    const { data, error } = await tryCatch(
      ctx.db.workspace.create({
        data: {
          name: workspace,
          slug: workspaceSlug,
          logo: logoUrl,
          organizationId: orgData.id,
          userId: ctx.userId,
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        code: 500,
        message: "unknown_error",
        errorMessage: error?.message,
        error,
      };
    }

    /* upload image avatar to cloudinary and get secure url as avatar */
    const avatarIsBase64 = isBase64Image(avatar as string);
    const avatarToFile = avatarIsBase64 ? await base64ToFile(avatar as string) : null;
    const avatarUrl = avatarToFile ? await uploadImage(avatarToFile) : avatar;

    /* update user with workspace id and avatar url */
    const { data: userUpdate, error: userError } = await tryCatch(
      ctx.db.user.update({
        where: { id: ctx.userId },
        data: {
          name,
          image: avatarUrl,
          withOnboarding: true,
          activeWorkspaceId: data.id,
          activeOrganizationId: orgData.id,
          role: "owner",
        },
      })
    );

    if (userError || !userUpdate) {
      return {
        data: null,
        status: "error",
        code: 500,
        message: "onboarding_not_completed",
        errorMessage: userError?.message,
        error: userError,
      };
    }

    return {
      data,
      status: "success",
      message: "onboarding_completed",
      code: 200,
    };
  }),
});

import type { Workspace } from "@prisma/client";
import { authedProcedure, param, router } from "@/trpc/init";
import { uploadImage } from "@/shared/upload/cloudinary";
import { base64ToFile, isBase64Image, slugSanitize, tryCatch } from "@/shared/utils";
import { workspaceSchema, workspaceSchemaUpdate } from "@/modules/workspace/schema";
import type { WorkspacesList } from "@/modules/workspace/types";

export const workspaceRouter = router({
  create: authedProcedure.input(workspaceSchema).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { name, description, logo } = input;

    /* convert workspace name to slug and validate it does not exist */
    const slug = slugSanitize(name);
    const existWorkspace = await ctx.db.workspace.findUnique({ where: { slug } });
    if (existWorkspace) {
      return {
        data: null,
        status: "error",
        message: "workspace_already_exists",
        code: 409,
      };
    }

    /* upload image logo to cloudinary and get secure url as avatar */
    const imageIsBase64 = isBase64Image(logo as string);
    const imageToFile = imageIsBase64 ? await base64ToFile(logo as string) : null;
    const imageUrl = imageToFile ? await uploadImage(imageToFile) : logo;

    const { data, error } = await tryCatch(
      ctx.db.workspace.create({
        data: {
          name,
          slug,
          description,
          logo: imageUrl,
          userId: ctx.userId,
          organizationId: ctx.organizationId as string,
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

    return {
      data,
      status: "success",
      message: "workspace_created",
      code: 200,
    };
  }),

  update: authedProcedure.input(workspaceSchemaUpdate).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { id, ...rest } = input;

    /* validate workspace exists searching by id */
    const existWorkspace = await ctx.db.workspace.findUnique({ where: { id } });
    if (!existWorkspace) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 409,
      };
    }

    if (rest.name !== undefined) {
      const slug = slugSanitize(rest.name as string);
      if (slug !== existWorkspace.slug) {
        const slugExisting = await ctx.db.workspace.findFirst({ where: { slug, id: { not: id } } });
        if (slugExisting) {
          return {
            data: null,
            status: "error",
            message: "workspace_already_exists",
            code: 409,
          };
        }
      }
    }

    /* upload image avatar to cloudinary and get secure url as avatar */
    const imageIsBase64 = isBase64Image(rest.logo as string);
    const imageToFile = imageIsBase64 ? await base64ToFile(rest.logo as string) : null;
    const imageUrl = imageToFile ? await uploadImage(imageToFile) : rest.logo;

    const updateData = {
      ...(rest.name !== undefined && { name: rest.name }),
      ...(rest.slug !== undefined && { slug: rest.slug }),
      ...(rest.description !== undefined && { description: rest.description }),
      ...(rest.logo !== undefined && { logo: imageUrl }),
    };

    const { data, error } = await tryCatch(
      ctx.db.workspace.update({
        data: updateData,
        where: { id },
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

    return {
      data,
      status: "success",
      message: "workspace_updated",
      code: 200,
    };
  }),

  delete: authedProcedure.input(param).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { param: id } = input;

    /* validate workspace exists searching by id */
    const existWorkspace = await ctx.db.workspace.findUnique({ where: { id } });
    if (!existWorkspace) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 409,
      };
    }

    /* delete brand with id */
    const { data, error } = await tryCatch(ctx.db.workspace.delete({ where: { id } }));

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

    return {
      data,
      status: "success",
      message: "workspace_deleted",
      code: 200,
    };
  }),

  setWorkspaceAsDefault: authedProcedure.input(param).mutation<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { param: id } = input;

    /* validate workspace exists searching by id */
    const existWorkspace = await ctx.db.workspace.findUnique({ where: { id } });
    if (!existWorkspace) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 409,
      };
    }

    /* set workspace as default */
    const { data, error } = await tryCatch(
      ctx.db.user.update({
        data: { activeWorkspaceId: id },
        where: { id: ctx.userId },
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

    return {
      data: existWorkspace,
      status: "success",
      message: "workspace_set_default",
      code: 200,
    };
  }),

  getAllWorkspaces: authedProcedure.query<APIResult<WorkspacesList[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.workspace.findMany({
        where: { userId: ctx.userId },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    const result = data.map((item) => ({
      ...item,
      is_active: item.id === ctx.workspaceId,
    }));

    return {
      data: result,
      status: "success",
      message: null,
      code: 200,
    };
  }),

  getWorkspaceById: authedProcedure.input(param).query<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const { data, error } = await tryCatch(
      ctx.db.workspace.findUnique({
        where: { id },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: null,
      code: 200,
    };
  }),

  getWorkspaceBySlug: authedProcedure.input(param).query<APIResult<Workspace>>(async ({ ctx, input }) => {
    const { param: slug } = input;

    const { data, error } = await tryCatch(
      ctx.db.workspace.findUnique({
        where: { slug },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});

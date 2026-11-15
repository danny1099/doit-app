import type { List } from "@prisma/client";
import { authedProcedure, param, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import { listSchemaCreate, listSchemaUpdate } from "@/modules/list/schema";

export const listRouter = router({
  create: authedProcedure.input(listSchemaCreate).mutation<APIResult<List>>(async ({ ctx, input }) => {
    const { name, icon, mode, typeList, workspaceId } = input;

    const { data: workspace, error: workspaceError } = await tryCatch(
      ctx.db.workspace.findFirst({
        where: {
          ...(workspaceId ? { id: workspaceId } : {}),
          userId: ctx.userId,
          ...(ctx.organizationId ? { organizationId: ctx.organizationId } : {}),
        },
        orderBy: { createdAt: "asc" },
      })
    );

    if (workspaceError || !workspace) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 404,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.list.create({
        data: {
          name,
          icon: icon || "file:black",
          mode: mode || "PERSONAL",
          typeList: typeList || "LIST",
          workspaceId: workspace.id,
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

    return {
      data,
      status: "success",
      message: "list_created",
      code: 200,
    };
  }),

  update: authedProcedure.input(listSchemaUpdate).mutation<APIResult<List>>(async ({ ctx, input }) => {
    const { id, ...rest } = input;

    const { data: existingList } = await tryCatch(
      ctx.db.list.findFirst({
        where: {
          id,
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
      })
    );

    if (!existingList) {
      return {
        data: null,
        status: "error",
        message: "list_not_found",
        code: 404,
      };
    }

    const updateData = {
      ...(rest.name !== undefined && { name: rest.name }),
      ...(rest.icon !== undefined && { icon: rest.icon }),
      ...(rest.mode !== undefined && { mode: rest.mode }),
      ...(rest.typeList !== undefined && { typeList: rest.typeList }),
    };

    const { data, error } = await tryCatch(
      ctx.db.list.update({
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
      message: "list_updated",
      code: 200,
    };
  }),

  delete: authedProcedure.input(param).mutation<APIResult<List>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const { data: existingList } = await tryCatch(
      ctx.db.list.findUnique({
        where: { id },
      })
    );

    if (!existingList) {
      return {
        data: null,
        status: "error",
        message: "list_not_found",
        code: 404,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.list.delete({
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
      message: "list_deleted",
      code: 200,
    };
  }),

  getAll: authedProcedure.query<APIResult<List[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.list.findMany({
        where: {
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
        orderBy: { createdAt: "asc" },
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

  getById: authedProcedure.input(param).query<APIResult<List>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const { data, error } = await tryCatch(
      ctx.db.list.findFirst({
        where: {
          id,
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "list_not_found",
        errorMessage: error?.message,
        code: 404,
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

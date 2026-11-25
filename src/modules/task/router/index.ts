import type { Task } from "@prisma/client";
import { authedProcedure, param, router } from "@/trpc/init";
import { tryCatch } from "@/shared/utils";
import { taskSchemaCreate, taskSchemaUpdate } from "@/modules/task/schema";
import { TaskWithData } from "@/modules/task/types";

export const taskRouter = router({
  create: authedProcedure.input(taskSchemaCreate).mutation<APIResult<Task>>(async ({ ctx, input }) => {
    const { title, content, priority, type, status, dueDate, listId } = input;

    const { data: list, error: listError } = await tryCatch(
      ctx.db.list.findFirst({
        where: {
          id: listId,
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
      })
    );

    if (listError || !list) {
      return {
        data: null,
        status: "error",
        message: "list_not_found",
        code: 404,
      };
    }

    const parsedDueDate = dueDate ? new Date(dueDate) : undefined;
    if (parsedDueDate && Number.isNaN(parsedDueDate.getTime())) {
      return {
        data: null,
        status: "error",
        message: "validation_error",
        code: 422,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.task.create({
        data: {
          title,
          content: content || null,
          priority: priority || "MEDIUM",
          type: type || "DIGITAL",
          status: status || "TODO",
          dueDate: parsedDueDate,
          listId: list.id,
          workspaceId: list.workspaceId,
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
      message: "task_created",
      code: 200,
    };
  }),

  update: authedProcedure.input(taskSchemaUpdate).mutation<APIResult<Task>>(async ({ ctx, input }) => {
    const { id, listId, ...rest } = input;

    const { data: existingTask } = await tryCatch(
      ctx.db.task.findFirst({
        where: {
          id,
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
      })
    );

    if (!existingTask) {
      return {
        data: null,
        status: "error",
        message: "task_not_found",
        code: 404,
      };
    }

    let workspaceId = existingTask.workspaceId;

    if (listId && listId !== existingTask.listId) {
      const { data: list } = await tryCatch(
        ctx.db.list.findFirst({
          where: {
            id: listId,
            userId: ctx.userId,
            ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
          },
        })
      );

      if (!list) {
        return {
          data: null,
          status: "error",
          message: "list_not_found",
          code: 404,
        };
      }

      workspaceId = list.workspaceId;
    }

    const parsedDueDate = rest.dueDate !== undefined ? (rest.dueDate ? new Date(rest.dueDate) : null) : undefined;
    if (parsedDueDate instanceof Date && Number.isNaN(parsedDueDate.getTime())) {
      return {
        data: null,
        status: "error",
        message: "validation_error",
        code: 422,
      };
    }

    const updateData = {
      ...(rest.title !== undefined && { title: rest.title }),
      ...(rest.content !== undefined && { content: rest.content || null }),
      ...(rest.priority !== undefined && { priority: rest.priority }),
      ...(rest.type !== undefined && { type: rest.type }),
      ...(rest.status !== undefined && { status: rest.status }),
      ...(parsedDueDate !== undefined && { dueDate: parsedDueDate }),
      ...(listId !== undefined && { listId, workspaceId }),
    };

    const { data, error } = await tryCatch(
      ctx.db.task.update({
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
      message: "task_updated",
      code: 200,
    };
  }),

  delete: authedProcedure.input(param).mutation<APIResult<Task>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const { data: existingTask } = await tryCatch(
      ctx.db.task.findFirst({
        where: {
          id,
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
      })
    );

    if (!existingTask) {
      return {
        data: null,
        status: "error",
        message: "task_not_found",
        code: 404,
      };
    }

    const { data, error } = await tryCatch(ctx.db.task.delete({ where: { id } }));
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
      message: "task_deleted",
      code: 200,
    };
  }),

  getByList: authedProcedure.input(param).query<APIResult<Task[]>>(async ({ ctx, input }) => {
    const { param: listId } = input;

    const { data, error } = await tryCatch(
      ctx.db.task.findMany({
        where: {
          listId,
          userId: ctx.userId,
          ...(ctx.organizationId ? { workspace: { organizationId: ctx.organizationId } } : {}),
        },
        orderBy: { createdAt: "desc" },
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

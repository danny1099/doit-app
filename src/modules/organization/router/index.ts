import type { Organization } from "@prisma/client";
import { authedProcedure, param, router } from "@/trpc/init";
import { uploadImage } from "@/shared/upload/cloudinary";
import { base64ToFile, isBase64Image, slugSanitize, tryCatch } from "@/shared/utils";
import { organizationSchema, organizationSchemaUpdate } from "@/modules/organization/schema";
import type { OrganizationList } from "@/modules/organization/types";

export const organizationRouter = router({
  create: authedProcedure.input(organizationSchema).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { name, logo } = input;

    /* convert workspace name to slug and validate it does not exist */
    const slug = slugSanitize(name);
    const existOrganization = await ctx.db.organization.findUnique({ where: { slug } });
    if (existOrganization) {
      return {
        data: null,
        status: "error",
        message: "organization_already_exists",
        code: 409,
      };
    }

    /* upload image logo to cloudinary and get secure url as avatar */
    const imageIsBase64 = isBase64Image(logo as string);
    const imageToFile = imageIsBase64 ? await base64ToFile(logo as string) : null;
    const imageUrl = imageToFile ? await uploadImage(imageToFile) : logo;

    const { data, error } = await tryCatch(
      ctx.db.organization.create({
        data: {
          name,
          slug,
          logo: imageUrl,
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
      message: "organization_created",
      code: 200,
    };
  }),

  update: authedProcedure.input(organizationSchemaUpdate).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { id, ...rest } = input;

    /* validate workspace exists searching by id */
    const existOrganization = await ctx.db.organization.findUnique({ where: { id } });
    if (!existOrganization) {
      return {
        data: null,
        status: "error",
        message: "organization_not_found",
        code: 409,
      };
    }

    if (rest.name !== undefined) {
      const slug = slugSanitize(rest.name as string);
      if (slug !== existOrganization.slug) {
        const slugExisting = await ctx.db.organization.findFirst({ where: { slug, id: { not: id } } });
        if (slugExisting) {
          return {
            data: null,
            status: "error",
            message: "organization_already_exists",
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
      ...(rest.logo !== undefined && { logo: imageUrl }),
      ...(rest.domain !== undefined && { domain: rest.domain }),
    };

    const { data, error } = await tryCatch(
      ctx.db.organization.update({
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
      message: "organization_updated",
      code: 200,
    };
  }),

  delete: authedProcedure.input(param).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { param: id } = input;

    /* validate workspace exists searching by id */
    const existOrganization = await ctx.db.organization.findUnique({ where: { id } });
    if (!existOrganization) {
      return {
        data: null,
        status: "error",
        message: "organization_not_found",
        code: 409,
      };
    }

    /* delete brand with id */
    const { data, error } = await tryCatch(ctx.db.organization.delete({ where: { id } }));
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
      message: "organization_deleted",
      code: 200,
    };
  }),

  makeAsDefault: authedProcedure.input(param).mutation<APIResult<Organization>>(async ({ ctx, input }) => {
    const { param: id } = input;

    /* validate workspace exists searching by id */
    const existOrganization = await ctx.db.organization.findUnique({ where: { id } });
    if (!existOrganization) {
      return {
        data: null,
        status: "error",
        message: "organization_not_found",
        code: 409,
      };
    }

    /* set workspace as default */
    const { data, error } = await tryCatch(
      ctx.db.user.update({
        data: { activeOrganizationId: id },
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
      data: existOrganization,
      status: "success",
      message: "organization_set_default",
      code: 200,
    };
  }),

  getAll: authedProcedure.query<APIResult<OrganizationList[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.organization.findMany({
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
      is_active: item.id === ctx.organizationId,
    }));

    return {
      data: result,
      status: "success",
      message: null,
      code: 200,
    };
  }),

  getById: authedProcedure.input(param).query<APIResult<Organization>>(async ({ ctx, input }) => {
    const { param: id } = input;

    const { data, error } = await tryCatch(
      ctx.db.organization.findUnique({
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

  getBySlug: authedProcedure.input(param).query<APIResult<Organization>>(async ({ ctx, input }) => {
    const { param: slug } = input;

    const { data, error } = await tryCatch(
      ctx.db.organization.findUnique({
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

import { Organization } from "@prisma/client";

export interface OrganizationList extends Organization {
  is_active: boolean;
  members?: number;
  role?: string;
}

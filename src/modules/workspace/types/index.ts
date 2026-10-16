import { Workspace } from "@prisma/client";

export interface WorkspacesList extends Workspace {
  is_active: boolean;
}

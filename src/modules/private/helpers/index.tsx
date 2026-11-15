import type { MenuItem, Segment } from "@/modules/private/types";
import { ListsWidget } from "@/modules/list/components";

export type MenuView = "admin" | "hub";

export const menuSegments: Segment[] = [
  {
    group: "main",
    styles: "shrink-0",
  },
  {
    group: "component",
    styles: "shrink-0",
    child: <ListsWidget />,
  },
] as const;

export const menuItems: MenuItem[] = [
  {
    name: "overview",
    path: "overview",
    render: "link",
    place: "main",
    icon: "home",
  },
  {
    name: "organizations",
    path: "organizations",
    render: "link",
    place: "main",
    icon: "building",
  },
  { name: "tasks", path: "tasks", render: "link", place: "main", icon: "task" },
  { name: "workspaces", path: "workspaces", render: "link", place: "main", icon: "workspace" },
] as const;

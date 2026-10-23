import type { MenuItem, Segment } from "@/modules/private/types";

export type MenuView = "admin" | "hub";

export const menuSegments: Segment[] = [
  {
    group: "main",
    styles: "shrink-0",
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
  { name: "workspaces", path: "workspaces", render: "link", place: "main", icon: "workspace" },
] as const;

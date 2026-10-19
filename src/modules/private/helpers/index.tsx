import type { MenuItem, Segment } from "@/modules/private/types";

export type MenuView = "admin" | "hub";

export const menuSegments: Segment[] = [
  {
    group: "main",
    styles: "shrink-0",
  },
  {
    group: "platform",
    styles: "mt-10",
    title: "Platform",
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
] as const;

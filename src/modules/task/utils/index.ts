import { IconName } from "@/shared/components";
import type { TaskViewKey } from "@/modules/task/types";

export interface View {
  name: string;
  label: TaskViewKey;
  icon: IconName;
}

export const views: View[] = [
  {
    name: "list",
    label: "list",
    icon: "list",
  },
  {
    name: "kanban",
    label: "kanban",
    icon: "kanban",
  },
  {
    name: "table",
    label: "table",
    icon: "table",
  },
  {
    name: "calendar",
    label: "calendar",
    icon: "calendar",
  },
];

export const VIEW_LIST_STORAGE_KEY = "doit.view-list";

export const getStoredViewList = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(VIEW_LIST_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveViewList = (views: string[]): string[] => {
  if (typeof window === "undefined") return views;

  try {
    window.localStorage.setItem(VIEW_LIST_STORAGE_KEY, JSON.stringify(views));
  } catch {}

  return views;
};

export const addViewToStorage = (viewName: string): string[] => {
  const currentViews = getStoredViewList();
  if (currentViews.includes(viewName)) return currentViews;

  const updatedViews = [...currentViews, viewName];
  return saveViewList(updatedViews);
};

export const removeViewFromStorage = (viewName: string): string[] => {
  const currentViews = getStoredViewList();
  const updatedViews = currentViews.filter((view) => view !== viewName);
  return saveViewList(updatedViews);
};

export const reorderView = (listView: View[], currentView: string) => {
  if (!currentView) return listView;

  const isCurrentViewOnList = listView.some((view) => view.name === currentView);
  if (!isCurrentViewOnList) {
    const baseView = [...listView.slice(0, 2), ...views.filter((v) => v.name === currentView)];
    return baseView;
  }

  return listView;
};

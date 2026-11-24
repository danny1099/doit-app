import { IconName } from "@/shared/components";
import {
  DEFAULT_TASK_TABLE_COLUMNS,
  TASK_TABLE_MIN_COLUMN_WIDTH,
  type TaskTableColumnId,
  type TaskTableColumnLayout,
  type TaskTableLayout,
  type TaskViewKey,
} from "@/modules/task/types";

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
export const ACTIVE_VIEW_STORAGE_KEY = "doit.active-view";
export const TASK_TABLE_LAYOUT_STORAGE_KEY = "doit.task-table-layout";

const TASK_TABLE_COLUMN_IDS = DEFAULT_TASK_TABLE_COLUMNS.map((column) => column.id);

const isTaskTableColumnId = (value: unknown): value is TaskTableColumnId =>
  typeof value === "string" && TASK_TABLE_COLUMN_IDS.includes(value as TaskTableColumnId);

export const getDefaultTaskTableLayout = (): TaskTableColumnLayout[] =>
  DEFAULT_TASK_TABLE_COLUMNS.map((column) => ({ ...column }));

export const normalizeTaskTableLayout = (layout?: Partial<TaskTableLayout> | null): TaskTableColumnLayout[] => {
  const defaults = getDefaultTaskTableLayout();
  const defaultById = new Map(defaults.map((column) => [column.id, column]));
  const widths = layout?.widths ?? {};
  const seen = new Set<TaskTableColumnId>();
  const orderedIds: TaskTableColumnId[] = [];

  for (const id of layout?.order ?? []) {
    if (isTaskTableColumnId(id) && !seen.has(id)) {
      orderedIds.push(id);
      seen.add(id);
    }
  }

  for (const id of TASK_TABLE_COLUMN_IDS) {
    if (!seen.has(id)) orderedIds.push(id);
  }

  return orderedIds.map((id) => {
    const fallback = defaultById.get(id)!;
    const width = widths[id];
    return {
      id,
      width:
        typeof width === "number" && Number.isFinite(width)
          ? Math.max(TASK_TABLE_MIN_COLUMN_WIDTH, Math.round(width))
          : fallback.width,
    };
  });
};

export const getStoredTaskTableLayout = (): TaskTableColumnLayout[] => {
  if (typeof window === "undefined") return getDefaultTaskTableLayout();

  try {
    const raw = window.localStorage.getItem(TASK_TABLE_LAYOUT_STORAGE_KEY);
    if (!raw) return getDefaultTaskTableLayout();
    return normalizeTaskTableLayout(JSON.parse(raw) as Partial<TaskTableLayout>);
  } catch {
    return getDefaultTaskTableLayout();
  }
};

export const saveTaskTableLayout = (layout: TaskTableColumnLayout[]): TaskTableColumnLayout[] => {
  const normalized = normalizeTaskTableLayout({
    order: layout.map((column) => column.id),
    widths: Object.fromEntries(layout.map((column) => [column.id, column.width])) as TaskTableLayout["widths"],
  });

  if (typeof window === "undefined") return normalized;

  try {
    window.localStorage.setItem(
      TASK_TABLE_LAYOUT_STORAGE_KEY,
      JSON.stringify({
        order: normalized.map((column) => column.id),
        widths: Object.fromEntries(normalized.map((column) => [column.id, column.width])),
      } satisfies TaskTableLayout),
    );
  } catch {}

  return normalized;
};

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

export const saveActiveView = (viewName: string): string => {
  if (typeof window === "undefined") return viewName;

  try {
    window.localStorage.setItem(ACTIVE_VIEW_STORAGE_KEY, viewName);
  } catch {}

  return viewName;
};

export const getStoredActiveView = (): string => {
  if (typeof window === "undefined") return "list";

  try {
    const raw = window.localStorage.getItem(ACTIVE_VIEW_STORAGE_KEY);
    if (!raw) return "list";
    return raw as string;
  } catch {
    return "list";
  }
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

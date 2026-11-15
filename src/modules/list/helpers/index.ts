export const ACTIVE_LIST_STORAGE_KEY = "doit.active-list.v1";

export const getStoredActiveListId = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(ACTIVE_LIST_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const storeActiveListId = (listId: string) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ACTIVE_LIST_STORAGE_KEY, listId);
  } catch {}
};

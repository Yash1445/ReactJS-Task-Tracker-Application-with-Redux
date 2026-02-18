const STORAGE_KEY = 'task_tracker_v1';

export interface PersistedState {
  tasks: unknown;
}

export const safeLoadState = (): PersistedState | undefined => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return undefined;
    return parsed;
  } catch {
    return undefined;
  }
};

export const safeSaveState = (state: PersistedState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail to avoid breaking UX if storage is unavailable
  }
};

export { STORAGE_KEY };
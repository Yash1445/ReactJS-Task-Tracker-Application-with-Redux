import { Middleware } from '@reduxjs/toolkit';
import { safeSaveState } from '../../utils/localStorage';

export const localStorageMiddleware: Middleware = (api) => (next) => (action) => {
  const result = next(action);
  const state = api.getState() as { tasks?: { items?: unknown[] } };
  safeSaveState({ tasks: state.tasks?.items ?? [] });
  return result;
};

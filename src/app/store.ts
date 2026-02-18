import { configureStore, Middleware } from '@reduxjs/toolkit';
import tasksReducer, { rehydrateTasks } from '../features/tasks/tasksSlice';
import { safeLoadState, safeSaveState } from '../utils/localStorage';

const persistenceMiddleware: Middleware = (api) => (next) => (action) => {
  const result = next(action);
  safeSaveState({ tasks: api.getState().tasks.items });
  return result;
};

const preloaded = safeLoadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistenceMiddleware)
});

if (preloaded?.tasks && Array.isArray(preloaded.tasks)) {
  store.dispatch(rehydrateTasks(preloaded.tasks));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
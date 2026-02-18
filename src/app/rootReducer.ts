import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';

export const rootReducer = combineReducers({
  tasks: tasksReducer
});

export type RootStateCompat = ReturnType<typeof rootReducer>;

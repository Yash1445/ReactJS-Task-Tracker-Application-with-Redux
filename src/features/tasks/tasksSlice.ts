import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../../app/store';
import { Task, TaskFilter, TasksState } from '../../types/task';

const initialState: TasksState = {
  items: [],
  filter: 'all',
  search: '',
  loading: false,
  error: null
};

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, { getState }) => {
  await wait(450);
  const state = getState() as RootState;
  return state.tasks.items;
});

interface CreateTaskInput {
  title: string;
  description: string;
  priority: Task['priority'];
  tags: string[];
}

interface UpdateTaskInput {
  id: string;
  changes: Partial<Pick<Task, 'title' | 'description' | 'priority' | 'tags'>>;
}

export const createTask = createAsyncThunk('tasks/create', async (payload: CreateTaskInput, { getState }) => {
  await wait();
  const state = getState() as RootState;
  const nextOrder = state.tasks.items.length;
  return {
    id: crypto.randomUUID(),
    title: payload.title.trim(),
    description: payload.description.trim(),
    priority: payload.priority,
    tags: payload.tags,
    completed: false,
    createdAt: new Date().toISOString(),
    order: nextOrder
  } as Task;
});

export const updateTask = createAsyncThunk('tasks/update', async (payload: UpdateTaskInput) => {
  await wait();
  return payload;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await wait(180);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload.map((item, index) => ({ ...item, order: index }));
    },
    rehydrateTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch tasks.';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const target = state.items.find((item) => item.id === action.payload.id);
        if (target) {
          Object.assign(target, action.payload.changes);
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  }
});

export const { setFilter, setSearch, toggleTaskStatus, reorderTasks, rehydrateTasks } = tasksSlice.actions;

const selectTasksState = (state: RootState) => state.tasks;

export const selectTasks = createSelector([selectTasksState], (tasksState) =>
  [...tasksState.items].sort((a, b) => a.order - b.order)
);

export const selectTaskStats = createSelector([selectTasks], (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const byPriority = {
    high: tasks.filter((task) => task.priority === 'high').length,
    medium: tasks.filter((task) => task.priority === 'medium').length,
    low: tasks.filter((task) => task.priority === 'low').length
  };

  return {
    total,
    completed,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
    byPriority
  };
});

export const selectVisibleTasks = createSelector([selectTasksState, selectTasks], (state, tasks) => {
  const q = state.search.trim().toLowerCase();

  return tasks.filter((task) => {
    const statusMatch =
      state.filter === 'all' || (state.filter === 'active' && !task.completed) || (state.filter === 'completed' && task.completed);

    const searchMatch =
      !q || task.title.toLowerCase().includes(q) || task.description.toLowerCase().includes(q);

    return statusMatch && searchMatch;
  });
});

export default tasksSlice.reducer;
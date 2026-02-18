export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string[];
  completed: boolean;
  createdAt: string;
  order: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TasksState {
  items: Task[];
  filter: TaskFilter;
  search: string;
  loading: boolean;
  error: string | null;
}
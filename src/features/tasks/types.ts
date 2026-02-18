export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string[];
  completed: boolean;
  createdAt: number;
  order: number;
}

export interface TasksState {
  items: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
}
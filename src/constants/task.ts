import { TaskPriority } from '../types/task';

export const PRIORITY_OPTIONS: TaskPriority[] = ['low', 'medium', 'high'];

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-green-100 text-green-700'
};
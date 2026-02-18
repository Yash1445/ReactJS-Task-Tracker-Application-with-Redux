import { memo } from 'react';
import { PRIORITY_COLORS } from '../../constants/task';
import { deleteTask, toggleTaskStatus } from '../../features/tasks/tasksSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Task } from '../../types/task';
import { Button } from '../ui/Button';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard = memo(({ task, onEdit }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <article className="card">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className={`font-semibold ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{task.description || 'No description provided.'}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span key={`${task.id}-${tag}`} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => dispatch(toggleTaskStatus(task.id))}>
          {task.completed ? 'Mark Active' : 'Mark Done'}
        </Button>
        <Button variant="secondary" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => dispatch(deleteTask(task.id))}>
          Delete
        </Button>
      </div>
    </article>
  );
});
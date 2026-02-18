import { FormEvent, useEffect, useState } from 'react';
import { PRIORITY_OPTIONS } from '../../constants/task';
import { createTask, updateTask } from '../../features/tasks/tasksSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Task } from '../../types/task';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Props {
  editingTask?: Task | null;
  onDone?: () => void;
}

export const TaskForm = ({ editingTask, onDone }: Props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editingTask) return;
    setTitle(editingTask.title);
    setDescription(editingTask.description);
    setPriority(editingTask.priority);
    setTagsInput(editingTask.tags.join(', '));
  }, [editingTask]);

  const reset = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setTagsInput('');
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (editingTask) {
      await dispatch(updateTask({ id: editingTask.id, changes: { title, description, priority, tags } }));
      onDone?.();
      return;
    }

    await dispatch(createTask({ title, description, priority, tags }));
    reset();
  };

  return (
    <form className="card space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold">{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" maxLength={100} />
      <textarea
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        rows={3}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500">Priority</label>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
          >
            {PRIORITY_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)} Priority
              </option>
            ))}
          </select>
        </div>
        <Input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Tags (comma separated)"
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit">{editingTask ? 'Save Changes' : 'Add Task'}</Button>
        {editingTask ? (
          <Button type="button" variant="secondary" onClick={onDone}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
};
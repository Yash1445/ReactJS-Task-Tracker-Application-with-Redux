import { useCallback, useEffect, useState } from 'react';
import { ExportTasksButton } from '../components/tasks/ExportTasksButton';
import { SearchBar } from '../components/tasks/SearchBar';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { Skeleton } from '../components/ui/Skeleton';
import { fetchTasks, selectVisibleTasks } from '../features/tasks/tasksSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { Task } from '../types/task';

const TasksPage = () => {
  const dispatch = useAppDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const tasks = useAppSelector(selectVisibleTasks);
  const loading = useAppSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = useCallback((task: Task) => setEditingTask(task), []);

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Task Tracker</h1>
        <ExportTasksButton />
      </header>

      <TaskForm editingTask={editingTask} onDone={() => setEditingTask(null)} />

      <div className="card space-y-3">
        <SearchBar />
        <TaskFilters />
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <TaskList tasks={tasks} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default TasksPage;
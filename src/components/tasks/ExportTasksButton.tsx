import { useAppSelector } from '../../hooks/useAppSelector';
import { selectTasks } from '../../features/tasks/tasksSlice';
import { Button } from '../ui/Button';

export const ExportTasksButton = () => {
  const tasks = useAppSelector(selectTasks);

  const onExport = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tasks-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" onClick={onExport} disabled={!tasks.length}>
      Export JSON
    </Button>
  );
};
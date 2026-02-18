import { useAppSelector } from '../../hooks/useAppSelector';
import { selectTaskStats } from '../../features/tasks/tasksSlice';

export const StatsPanel = () => {
  const stats = useAppSelector(selectTaskStats);

  return (
    <section className="card space-y-3">
      <h2 className="text-lg font-semibold">Task Statistics</h2>
      <p className="text-sm text-slate-600">
        {stats.completed}/{stats.total} completed ({stats.completionRate}%)
      </p>
      <div className="h-2 w-full rounded bg-slate-200">
        <div className="h-2 rounded bg-blue-600" style={{ width: `${stats.completionRate}%` }} />
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-red-600">High</span>
          <span>{stats.byPriority.high}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-amber-600">Medium</span>
          <span>{stats.byPriority.medium}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-green-600">Low</span>
          <span>{stats.byPriority.low}</span>
        </div>
      </div>
    </section>
  );
};
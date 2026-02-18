import { setFilter } from '../../features/tasks/tasksSlice';
import { TaskFilter } from '../../types/task';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const tabs: TaskFilter[] = ['all', 'active', 'completed'];

export const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.tasks.filter);

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`rounded-lg px-3 py-1.5 text-sm capitalize ${selected === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          onClick={() => dispatch(setFilter(tab))}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
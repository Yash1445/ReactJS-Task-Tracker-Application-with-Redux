import { StatsPanel } from '../components/tasks/StatsPanel';

const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <StatsPanel />
    </div>
  );
};

export default DashboardPage;
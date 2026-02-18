import { Suspense, lazy } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

const TasksPage = lazy(() => import('./TasksPage'));
const DashboardPage = lazy(() => import('./DashboardPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

export const AppRouter = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl gap-2 p-3">
          <NavLink
            to="/"
            className={({ isActive }) => `rounded px-3 py-1.5 text-sm ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
          >
            Tasks
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `rounded px-3 py-1.5 text-sm ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      <Suspense fallback={<div className="p-6 text-center text-slate-500">Loading...</div>}>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
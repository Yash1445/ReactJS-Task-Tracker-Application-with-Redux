# ReactJS Task Tracker Application (Redux Toolkit)

Production-grade task tracker built with React 18 + Redux Toolkit + TypeScript, designed as a senior-level frontend assignment.

## Features

### Core
- Task CRUD (create, edit, delete)
- Task completion toggle
- Filter tabs: All / Active / Completed
- Debounced search (title + description)
- Categories/tags and priority levels (low/medium/high)
- Drag-and-drop reordering with persisted order

### Architecture / Engineering
- React 18 functional components + hooks
- Redux Toolkit + thunk (`createAsyncThunk`)
- Memoized selectors with `reselect`
- localStorage persistence middleware + safe rehydration
- ErrorBoundary + defensive localStorage parsing
- Route-level lazy loading (React Router v6)
- Mobile-first Tailwind UI

### Bonus Implemented
1. Statistics dashboard (completion rate + priority distribution)
2. Export tasks as JSON

## Tech Stack
- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router v6
- Tailwind CSS
- @hello-pangea/dnd

## Project Structure

```text
src/
  app/
    store.ts
  features/
    tasks/
      tasksSlice.ts
  components/
    ui/
      Button.tsx
      Input.tsx
      Skeleton.tsx
      ErrorBoundary.tsx
    tasks/
      TaskForm.tsx
      TaskCard.tsx
      TaskList.tsx
      TaskFilters.tsx
      SearchBar.tsx
      StatsPanel.tsx
      ExportTasksButton.tsx
      EmptyState.tsx
  hooks/
    useAppDispatch.ts
    useAppSelector.ts
    useDebounce.ts
  pages/
    AppRouter.tsx
    TasksPage.tsx
    DashboardPage.tsx
    NotFoundPage.tsx
  utils/
    localStorage.ts
  constants/
    task.ts
  types/
    task.ts
  main.tsx
  index.css
```

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Architecture Notes

- `tasksSlice.ts` keeps all task-domain logic together (actions, async thunks, selectors).
- `createAsyncThunk` is used to simulate async server behavior while keeping architecture API-ready.
- Derived data is computed using memoized selectors (`selectVisibleTasks`, `selectTaskStats`) for performance.
- localStorage persistence is handled in middleware (separation of concerns, no persistence logic inside components).
- Reordering updates a stable `order` field to persist drag-and-drop positions across reloads.


## Future Improvements
- Add unit tests (Redux slice + selectors)
- Add integration tests (RTL)
- Add keyboard-first drag-and-drop accessibility enhancements
- Add import-from-JSON flow

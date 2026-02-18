import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useMemo } from 'react';
import { reorderTasks } from '../../features/tasks/tasksSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Task } from '../../types/task';
import { EmptyState } from './EmptyState';
import { TaskCard } from './TaskCard';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export const TaskList = ({ tasks, onEdit }: Props) => {
  const dispatch = useAppDispatch();

  const ids = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = [...tasks];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    dispatch(reorderTasks(reordered));
  };

  if (!tasks.length) return <EmptyState />;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
            {tasks.map((task, index) => (
              <Draggable draggableId={ids[index]} index={index} key={task.id}>
                {(dragProvided) => (
                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                    <TaskCard task={task} onEdit={onEdit} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
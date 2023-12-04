/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { ITask } from '@/models/common';
import KanbanCol from './KanbanCol';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import useProjectFetch from '@/hooks/useProjectFetch';

type KanBanProps = {
  taskData: ITask[] | null,
}

type columnId = 'TODO' | 'IN PROGRESS' | 'DONE' | 'WAIVED';

type columnType = {
  title: string;
  id: columnId;
  list: [] | ITask[];
}

const initialColumns: Record<columnId, columnType> = {
  'TODO': {
    title: 'Todo',
    id: 'TODO',
    list: [],
  },
  'IN PROGRESS': {
    title: 'In Progress',
    id: 'IN PROGRESS',
    list: [],
  },
  'DONE': {
    title: 'Done',
    id: 'DONE',
    list: [],
  },
  'WAIVED': {
    title: 'Waived',
    id: 'WAIVED',
    list: [],
  },
};

const Kanban = ({ taskData }: KanBanProps) => {
  const { currentUser } = useAuth();
  const { setRequest } = useProjectFetch();
  const [columnTasks, setColumnTasks] = useState<Record<columnId, columnType>>(initialColumns);

  const handleTaskStatusChange = (task: ITask, endStatus: columnId) => {
    setRequest({
      uId: currentUser.uid,
      projectId: task.project as string,
      method: 'PATCH',
      taskId: task.id,
      accessToken: currentUser.accessToken,
      body: {
        name: task.name,
        id: task.id,
        status: endStatus,
        project: task.project,
        start: task.start,
        end: task.end,
        description: 'none',
        progress: task.progress,
        type: task.type,
        updateTime: new Date(),
      },
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination && result.destination === undefined) return null;
  
    const { source, destination } = result;
    console.log('source & dest', [source, destination]);
  
    if (source.droppableId === destination?.droppableId) return null;

    const start = columnTasks[source.droppableId as columnId];
    const end = columnTasks[destination?.droppableId as columnId];
    console.log('start & end', [start, end]);
    if (start.id !== end.id) {
      const movingTask = columnTasks[start.id].list.filter((_: ITask, idx: number)  => idx === source.index)[0];
      const newStartList = columnTasks[start.id].list.filter((_: ITask, idx: number)  => idx !== source.index);
      const newStartCol = {
        id: start.id,
        title: start.title,
        list: newStartList,
      };
      const newEndList = columnTasks[end.id].list;
      newEndList.splice(destination!.index, 0, start.list[source.index]);
      newEndList.sort((a, b) => {
        const startDateA = a.start.getTime();
        const startDateB = b.start.getTime();
        return startDateA - startDateB;
      })
      const newEndCol = {
        id: end.id,
        title: end.title,
        list: newEndList,
      };
      console.log('moving one', movingTask);
      console.log('newStartList, newEndList', [newStartList, newEndList]);
      setColumnTasks((current: Record<columnId, columnType>) => ({
        ...current,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }))
      handleTaskStatusChange(movingTask, end.id);
    }
  };  

  useEffect(() => {
    if (taskData) {
      setColumnTasks({
        TODO: {
          id: 'TODO',
          title: 'Todo',
          list: taskData.filter(task => task.status === 'TODO'),
        },
        'IN PROGRESS': {
          id: 'IN PROGRESS',
          title: 'In Progress',
          list: taskData.filter(task => task.status === 'IN PROGRESS'),
        },
        DONE: {
          id: 'DONE',
          title: 'Done',
          list: taskData.filter(task => task.status === 'DONE'),
        },
        WAIVED: {
          id: 'WAIVED',
          title: 'Waived',
          list: taskData.filter(task => task.status === 'WAIVED'),
        },
      });
    }
    console.log('kanban, taskData', taskData);
  }, [taskData])  

  useEffect(() => console.log('columnTasks', columnTasks), [columnTasks])

  return (
    <div className='w-full flex gap-8'>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {Object.values(columnTasks).map((col) => (
          <KanbanCol
            key={col.id}
            id={col.id}
            title={col.title}
            taskData={columnTasks[col.id].list}
          />
      ))}
      </DragDropContext>
    </div>
  )
}

export default Kanban
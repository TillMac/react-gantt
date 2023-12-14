/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '@/context/AuthContext';
import useProjectFetch from '@/hooks/useProjectFetch';
import { ITask } from '@/models/common';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import GanttViewSelector from './GanttViewSelector';

type Props = {
  taskData: ITask[] | null,
  setReloadProjectDataCount: Dispatch<SetStateAction<number>>,
}

const GanttChart: React.FC<Props> = ({ taskData, setIsEditModalOpen, setIsDeleteModalOpen, setModalTask, setReloadProjectDataCount }) => {
  const [isMatchXl, setIsMatchXl] = useState<boolean>(window.matchMedia('(min-width: 1440px)').matches);
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const { currentUser } = useAuth();
  const { setRequest } = useProjectFetch();

  let preStepsCount: number = 3;
  let columnWidth: number = 55;
  if (view === ViewMode.Year) {
    columnWidth = 550;
    preStepsCount = 0;
  } else if (view === ViewMode.Month) {
    columnWidth = 500;
    preStepsCount = 0;
  } else if (view === ViewMode.Week) {
    columnWidth = 450;
    preStepsCount = 0.5;
  }

  useEffect(() => {
    window.matchMedia('(min-width: 1440px)').addEventListener('change', e => setIsMatchXl(e.matches));
  }, []);

  const handleTaskChange = (task: Task) => {
    if (taskData) {
      const newTasks: any = taskData.map(t => (t.id === task.id ? task : t));
      console.log('newTasks', newTasks);
      const editedTask: ITask = newTasks.find((newTask: Task) =>
        taskData.some((oldTask: ITask) =>
          oldTask.id === newTask.id && 
          (oldTask.start.getTime() !== newTask.start.getTime() ||
          oldTask.end.getTime() !== newTask.end.getTime())
        )
      );
      console.log('editedTask', editedTask);
      if (editedTask) {
        setRequest({
          uId: currentUser.uid,
          projectId: editedTask.project as string,
          method: 'PATCH',
          taskId: editedTask.id,
          accessToken: currentUser.accessToken,
          body: {
            name: editedTask.name,
            id: editedTask.id,
            status: editedTask.status,
            project: editedTask.project as string,
            start: editedTask.start,
            end: editedTask.end,
            description: 'none',
            progress: editedTask.progress,
            type: editedTask.type as 'task' || 'milestone',
            updateTime: new Date(),
          }
        })
      }
      setReloadProjectDataCount((number) => number += 1);
    }
  };

  const handleProgressChange = async(task: Task) => {
    setRequest({
      uId: currentUser.uid,
      projectId: task.project as string,
      method: 'PATCH',
      taskId: task.id,
      accessToken: currentUser.accessToken,
      body: {
        name: task.name,
        id: task.id,
        start: task.start,
        end: task.end,
        description: 'none',
        project: task.project as string,
        progress: task.progress,
        type: task.type as 'task' || 'milestone',
        updateTime: new Date(),
      },
    })
    setReloadProjectDataCount((number) => number += 1);
  };

  return (
    <div style={{ maxWidth: (isMatchXl) ? '1492px' : '850px'}}>
      {(taskData === null) ? (<pre>No Data.</pre>) : (
        <>
          <GanttViewSelector onViewModeChange={viewMode => setView(viewMode)} />
          <Gantt
            preStepsCount={preStepsCount}
            viewMode={view}
            tasks={taskData}
            onDelete={handleTaskDelete}
            onProgressChange={handleProgressChange}
            onDateChange={handleTaskChange}
            listCellWidth=''
            columnWidth={columnWidth}
            todayColor='#ff9e1f1a'
            barProgressColor='#81B8EF'
            barProgressSelectedColor='#1A76D2'
            barCornerRadius={12}
          />
        </>
      )}
    </div>
  )
}

export default GanttChart;

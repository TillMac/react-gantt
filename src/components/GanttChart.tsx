/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '@/context/AuthContext';
import useProjectFetch from '@/hooks/useProjectFetch';
import { ITask } from '@/models/common';
import { Gantt, Task } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  taskData: ITask[] | null,
  setReloadProjectData: Dispatch<SetStateAction<boolean>>,
}

const GanttChart = ({ taskData, setReloadProjectData }: Props) => {
  const [isMatchXl, setIsMatchXl] = useState<boolean>(window.matchMedia('(min-width: 1440px)').matches);
  const { currentUser } = useAuth();
  const { setRequest } = useProjectFetch();

  useEffect(() => {
    window.matchMedia('(min-width: 1440px)').addEventListener('change', e => setIsMatchXl(e.matches));
  }, []);

  const handleTaskChange = (task: Task) => {
    if (taskData) {
      const newTasks: any = taskData.map(t => (t.id === task.id ? task : t));
      console.log('newTasks', newTasks);
      const editedTask: Task = newTasks.find((newTask: Task) =>
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
      // setReloadProjectData(true);
    }
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm(`Are you sure you want to delete ${task.name}?`);
    if (conf) {
      setRequest({
        uId: currentUser.uid,
        projectId: task.project as string,
        method: 'DELETE',
        taskId: task.id,
        accessToken: currentUser.accessToken,
      });
      setReloadProjectData(true);
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
    setReloadProjectData(true);
  };

  return (
    <div style={{ maxWidth: (isMatchXl) ? '1492px' : '850px'}}>
      {(taskData === null) ? (<pre>No Data.</pre>) : (
        <Gantt
          tasks={taskData}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDateChange={handleTaskChange}
        />
      )}
    </div>
  )
}

export default GanttChart;

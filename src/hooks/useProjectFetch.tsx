import { HttpMethod, ITask, fetchUrl } from '@/models/common';
import { useState, useEffect, useCallback } from 'react';

type ProjectId = string | null;
type TaskId = string | null;

type RequestSchema = {
  uId: string,
  projectId: string,
  method: HttpMethod,
  taskId?: string,
  accessToken?: string | null,
  body?: ITask | null,
};

type UId = null | string;
type AccessToken = null | string;

const useProjectFetch = (initialUId: UId = null, initialProjectId: ProjectId = null, initialMethod: HttpMethod = 'GET', initialAccessToken: AccessToken = '', initialBody = null) => {
  // 狀態管理
  const [data, setData] = useState<ITask[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uId, setUId] = useState<UId>(initialUId);
  const [accessToken, setAccessToken] = useState<AccessToken>(initialAccessToken);
  const [projectId, setProjectId] = useState<ProjectId>(initialProjectId);
  const [taskId, setTaskId] = useState<TaskId>(null)
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [body, setBody] = useState<ITask | null>(initialBody);
  const [requestcount, setRequestCount] = useState<number>(0);

  const fetchProjectData = useCallback(
    async () => {
      setIsLoading(true);
      let url = `${fetchUrl}${uId}/${projectId}.json?auth=${accessToken}`
      if (method !== 'GET') {
        url = `${fetchUrl}${uId}/${projectId}/${taskId}.json?auth=${accessToken}`
      }

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        // 若是 DELETE method 可能沒有回傳內容
        const responseData = method === 'DELETE' ? {message: 'Delete susscessfully.'} : await response.json();
        if (!responseData) {
          setData(null);
        }
        console.log('responseData', responseData);
        if (method === 'GET') {
          const tasksArray: ITask[] = Object.values(responseData);
          console.log('tasksArray', tasksArray);
          const transformedTasksArray = tasksArray.map((task: ITask) => {
            const startDate: Date = new Date(task.start);
            const endDate: Date = new Date(task.end);
            return ({
            ...task,
            start: startDate,
            end: endDate,
          })});
          console.log('transformedTasksArray', transformedTasksArray);
          const orderedTasksArray: ITask[] = transformedTasksArray.sort((a, b) => {
            const startDateA = a.start.getTime();
            const startDateB = b.start.getTime();
            return startDateA - startDateB;
          })
  
          console.log('tasksArray', orderedTasksArray);
          setData(orderedTasksArray);
        } else if (method === 'PATCH' && data || method === 'PUT' && data) {
          const newData = data.filter((task) => task.id !== responseData.id).concat(responseData);
          const transformedTasksArray = newData.map((task: ITask) => {
            const startDate: Date = new Date(task.start);
            const endDate: Date = new Date(task.end);
            return ({
            ...task,
            start: startDate,
            end: endDate,
          })});
          console.log('transformedTasksArray', transformedTasksArray);
          const orderedTasksArray: ITask[] = transformedTasksArray.sort((a, b) => {
            const startDateA = a.start.getTime();
            const startDateB = b.start.getTime();
            return startDateA - startDateB;
          })
  
          console.log('tasksArray', orderedTasksArray);
          setData(orderedTasksArray);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }, [accessToken, body, method, projectId, uId, taskId]);

  const setRequest = useCallback(({ uId, method = 'GET', projectId = '', taskId = '', accessToken = null, body = null}: RequestSchema) => {
    setUId(uId);
    setMethod(method);
    setProjectId(projectId);
    setTaskId(taskId);
    setAccessToken(accessToken);
    setBody(body);
    setRequestCount(currentCount => currentCount + 1);
  }, []);

  // 使用 useEffect 來觸發 fetch
  useEffect(() => {
    if (!uId) return;
    fetchProjectData();
  }, [projectId, taskId, accessToken, requestcount, method, body, uId, fetchProjectData, requestcount]); // 當 uId、method 或 body 改變時，重新執行 useEffect

  return {
    data,
    error,
    isLoading,
    setRequest,
  };
};

export default useProjectFetch;

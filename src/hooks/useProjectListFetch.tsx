import { HttpMethod, IProject, fetchUrl } from '@/models/common';
import { useState, useEffect, useCallback } from 'react';

type RequestSchema  = {
  uId: string,
  method: HttpMethod,
  projectId?: string,
  accessToken?: string | null,
  body?: IProject,
};

type UId = null | string;
type AccessToken = null | string;

const useProjectListFetch = (initialUId: UId = null, initialAccessToken: AccessToken = null, initialMethod: HttpMethod = 'GET', initialBody: IProject = null) => {
  // 狀態管理
  const [data, setData] = useState<IProject[]| null>();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>('');
  const [uId, setUId] = useState<UId>(initialUId);
  const [accessToken, setAccessToken] = useState<AccessToken>(initialAccessToken);
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [body, setBody] = useState<IProject>(initialBody);
  const [requestCount, setRequestCount] = useState<number>(0);

  const fetchProjectList = useCallback(async () => {
    setIsLoading(true);
    let url = `${fetchUrl}${uId}/projects.json?auth=${accessToken}`;
    if (method !== 'GET') {
      url = `${fetchUrl}${uId}/projects/${body?.id}.json?auth=${accessToken}`
    }
    if (method === 'DELETE') {
      if (projectId === '' || !projectId) {
        console.log('不幸地，return 了');
        return;
      }
      url = `${fetchUrl}${uId}/projects/${projectId}.json?auth=${accessToken}`
      console.log('url in DELETE', url);
    }
    console.log('fetch 起來！');

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
      console.log('responseData', responseData);
      if (!responseData) {
        setData(null);
      }
      const projectsArray: IProject[] = Object.values(responseData);
      setData(projectsArray);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [uId, accessToken, method, body, projectId]);  

  // 使用 useEffect 來觸發 fetch
  useEffect(() => {
    console.log('難道是沒有 uId?', uId);
    if (!uId) return;
    fetchProjectList();
  }, [fetchProjectList, requestCount, uId, body, projectId, accessToken]); // 當 uId、method 或 body 改變時，重新執行 useEffect

  const setRequest = useCallback(({ uId, method = 'GET', projectId = '', accessToken = null, body = null }: RequestSchema) => {
    setUId(uId);
    setMethod(method);
    setProjectId(projectId);
    setAccessToken(accessToken);
    setBody(body);
    setRequestCount(currentCount => currentCount + 1);
  }, []);

  return {
    data,
    error,
    isLoading,
    setRequest,
  };
};

export default useProjectListFetch;

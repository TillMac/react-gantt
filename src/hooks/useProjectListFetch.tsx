import { HttpMethod, IProject, fetchUrl } from '@/models/common';
import { useState, useEffect } from 'react';

type RequestSchema  = {
  uId: string,
  method: HttpMethod,
  body: IProject,
};

type UId = null | string;

const useProjectListFetch = (initialUId: UId = null, initialMethod: HttpMethod = 'GET', initialBody: IProject = null) => {
  // 狀態管理
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uId, setUId] = useState<UId>(initialUId);
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [body, setBody] = useState<IProject>(initialBody);

  // 使用 useEffect 來觸發 fetch
  useEffect(() => {
    if (!uId) return;

    const fetchData = async () => {
      setIsLoading(true);
      const url = `${fetchUrl}/${uId}/projects.json`

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
        const responseData = method === 'DELETE' ? {} : await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uId, method, body]); // 當 uId、method 或 body 改變時，重新執行 useEffect

  return {
    data,
    error,
    isLoading,
    setRequest: ({ uId, method = 'GET', body = null }: RequestSchema) => {
      setUId(uId);
      setMethod(method);
      setBody(body);
    },
  };
};

export default useProjectListFetch;

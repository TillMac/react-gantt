import { Outlet, useOutletContext } from 'react-router-dom'
import './AppLayout.css'
import Sidebar from '../components/Sidebar'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IProject } from '@/models/common'
import { useAuth } from '@/context/AuthContext'
import useProjectListFetch from '@/hooks/useProjectListFetch'

function AppLayout() {
  const [activeProject, setActiveProject] = useState<IProject>(null);
  const [reloadProjectListData, setReloadProjectListData] = useState<boolean>(false);
  const { data, setRequest } = useProjectListFetch();
  const { currentUser } = useAuth();

  const handleFetchProjectListData = () => {
    console.log('setRequest 前');
    setRequest({
      uId: currentUser.uid,
      method: 'GET',
      accessToken: currentUser.accessToken,
    })
    setReloadProjectListData(false);
    console.log('setRequest 後');
  };

  useEffect(() => {
    handleFetchProjectListData();
  }, []);

  useEffect(() => {
    if (reloadProjectListData) {
      console.log('重來哩', reloadProjectListData.toString())
      handleFetchProjectListData();
      console.log('data reGET', data);
    }
  }, [reloadProjectListData]);

  return (
    <div className='w-screen flex'>
      <Sidebar data={data} setActiveProject={setActiveProject} setReloadProjectListData={setReloadProjectListData} />
      <div className='w-full h-screen p-10'>
        <Outlet context={{ activeProject, setReloadProjectListData }} />
      </div>
    </div>
  )
}

export default AppLayout;

export function useActiveProject() {
  type context = {
    activeProject: IProject,
    setReloadProjectListData: Dispatch<SetStateAction<boolean>>,
  }
  return useOutletContext<context>();
}

import ViewModeSelector from '@/components/ViewModeSelector';
import ProjectSetting from '@/components/ProjectSetting';
import { useActiveProject } from '@/layouts/AppLayout';
import { useEffect, useState } from 'react'
import AddingTask from '@/components/AddingTask';
import useProjectFetch from '@/hooks/useProjectFetch';
import { useAuth } from '@/context/AuthContext';
import GanttChart from '@/components/GanttChart';
import LazyMe from '@/components/LazyMe';
import { useLocation } from 'react-router-dom';

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);
  const { activeProject, setReloadProjectListData } = useActiveProject();
  const [reloadProjectData, setReloadProjectData] = useState<boolean>(false);
  const { data, isLoading, setRequest } = useProjectFetch();
  const { currentUser } = useAuth();
  const location = useLocation();

  const getProjectData = () => {
    const projectIdFromLocation: string = location.pathname.replace(/^\//, '');
    setRequest({
      uId: currentUser.uid,
      projectId: projectIdFromLocation,
      method: 'GET',
      accessToken: currentUser.accessToken,
    });
    setReloadProjectData(false);
  }

  useEffect(() => {
    getProjectData();
  }, [location.pathname]);
  
  // useEffect(() => console.log('location', location.pathname), [data])

  useEffect(() => {
    if (reloadProjectData) {
      getProjectData();
    }
  }, [reloadProjectData])
  
  
  return (
    <>
      <section className="w-full flex justify-between items-center">
        <h2 className='text-3xl'>{activeProject?.name}</h2>
        <ProjectSetting project={activeProject} setReloadProjectListData={setReloadProjectListData} />
      </section>
      <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
      <AddingTask project={activeProject} setReloadProjectData={setReloadProjectData} />
      {
        (viewMode === 1) ? 
          ((!isLoading && data !== null) ? <GanttChart taskData={data} setReloadProjectData={setReloadProjectData} /> : <pre>Loading...</pre>) 
        : 
          <LazyMe />
      }
    </>
  )
}

export default ProjectArea;

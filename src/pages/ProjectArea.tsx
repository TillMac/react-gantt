import ViewModeSelector from '@/components/ViewModeSelector';
import ProjectSetting from '@/components/ProjectSetting';
import { useActiveProject } from '@/layouts/AppLayout';
import { useEffect, useState } from 'react'
import AddingTask from '@/components/AddingTask';
import useProjectFetch from '@/hooks/useProjectFetch';
import { useAuth } from '@/context/AuthContext';
import GanttChart from '@/components/GanttChart';
import { useLocation } from 'react-router-dom';
import TableList from '@/components/TableList';
import Kanban from '@/components/Kanban';

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);
  const { activeProject, setReloadProjectListData } = useActiveProject();
  const [reloadProjectDataCount, setReloadProjectDataCount] = useState<number>(1);
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
  }

  useEffect(() => {
    getProjectData();
  }, [location.pathname]);
  
  // useEffect(() => console.log('location', location.pathname), [data])

  useEffect(() => {
    if (reloadProjectData) {
    if (reloadProjectDataCount > 0) {
      getProjectData();
      console.log('reloadProjectDataCount', reloadProjectDataCount);
    }
  }, [reloadProjectDataCount]);
  
  
  return (
    <>
      <section className="w-full flex justify-between items-center">
        <h2 className='text-3xl'>{activeProject?.name}</h2>
        <ProjectSetting project={activeProject} setReloadProjectListData={setReloadProjectListData} />
      </section>
      <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} setReloadProjectData={setReloadProjectData} />
      <AddingTask project={activeProject} setReloadProjectData={setReloadProjectData} />
        { !isLoading && data !== null ? (
          viewMode === 1 ? <GanttChart taskData={data} setReloadProjectData={setReloadProjectData} /> : (
            viewMode === 0 ? <TableList taskData={data} setReloadProjectData={setReloadProjectData} /> : (
              <Kanban taskData={data} />
            )
          )): (!isLoading) ? <pre>No data.</pre> : <pre>Loading...</pre>
        }
    </>
  )
}

export default ProjectArea;

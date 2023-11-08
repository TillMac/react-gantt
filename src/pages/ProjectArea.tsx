import ViewModeSelector from '@/components/ViewModeSelector';
import ProjectSetting from '@/components/ProjectSetting';
import { useActiveProject } from '@/layouts/AppLayout';
import React, { useState } from 'react'
import React, { useEffect, useState } from 'react'
import AddingTask from '@/components/AddingTask';
import useProjectFetch from '@/hooks/useProjectFetch';
import { useAuth } from '@/context/AuthContext';
import GanttChart from '@/components/GanttChart';

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);
  const { activeProject, setReloadProjectListData } = useActiveProject();
  const [reloadProjectData, setReloadProjectData] = useState<boolean>(false);
  const { data, setRequest } = useProjectFetch();
  const { currentUser } = useAuth();

  const getProjectData = () => {
    if (activeProject) {
      setRequest({
        uId: currentUser.uid,
        projectId: activeProject!.id,
        method: 'GET',
        accessToken: currentUser.accessToken,
      });
    }
    setReloadProjectData(false);
  }

  useEffect(() => {
    getProjectData();
  }, []);

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
      <AddingTask project={activeProject} />
    </>
  )
}

export default ProjectArea;

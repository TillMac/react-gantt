import ViewModeSelector from '@/components/ViewModeSelector';
import ProjectSetting from '@/components/ProjectSetting';
import { useActiveProject } from '@/layouts/AppLayout';
import React, { useState } from 'react'

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);
  const { activeProject, setReloadProjectListData } = useActiveProject();
  
  return (
    <>
      <section className="w-full flex justify-between items-center">
        <h2 className='text-3xl'>{activeProject?.name}</h2>
        <ProjectSetting project={activeProject} setReloadProjectListData={setReloadProjectListData} />
      </section>
      <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
    </>
  )
}

export default ProjectArea;

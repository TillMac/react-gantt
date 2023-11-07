import ViewModeSelector from '@/components/ViewModeSelector';
import ProjectSetting from '@/components/ProjectSetting';

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);

  return (
    <>
      <section className="w-full flex justify-between items-center">
        <ProjectSetting project={activeProject} setReloadProjectListData={setReloadProjectListData} />
      </section>
      <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
    </>
  )
}

export default ProjectArea;

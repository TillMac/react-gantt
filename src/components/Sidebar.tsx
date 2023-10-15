import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faSliders, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import ProjectList from './ProjectList';
import { Button } from './ui/button';

const Sidebar = () => {
  return (
    <aside className="w-1/4 flex flex-col gap-4 bg-gray-200 h-screen sticky z-10 p-0 m-0 border-r-2 border-gray">
      <section className="w-full pl-6 pt-6 flex flex-wrap items-center">
        <Button className='w-5/6 m-0 px-3 py-1 justify-start hover:bg-gray hover:border-gray rounded-xl'>
          <FontAwesomeIcon icon={faTableCellsLarge} className='text-theme text-xl' />
          <h4 className='text-xl pl-4 text-text font-mono'>Dashboard</h4>
        </Button>
      </section>
      <ProjectList />
      <section className='w-full px-4 py-2 mb-0 mt-auto flex items-center border-t-2 border-gray'>
        <Button className='m-0 px-3 py-1 justify-start hover:bg-gray hover:border-gray rounded-xl'>
          <FontAwesomeIcon icon={faFolderPlus} className='text-text text-xl' />
          <h4 className='text-xl pl-4 text-text font-mono'>New Project</h4>
        </Button>
        <Button className='m-0 hover:bg-gray hover:border-gray rounded-full ml-auto mr-0'>
          <FontAwesomeIcon icon={faSliders} className='text-text text-xl' />
        </Button>
      </section>
    </aside>
  )
}

export default Sidebar;

import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './ui/button';

const ProjectList = () => {
  return (
    <section className="pl-6 flex flex-wrap w-full items-center">
      <Button className='w-5/6 m-0 px-3 py-1 justify-start hover:bg-gray hover:border-gray rounded-xl'>
        <FontAwesomeIcon icon={faFolder} className='text-text text-xl' />
        <h4 className='text-xl pl-4 text-text font-mono'>_ProjectName_</h4>
      </Button>
    </section>
  )
}

export default ProjectList
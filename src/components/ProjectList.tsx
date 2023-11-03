import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProject } from '@/models/common';
import { NavLink } from 'react-router-dom';

type Props = {
  data: IProject[] | undefined,
};

const ProjectList = ({ data }: Props) => {
  return (
    <section className="pl-6 flex flex-wrap gap-2 w-full items-center">
      {
        !data || data.length === 0 ? (
          <h4 className='text-lg pl-4 text-text font-mono italic'>No Projects.</h4>
        ) : (
          data
          .filter((project: IProject) => project)
          .map((project: IProject) => {
            if (project) {
              return (
                <NavLink to={`/${project.id}`} key={project.id} className='w-5/6 m-0 px-3 py-1 justify-start items-center flex hover:bg-gray hover:border-gray rounded-xl'>
                  <FontAwesomeIcon icon={faFolder} className='text-text text-xl' />
                  <h4 className='text-xl pl-4 text-text font-mono'>{project.name}</h4>
                </NavLink>
              );
            }
          })
        )
      }
    </section>
  )
}

export default ProjectList
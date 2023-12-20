import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProject } from '@/models/common';
import { NavLink, useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

type Props = {
  data: IProject[] | undefined,
  setActiveProject: Dispatch<SetStateAction<IProject>>
};

const ProjectList = ({ data, setActiveProject }: Props) => {
  const location = useLocation();

  useEffect(() => {
    data?.forEach((project: IProject) => {
      console.log(data, 'data from ProejctList')
      if (!!project && location.pathname === `/${project.id}`) {
        setActiveProject(project);
      }
      return;
    })
  }, [location, data]);

  return (
    <section className="pl-6 flex flex-wrap gap-2 w-full items-center">
      {
        !data || data.length === 0 ? (
          <h4 className='text-lg pl-4 text-text font-mono italic'>No Projects.</h4>
        ) : (
          data.sort((a, b) => {
            if (a && b) {
              if (a.isStar && !b.isStar) {
                return -1;
              } else if (!a.isStar && b.isStar) {
                return 1;
              } else {
                if (a.createTime && b.createTime) {
                  return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
                }
              }
            }
            return 0;
          })
          .map((project: IProject, idx: number) => {
            if (project) {
              return (
                <NavLink to={`/${project.id}`} key={idx} className='w-5/6 m-0 px-3 py-1 justify-start items-center flex hover:bg-gray hover:border-gray rounded-xl'  style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#545454" : "",
                    color: isActive ? 'white' : '#545454',
                  };
                }}>
                  {
                    ({isActive}) => (
                      <>
                        {
                          project.isStar ? <FontAwesomeIcon icon={fasStar} className='text-xl text-yellow-300 hover:cursor-pointer' /> : <FontAwesomeIcon icon={faFolder} className={`${isActive ? 'text-white' : 'text-text'} text-xl`} />
                        }
                        
                        <h4 className={`text-xl pl-4 font-mono ${isActive ? 'text-white' : 'text-text'}`}>{project.name}</h4>
                      </>
                    )
                  }
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
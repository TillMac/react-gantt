import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import ProjectList from './ProjectList';
import { Button } from './ui/button';
import AddingProject from './AddingProject';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useAuth } from '@/context/AuthContext';
import { NavLink } from 'react-router-dom';
import { IProject } from '@/models/common';

type Props = {
  data: IProject[] | null | undefined,
  setActiveProject: Dispatch<SetStateAction<IProject>>
  setReloadProjectListData: Dispatch<SetStateAction<boolean>>
};

const Sidebar = ({ data, setActiveProject, setReloadProjectListData }: Props) => {
  const { currentUser, logout } = useAuth();
  const logoutGoogle = async(e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
  }; 

  return (
    <div className="w-1/5 flex flex-col gap-4 bg-gray-200 h-screen sticky z-10 p-0 mt-0 ml-0 mr-auto border-r-2 border-gray">
      <section className="w-full pl-6 pt-6 flex flex-wrap items-center">
        <NavLink to='/dashboard' className='w-5/6 m-0 px-3 py-1 justify-start flex items-center hover:bg-gray hover:border-gray rounded-xl' style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "#545454" : "",
            color: isActive ? 'white' : '#545454',
          };
        }}>
        {
          ({isActive}) => (
            <>
              <FontAwesomeIcon icon={faTableCellsLarge} className={`${isActive ? 'text-theme' : 'text-text'} text-xl`} />
              <h4 className={`text-xl pl-4 font-mono ${isActive ? 'text-white' : 'text-text'}`}>Dashboard</h4>
            </>
          )
        }
        </NavLink>
      </section>
      <ProjectList data={data!} setActiveProject={setActiveProject} />
      <section className='w-full px-4 py-2 mb-0 mt-auto flex items-center border-t-2 border-gray'>
        <AddingProject uId={currentUser.uid} onProjectAdded={() => setReloadProjectListData(true)} />
        <Button className='m-0 hover:bg-gray hover:border-gray rounded-full ml-auto mr-0' onClick={logoutGoogle}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-text text-xl' />
        </Button>
      </section>
    </div>
  )
}

export default Sidebar;

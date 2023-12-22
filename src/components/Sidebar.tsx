import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import ProjectList from './ProjectList';
import { Button } from './ui/button';
import AddingProject from './AddingProject';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useAuth } from '@/context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { IProject } from '@/models/common';
import { GoogleAuthProvider, linkWithPopup } from 'firebase/auth';

type Props = {
  data: IProject[] | null | undefined,
  setActiveProject: Dispatch<SetStateAction<IProject>>
  setReloadProjectListData: Dispatch<SetStateAction<boolean>>
};

const Sidebar = ({ data, setActiveProject, setReloadProjectListData }: Props) => {
  const { currentUser, isAnonymous, setIsAnonymous, logout } = useAuth();
  const navigate = useNavigate();
  const logoutGoogle = async(e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
  };

  const linkWithGoogle = () => {
    linkWithPopup(currentUser, new GoogleAuthProvider())
      .then((codeResponse) => {
        console.log('codeResponse', codeResponse);
        if (currentUser) {
          navigate('/dashboard');
          setIsAnonymous(false);
        }
      })
      .catch((error) => {
        console.log('error!', error.code);
        logout();
      });
  };

  return (
    <div className="xl:w-1/5 lg:w-1/3 flex flex-col sidebar--background sticky z-10 p-0 mt-0 ml-0 mr-auto border-r-2 border-gray">
      <section className='flex flex-col flex-1 pl-6 gap-4'>
        <section className="w-full pt-6 flex flex-wrap items-center">
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
      </section>
      <AddingProject uId={currentUser.uid} onProjectAdded={() => setReloadProjectListData(true)} />
      <section className='w-full py-2 mb-0 mt-auto flex items-center border-t-2 border-gray'>
        {
          (!isAnonymous) ? null : (
            <Button
              className='w-44 mx-auto bg-theme rounded-xl text-white hover:bg-gray hover:text-text hover:border-gray hover:border-1'
              onClick={() => linkWithGoogle()}
            >
              Sign in with Google
            </Button>
          )
        }
        <Button className='m-0 sidebar__logout rounded-full ml-auto mr-0' onClick={logoutGoogle}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-text text-xl' />
        </Button>
      </section>
    </div>
  )
}

export default Sidebar;

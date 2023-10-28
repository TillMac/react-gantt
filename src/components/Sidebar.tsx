import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import ProjectList from './ProjectList';
import { Button } from './ui/button';
import AddingProject from './AddingProject';
import { googleLogout } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const Sidebar = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const logoutGoogle = () => {
    googleLogout();
    setAuthenticated({
      isGuest: false,
      isAuthenticated: false,
      accessToken: '',
    })
  };

  return (
    <div className="w-72 flex flex-col gap-4 bg-gray-200 h-screen sticky z-10 p-0 mt-0 ml-0 mr-auto border-r-2 border-gray">
      <section className="w-full pl-6 pt-6 flex flex-wrap items-center">
        <Button className='w-5/6 m-0 px-3 py-1 justify-start hover:bg-gray hover:border-gray rounded-xl'>
          <FontAwesomeIcon icon={faTableCellsLarge} className='text-theme text-xl' />
          <h4 className='text-xl pl-4 text-text font-mono'>Dashboard</h4>
        </Button>
      </section>
      <ProjectList />
      <section className='w-full px-4 py-2 mb-0 mt-auto flex items-center border-t-2 border-gray'>
        <AddingProject />
        <Button className='m-0 hover:bg-gray hover:border-gray rounded-full ml-auto mr-0' onClick={() => logoutGoogle()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-text text-xl' />
        </Button>
      </section>
    </div>
  )
}

export default Sidebar;

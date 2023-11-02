import { Outlet } from 'react-router-dom'
import './AppLayout.css'
import AddingTask from '../components/AddingTask'
import Sidebar from '../components/Sidebar'

function AppLayout() {

  return (
    <div className='w-screen flex'>
      <Sidebar />
      <div className='w-full h-screen'>
        <Outlet />
      </div>
      <AddingTask />
    </div>
  )
}

export default AppLayout;

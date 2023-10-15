import './App.css'
import AddTaskModal from './components/AddTaskModal'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className='w-screen flex'>
      <Sidebar />
      <AddTaskModal />
    </div>
  )
}

export default App

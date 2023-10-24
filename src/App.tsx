import './App.css'
import AddingTask from './components/AddingTask'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className='w-screen'>
      <Sidebar />
      <AddingTask />
    </div>
  )
}

export default App

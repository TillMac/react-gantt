import { Button } from './ui/button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { CustomDatePicker } from './CustomDatePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddTaskModal = () => {
  return (
    <Dialog className='bg-white text-theme rounded-lg'>
        <DialogTrigger asChild>
          <Button className="w-16 h-16 bg-gray-500 rounded-full absolute bottom-10 right-10 border-transparent hover:bg-theme">
            <FontAwesomeIcon icon={faPlus} className="text-2xl my-4 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='text-xl'>Add New Task</DialogHeader>
          <section className='grid grid-cols-4 items-center gap-8'>
            <Label htmlFor='taskName' className='text-left'>Task Name</Label>
            <Input id='taskName' className='col-span-3 rounded-xl' />
            <Label htmlFor='projectName' className='text-left'>Project Name</Label>
            <Input id='projectName' className='col-span-3 rounded-xl' />
            <Label htmlFor='startDate' className='text-left'>Start Date</Label>
            <section className='col-span-3'>
              <CustomDatePicker />
            </section>
            <Label htmlFor='dueDate' className='text-left'>Due Date</Label>
            <section className='col-span-3'>
              <CustomDatePicker />
            </section>
            <Button className='bg-gray-500 text-white rounded-xl col-span-4 hover:bg-theme border-transparent'>Submit</Button>
          </section>
        </DialogContent>
      </Dialog>
  )
}

export default AddTaskModal
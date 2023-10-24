import { Button } from './ui/button'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

const projectFormSchema = z.object({
  projectName: z.string({
    required_error: "Please select a project.",
  }),
});

const AddingProject = () => {
  const projectForm = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: '',
    }
  });
  const onProjectSubmit = (data: z.infer<typeof projectFormSchema>) => {
    console.log('data pro', data.projectName)
    fetch('https://react-gantt-default-rtdb.firebaseio.com/projects.json', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: data.projectName,
        message: 'we did it!',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Dialog className='bg-white text-theme rounded-lg'>
        <DialogTrigger asChild>
          <Button className='m-0 px-3 py-1 justify-start hover:bg-gray hover:border-gray rounded-xl'>
            <FontAwesomeIcon icon={faFolderPlus} className='text-text text-xl' />
            <h4 className='text-xl pl-4 text-text font-mono'>New Project</h4>
          </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-col gap-8'>
          <DialogHeader className='text-xl'>
            Add New Project
          </DialogHeader>
            <Form {...projectForm}>
              <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="flex flex-col gap-8">
              <FormField
                control={projectForm.control}
                name='projectName'
                render={({ field }) => (
                  <FormItem className='col-span-4 grid grid-cols-4 items-center'>
                    <FormLabel className='text-left'>Project Name</FormLabel>
                    <FormControl>
                      <Input className='col-span-3 rounded-xl' {...field} />
                    </FormControl>
                  </FormItem>
                )} 
              />
              <Button type='submit' className='bg-gray-500 text-white rounded-xl col-span-4 hover:bg-theme border-transparent'>Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}

export default AddingProject
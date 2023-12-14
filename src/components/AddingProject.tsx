import { Button } from './ui/button'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import useProjectListFetch from '@/hooks/useProjectListFetch'
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext'
import { DialogClose } from '@radix-ui/react-dialog'

const projectFormSchema = z.object({
  projectName: z.string({
    required_error: "Please name your project.",
  }),
});

type Props = {
  uId: string,
  onProjectAdded: () => void,
};

const AddingProject = ({ uId, onProjectAdded }: Props) => {
  const { setRequest } = useProjectListFetch();
  const { currentUser } = useAuth();
  const projectForm = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: '',
    }
  });
  const projectSubmitHandler = (formData: z.infer<typeof projectFormSchema>) => {
    setRequest({
      uId: uId,
      method: 'PUT',
      accessToken: currentUser.accessToken,
      body: {
        type: "project",
        name: formData.projectName,
        id: uuidv4(),
        isStar: false,
        description: 'none',
        createTime: new Date(),
        updateTime: new Date(),
      }
    });
    onProjectAdded();
  }

  return (
    <div className='w-5/6 pb-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full m-0 px-3 py-1 justify-start hover:bg-gray hover:border-gray rounded-xl'>
            <FontAwesomeIcon icon={faFolderPlus} className='text-text text-xl' />
            <h4 className='text-xl pl-4 text-text font-mono'>New Project</h4>
          </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-col gap-8 dialog__background'>
          <DialogHeader className='text-xl'>
            Add New Project
          </DialogHeader>
            <Form {...projectForm}>
              <form onSubmit={projectForm.handleSubmit(projectSubmitHandler)} className="flex flex-col gap-8">
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button type='submit' className='bg-theme text-white rounded-xl col-span-4 hover:bg-white hover:text-theme hover:border-theme border-transparent'>Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddingProject
import { Button } from './ui/button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { format } from "date-fns"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../../@/lib/utils'
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from './ui/calendar'

const task: Record<string, string> = {
  taskName: 'Task Name',
  projectName: 'Project Name',
  startDate: 'Start Date',
  dueDate: 'Due Date',
};

type taskFormInputNameType = "taskName" | "projectName";
type taskFormDateNameType = "startDate" | "dueDate";

const taskFormSchema = z.object({
  taskName: z.string().min(1, {
    message: 'Task name must be at least 1 character, and lower than 20 characters.',
  }).max(20),
  projectName: z.string({
    required_error: "Please select a project.",
  }),
  startDate: z.date({
    required_error: "A date of start date is required.",
  }),
  dueDate: z.date({
    required_error: "A date of due date is required.",
  }),
});


const AddingTask = () => {
  const taskForm = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskName: '',
      projectName: '',
      startDate: undefined,
      dueDate: undefined,
    }
  });

  const taskSubmitHandler = (data: z.infer<typeof taskFormSchema>) => {
    console.log('clicked!', [data.taskName, data.projectName, data.startDate.toISOString(), data.dueDate.toISOString()]);
  };

  return (
    <Dialog className='bg-white text-theme rounded-lg'>
        <DialogTrigger asChild>
          <Button className="w-16 h-16 bg-gray-500 rounded-full absolute bottom-10 right-10 border-transparent hover:bg-theme">
            <FontAwesomeIcon icon={faPlus} className="text-2xl my-4 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-col gap-8'>
          <DialogHeader className='text-xl'>
            Add New Task
          </DialogHeader>
            <Form {...taskForm}>
              <form onSubmit={taskForm.handleSubmit(taskSubmitHandler)} className="flex flex-col gap-8">
                {
                  Object.keys(task).map((label: string, idx: number) => {
                    if (label.includes('Date')) {
                      return (
                        <FormField
                          key={idx}
                          control={taskForm.control}
                          name={label as taskFormDateNameType}
                          render={({ field }) => (
                            <FormItem className='grid grid-cols-4 items-center'>
                              <FormLabel className='text-left'>{task[label]}</FormLabel>
                              <section className='col-span-3'>
                                <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal rounded-xl",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0 bg-gray">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                </FormControl>
                              </section>
                            </FormItem>
                          )}
                        />
                      );
                    } else {
                      return (
                        <FormField
                          key={idx}
                          control={taskForm.control}
                          name={label as taskFormInputNameType}
                          render={({ field }) => (
                            <FormItem className='grid grid-cols-4 items-center'>
                              <FormLabel className='text-left' key={idx}>{task[label]}</FormLabel>
                              <FormControl>
                                <Input key={idx} className='col-span-3 rounded-xl' {...field } />
                              </FormControl>
                            </FormItem>
                          )}                         
                        />
                      )
                    }
                  })
                }
                <Button type='submit' className='bg-gray-500 text-white rounded-xl col-span-4 hover:bg-theme border-transparent'>Submit</Button>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
  )
}

export default AddingTask
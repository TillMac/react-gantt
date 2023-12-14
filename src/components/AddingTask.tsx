import { Button } from './ui/button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { format } from "date-fns"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../../@/lib/utils'
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from './ui/calendar'
import { IProject } from '@/models/common'
import useProjectFetch from '@/hooks/useProjectFetch'
import { useAuth } from '@/context/AuthContext'
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import React, { Dispatch, SetStateAction } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { taskFormDateNameType, taskFormInputNameType, taskFormSchema, taskLabel } from '@/models/taskForm'

type Props = {
  project: IProject,
  setReloadProjectDataCount: Dispatch<SetStateAction<number>>,
}

const AddingTask: React.FC<Props> = ({ project, setReloadProjectDataCount }) => {
  const { setRequest } = useProjectFetch();
  const { currentUser } = useAuth();

  const taskForm = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskName: '',
      status: 'TODO',
      start: undefined,
      end: undefined,
      type: undefined,
      progress: 0,
    }
  });

  const taskSubmitHandler = (taskFormData: z.infer<typeof taskFormSchema>) => {
    const taskId = uuidv4();
    setRequest({
      uId: currentUser.uid,
      projectId: project!.id,
      method: 'PUT',
      taskId: taskId,
      accessToken: currentUser.accessToken,
      body: {
        name: taskFormData.taskName,
        id: taskId,
        status: taskFormData.status,
        start: taskFormData.start,
        end: taskFormData.end,
        description: 'none',
        project: project!.id,
        progress: Number(taskFormData.progress),
        type: taskFormData.type,
        createTime: new Date(),
        updateTime: new Date(),
      }
    });
    setReloadProjectDataCount((number) => number += 1);
  };

  return (
    <Dialog modal={true}>
        <DialogTrigger asChild>
          <Button className="w-16 h-16 bg-gray-500 rounded-full absolute z-50 bottom-10 right-10 border-transparent hover:bg-theme">
            <FontAwesomeIcon icon={faPlus} className="text-2xl my-4 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-col gap-8'>
          <DialogHeader className='text-xl font-bold'>
            新增事項至 {project?.name}
          </DialogHeader>
            <Form {...taskForm}>
              <form onSubmit={taskForm.handleSubmit(taskSubmitHandler)} className="flex flex-col gap-8">
                {
                  Object.keys(taskLabel).map((label: string, idx: number) => {
                    if (label.includes('start') || label.includes('end')) {
                      return (
                        <FormField
                          key={idx}
                          control={taskForm.control}
                          name={label as taskFormDateNameType}
                          render={({ field }) => (
                            <FormItem className='grid grid-cols-4 items-center'>
                              <FormLabel className='text-left'>{taskLabel[label]}</FormLabel>
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
                                      className='pointer-events-auto'
                                    />
                                  </PopoverContent>
                                </Popover>
                                </FormControl>
                              </section>
                              <FormMessage className='col-span-4 text-red-500' />
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
                              <FormLabel className='text-left' key={idx}>{taskLabel[label]}</FormLabel>
                                {
                                  (taskLabel[label] !== 'Type' && taskLabel[label] !== 'Status') ? (
                                    <FormControl>
                                      <Input
                                        key={idx}
                                        className='col-span-3 rounded-xl' {...field }
                                        type={(taskLabel[label] !== 'Progress (%)' ? 'text' : 'number')}
                                        onChange={(e) => {
                                          if (taskLabel[label] === 'Progress (%)') {
                                            field.onChange(Number(e.target.value))
                                          } else {
                                            field.onChange(e.target.value.toString());
                                          }
                                        }}
                                      />
                                    </FormControl>
                                  ) : 
                                    (taskLabel[label] !== 'Status') ? (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl className='col-span-3 rounded-xl'>
                                            <SelectTrigger>
                                              <SelectValue placeholder='Select a type for ur event' />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent className='bg-gray'>
                                            <SelectItem className='cursor-pointer' value="task">Task</SelectItem>
                                            <SelectItem className='cursor-pointer' value="milestone">Milestone</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      ) : (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl className='col-span-3 rounded-xl'>
                                            <SelectTrigger>
                                              <SelectValue placeholder='Select a status for ur event' />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent className='bg-gray'>
                                            <SelectItem className='cursor-pointer' value="TODO">Todo</SelectItem>
                                            <SelectItem className='cursor-pointer' value="IN PROGRESS">In Progress</SelectItem>
                                            <SelectItem className='cursor-pointer' value="DONE">Done</SelectItem>
                                            <SelectItem className='cursor-pointer' value="WAIVED">Waived</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      )
                                }
                              <FormMessage className='col-span-4 text-red-500' />
                            </FormItem>
                          )}                         
                        />
                      )
                    }
                  })
                }
                <DialogClose asChild>
                  <Button type='submit' className='bg-gray-500 text-white rounded-xl col-span-4 hover:bg-theme border-transparent'>Submit</Button>
                </DialogClose>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
  )
}

export default AddingTask
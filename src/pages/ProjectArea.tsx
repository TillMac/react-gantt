import { format } from "date-fns";
import ViewModeSelector from '@/components/ViewModeSelector';
import ProjectSetting from '@/components/ProjectSetting';
import { useActiveProject } from '@/layouts/AppLayout';
import { useEffect, useState } from 'react'
import AddingTask from '@/components/AddingTask';
import useProjectFetch from '@/hooks/useProjectFetch';
import { useAuth } from '@/context/AuthContext';
import GanttChart from '@/components/GanttChart';
import { useLocation } from 'react-router-dom';
import TableList from '@/components/TableList';
import Kanban from '@/components/Kanban';
import { ITask } from '@/models/common';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { taskFormDateNameType, taskFormInputNameType, taskFormSchema, taskLabel } from '@/models/taskForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '../../@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);
  const { activeProject, setReloadProjectListData } = useActiveProject();
  const [reloadProjectDataCount, setReloadProjectDataCount] = useState<number>(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalTask, setModalTask] = useState<ITask | any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const { data, isLoading, setRequest } = useProjectFetch();
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (modalTask) {
      setDefaultValues({
        taskName: modalTask.name,
        status: modalTask.status,
        start: modalTask.start,
        end: modalTask.end,
        type: modalTask.type as 'task' | 'milestone',
        progress: modalTask.progress,
      })
      console.log('modalTask in Edit', modalTask);
    }
  }, [modalTask]);

  const taskForm = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
  });
  
  // 当 modalTask 更改时，重置表单的默认值
  useEffect(() => {
    if (modalTask && defaultValues) {
      taskForm.reset(defaultValues);
    }
  }, [defaultValues, modalTask]);

  const getProjectData = () => {
    const projectIdFromLocation: string = location.pathname.replace(/^\//, '');
    setRequest({
      uId: currentUser.uid,
      projectId: projectIdFromLocation,
      method: 'GET',
      accessToken: currentUser.accessToken,
    });
  }

  const taskUpdateSubmitHandler = (taskFormData: z.infer<typeof taskFormSchema>) => {
    if (modalTask) {
      console.log('taskFormData in updateSubmitHandler', taskFormData);
      setRequest({
        uId: currentUser.uid,
        projectId: modalTask.project as string,
        method: 'PATCH',
        taskId: modalTask.id,
        accessToken: currentUser.accessToken,
        body: {
          name: taskFormData.taskName,
          id: modalTask.id,
          status: taskFormData.status,
          start: taskFormData.start,
          end: taskFormData.end,
          description: 'none',
          project: modalTask.project as string,
          progress: Number(taskFormData.progress),
          type: taskFormData.type,
          updateTime: new Date(),
        }
      })
      setIsEditModalOpen(false);
      setReloadProjectDataCount((number) => number += 1);
    }
  };

  useEffect(() => {
    getProjectData();
  }, [location.pathname]);

  useEffect(() => {
    if (reloadProjectDataCount > 0) {
      getProjectData();
      console.log('reloadProjectDataCount', reloadProjectDataCount);
    }
  }, [reloadProjectDataCount]);

  const handleTaskDelete = () => {
    if (modalTask) {
      setRequest({
        uId: currentUser.uid,
        projectId: modalTask.project as string,
        method: 'DELETE',
        taskId: modalTask.id,
        accessToken: currentUser.accessToken,
      });
    }
    setReloadProjectDataCount((number) => number += 1);
    };
  
  
  return (
    <main className='w-full h-screen'>
      <section className='w-full p-10'>
        <section className="w-full flex justify-between items-center">
          <h2 className='text-3xl'>{activeProject?.name}</h2>
          <ProjectSetting project={activeProject} setReloadProjectListData={setReloadProjectListData} />
        </section>
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        <AddingTask project={activeProject} setReloadProjectDataCount={setReloadProjectDataCount} />
          { !isLoading && data ? (
            viewMode === 1 ? <GanttChart taskData={data} setIsEditModalOpen={setIsEditModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} setModalTask={setModalTask} setReloadProjectDataCount={setReloadProjectDataCount} /> : (
              viewMode === 0 ? <TableList taskData={data} setIsEditModalOpen={setIsEditModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} setModalTask={setModalTask} /> : (
                <Kanban taskData={data} setIsEditModalOpen={setIsEditModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} setModalTask={setModalTask} setReloadProjectDataCount={setReloadProjectDataCount} />
              )
            )): (!isLoading) ? <pre>No data.</pre> : <pre>Loading...</pre>
          }
          {
            isDeleteModalOpen && modalTask && (
              <AlertDialog
                open={isDeleteModalOpen}
                onOpenChange={(open) => {
                  if (!open) {
                    setIsDeleteModalOpen(false);
                  }
                }}
              >
                <AlertDialogContent onEscapeKeyDown={() => setIsDeleteModalOpen(false)} className='dialog__background'>
                  <AlertDialogHeader className='text-text'>
                    <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-text'>This action cannot be undo. This will permanently delete '{modalTask.name}' from the server.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className='rounded-xl hover:border-theme'
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleTaskDelete}
                      className='rounded-xl text-white bg-red-700 hover:bg-red-600 hover:border-red-600'
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )
          }
          {
            isEditModalOpen && modalTask && (
              <Dialog
                open={isEditModalOpen}
                onOpenChange={(open) => {
                  if (!open) {
                    setIsEditModalOpen(false);
                  }
                }}
              >
                <DialogContent onEscapeKeyDown={() => setIsEditModalOpen(false)} className='dialog__background'>
                  <DialogHeader className='text-text'>
                    <DialogTitle>Edit {modalTask.name}</DialogTitle>
                  </DialogHeader>
                  <Form {...taskForm}>
                    <form onSubmit={taskForm.handleSubmit(taskUpdateSubmitHandler)} className="flex flex-col gap-8">
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
                                              "w-full justify-start text-left font-normal rounded-xl hover:border-theme",
                                              !field.value && "text-muted-foreground"
                                            )}
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 menu__calendar--background">
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
                                              className='col-span-3 rounded-xl focus:border-theme' {...field }
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
                                                  <SelectTrigger className='hover:border-theme'>
                                                    <SelectValue placeholder='Select a type for ur event' />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className='menu__select--background'>
                                                  <SelectItem className='cursor-pointer' value="task">Task</SelectItem>
                                                  <SelectItem className='cursor-pointer' value="milestone">Milestone</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            ) : (
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className='col-span-3 rounded-xl'>
                                                  <SelectTrigger className='hover:border-theme'>
                                                    <SelectValue placeholder='Select a status for ur event' />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className='menu__select--background'>
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
                      <DialogFooter>
                        <Button
                          type='submit'
                          className='rounded-xl text-white bg-theme hover:bg-white hover:text-theme hover:border-theme'
                        >
                          Update
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )
          }
      </section>
    </main>
  )
}

export default ProjectArea;

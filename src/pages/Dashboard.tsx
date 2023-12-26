import { format } from "date-fns";
import { useDarkMode } from 'use-dark-mode-ts';
import ProjectCard from "@/components/ProjectCard";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TableList from '@/components/TableList';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskFormDateNameType, taskFormInputNameType, taskFormSchema, taskLabel } from '@/models/taskForm';
import { useForm } from 'react-hook-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '../../@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ITask } from "@/models/common";
import { z } from "zod";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mockData = [
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-04-10T23:38:52Z"),
    "description": "none",
    "end": new Date("2023-11-03T21:36:58Z"),
    "id": "2852975d-745e-41f6-b709-34bb1e5cd8cd",
    "name": "huh?",
    "progress": 44,
    "project": "03925dc0-d60f-4c65-9197-d4f70b3f7b69",
    "start": new Date("2023-08-02T07:07:07Z"),
    "status": "DONE",
    "type": 'task',
    "updateTime": new Date("2023-10-19T21:11:05Z"),
  },
  {
    "createTime": new Date("2023-07-18T10:43:16Z"),
    "description": "none",
    "end": new Date("2023-08-06T05:13:26Z"),
    "id": "32f77263-4626-4bb3-b663-f3ba2368696d",
    "name": "huh?",
    "progress": 26,
    "project": "3ed56a92-ffdd-4831-817a-be91dc1da5de",
    "start": new Date("2023-07-22T21:22:42Z"),
    "status": "IN PROGRESS",
    "type": 'task',
    "updateTime": new Date("2023-08-31T15:21:38Z"),
  },
  {
    "createTime": new Date("2023-11-16T00:39:52Z"),
    "description": "none",
    "end": new Date("2023-12-14T15:49:20Z"),
    "id": "fd6c06b9-6d07-45ee-88b5-d1a38d0d2ac9",
    "name": "huh?",
    "progress": 51,
    "project": "d256f349-1f9f-4fcf-bc0e-ef405d2b77c0",
    "start": new Date("2023-12-09T10:44:49Z"),
    "status": "IN PROGRESS",
    "type": 'task',
    "updateTime": new Date("2023-12-22T05:03:33Z"),
  },
  {
    "createTime": new Date("2023-05-17T20:49:26Z"),
    "description": "none",
    "end": new Date("2023-09-09T01:17:40Z"),
    "id": "5baa96cb-eb82-4309-9c3b-e40999a55db2",
    "name": "huh?",
    "progress": 96,
    "project": "4e62b039-b55d-4dc9-8e73-6f7128f28604",
    "start": new Date("2023-07-05T16:22:19Z"),
    "status": "TODO",
    "type": 'task',
    "updateTime": new Date("2023-08-28T16:54:15Z"),
  },
  {
    "createTime": new Date("2023-10-11T01:59:30Z"),
    "description": "none",
    "end": new Date("2023-12-05T14:20:50Z"),
    "id": "95026382-07a2-4d36-85b5-959294a27c28",
    "name": "huh?",
    "progress": 74,
    "project": "c9b3e649-b905-4542-a542-e4e0ebc72659",
    "start": new Date("2023-10-21T23:12:49Z"),
    "status": "IN PROGRESS",
    "type": 'task',
    "updateTime": new Date("2023-11-27T13:41:26Z"),
  }
] as ITask[];

const Dashboard = () => {
  const isDarkMode = useDarkMode();
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? 'whitesmoke' : '#545454',
        },
        grid: {
          color: isDarkMode ? 'gray' : '#E5E7EB',
        }
      },
      y: {
        ticks: {
          color: isDarkMode ? 'whitesmoke' : '#545454',
        },
        grid: {
          color: isDarkMode ? 'gray' : '#E5E7EB',
        }
      }
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDarkMode ? 'whitesmoke' : '#545454',
        },
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "已完成事項",
        data: [0, 5, 2, 3, 1, 0, 0],
        backgroundColor: "rgba(26, 118, 210, 0.8)",
      },
    ],
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalTask, setModalTask] = useState<ITask | any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [defaultValues, setDefaultValues] = useState<any>(null);

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

  // const taskUpdateSubmitHandler = (taskFormData: z.infer<typeof taskFormSchema>) => {
  //   if (modalTask) {
  //     console.log('taskFormData in updateSubmitHandler', taskFormData);
  //     setRequest({
  //       uId: currentUser.uid,
  //       projectId: modalTask.project as string,
  //       method: 'PATCH',
  //       taskId: modalTask.id,
  //       accessToken: currentUser.accessToken,
  //       body: {
  //         name: taskFormData.taskName,
  //         id: modalTask.id,
  //         status: taskFormData.status,
  //         start: taskFormData.start,
  //         end: taskFormData.end,
  //         description: 'none',
  //         project: modalTask.project as string,
  //         progress: Number(taskFormData.progress),
  //         type: taskFormData.type,
  //         updateTime: new Date(),
  //       }
  //     })
  //     setIsEditModalOpen(false);
  //     setReloadProjectDataCount((number) => number += 1);
  //   }
  // };

  return (
    <main className='w-full h-screen overflow-x-hidden overflow-y-auto p-8 text-left flex flex-col gap-8'>
      <section className='w-full flex flex-row'>
        <section className='w-1/2 flex flex-col gap-4'>
          <h3 className='text-2xl'>Recent Projects</h3>
          <TooltipProvider>
            <ProjectCard
              progress={55}
              projectName='Project #1'
              link='/'
              undoneNum={45}
              className='w-5/6 h-16 rounded-xl row-span-1'
            />
            <ProjectCard
              progress={55}
              projectName='Project #1'
              link='/'
              undoneNum={45}
              className='w-5/6 h-16 rounded-xl row-span-1'
            />
            <ProjectCard
              progress={55}
              projectName='Project #1'
              link='/'
              undoneNum={45}
              className='w-5/6 h-16 rounded-xl row-span-1'
            />
          </TooltipProvider>
        </section>
        <section className='w-1/2 flex flex-col gap-4'>
          <h3 className='text-2xl'>Activites</h3>
          <div className='w-full flex-1 flex'>
            <Bar options={chartOptions} data={data} />
          </div>
        </section>
      </section>
      <section className='flex flex-col gap-4'>
        <section className='flex flex-row items-center gap-4'>
          <h3 className='text-2xl flex-1'>Last Tasks</h3>
          <div className='flex flex-col text-center'>
            <p className='text-[24px] text-red-500'>75</p>
            <p className='text-sm text-red-500'>Overdue</p>
          </div>
          <div className='flex flex-col text-center'>
            <p className='text-[24px]'>70</p>
            <p className='text-sm'>Done</p>
          </div>
        </section>
        <TableList taskData={mockData} setIsEditModalOpen={setIsEditModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} setModalTask={setModalTask} />
      </section>
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
                  // onClick={handleTaskDelete}
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
                <form
                  // onSubmit={taskForm.handleSubmit(taskUpdateSubmitHandler)}
                  className="flex flex-col gap-8"
                >
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
    </main>
  )
}

export default Dashboard;

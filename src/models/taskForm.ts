import { z } from "zod";

const taskLabel: Record<string, string> = {
  taskName: 'Task Name',
  status: 'Status',
  start: 'Start Date',
  end: 'Due Date',
  type: 'Type',
  progress: 'Progress (%)',
};

const taskFormSchema = z.object({
  taskName: z.string().min(1, {
    message: 'Task name must be at least 1 character, and lower than 20 characters.',
  }).max(20),
  status: z.union([z.literal('TODO'), z.literal('IN PROGRESS'), z.literal('DONE'), z.literal('WAIVED')]),
  start: z.date({
    required_error: "A date of start date is required.",
  }),
  end: z.date({
    required_error: "A date of due date is required.",
  }),
  type: z.union([z.literal('task', {
    description: '請輸入 task 或 milestone',
  }), z.literal('milestone')], {
    description: '請輸入 task 或 milestone',
  }).default('task'),
  progress: z.number().min(0, {
    message: 'The progress(%) must between 0 and 100.'
  }).max(100)
});

type taskFormInputNameType = "taskName";
type taskFormDateNameType = "start" | "end";

export { taskLabel, taskFormSchema };
export type { taskFormDateNameType, taskFormInputNameType };

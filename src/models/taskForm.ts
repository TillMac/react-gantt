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
}).refine(data => {
  if (data.type === 'task') {
    return data.start < data.end;
  }
  return true;
}, {
  message: 'The start date must be before the end date.',
  path: ['start'],
}).refine(data => {
  // 當類型為 'milestone' 時，檢查開始和結束日期是否相同
  if (data.type === 'milestone') {
    return data.start.toISOString().split('T')[0] === data.end.toISOString().split('T')[0];
  }
  // 對於非 'milestone' 類型，不應用此規則
  return true;
}, {
  message: 'For milestones, the start date must be equal to the due date.',
  path: ['end'],
});

type taskFormInputNameType = "taskName";
type taskFormDateNameType = "start" | "end";

export { taskLabel, taskFormSchema };
export type { taskFormDateNameType, taskFormInputNameType };

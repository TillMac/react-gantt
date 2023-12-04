import { z } from 'zod';

const IProjectSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  isStar: z.boolean(),
  description: z.string(),
  type: z.literal('project'),
  createTime: z.date().optional(),
  updateTime: z.date().optional(),
}).nullable();

type IProject = z.infer<typeof IProjectSchema>;

const ITaskSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  status: z.union([z.literal('TODO'), z.literal('IN PROGRESS'), z.literal('DONE'), z.literal('WAIVED')]).optional(),
  start: z.date(),
  end: z.date(),
  description: z.string(),
  project: z.string().uuid(),
  progress: z.number().min(0).max(100),
  type: z.union([z.literal('task'), z.literal('milestone')]),
  createTime: z.union([z.date(), z.string()]).optional(),
  updateTime: z.union([z.date(), z.string()]).optional(),
});

type ITask = z.infer<typeof ITaskSchema>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

enum viewModes {
  list = 0,
  gantt = 1,
  kanban = 2,
}

const fetchUrl = 'https://ticket-gantt-default-rtdb.firebaseio.com/';

export type { IProject, ITask, HttpMethod };
export { fetchUrl, viewModes };
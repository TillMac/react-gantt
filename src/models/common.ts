import { z } from 'zod';

const IProjectSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  description: z.string(),
  type: z.literal('project'),
  createTime: z.date().optional(),
  updateTime: z.date().optional(),
}).nullable();

type IProject = z.infer<typeof IProjectSchema>;

const ITaskSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  startDate: z.date(),
  dueDate: z.date(),
  description: z.string(),
  projectId: z.string().uuid(),
  progress: z.number().min(0).max(100),
  type: z.literal('task'),
  createTime: z.date().optional(),
  updateTime: z.date().optional(),
}).nullable();

type ITask = z.infer<typeof ITaskSchema>;

const IMilestoneSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  startDate: z.date(),
  dueDate: z.date(),
  description: z.string(),
  projectId: z.string().uuid(),
  progress: z.number().min(0).max(100),
  type: z.literal('milestone'),
  createTime: z.date().optional(),
  updateTime: z.date().optional(),
}).nullable();

type IMilestone = z.infer<typeof IMilestoneSchema>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const fetchUrl = 'https://ticket-gantt-default-rtdb.firebaseio.com/';

export type { IProject, ITask, IMilestone, HttpMethod };
export { fetchUrl };
import { z } from 'zod';

const IProjectSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  description: z.string(),
  type: z.literal('project'),
});

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
});

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
});

type IMilestone = z.infer<typeof IMilestoneSchema>;

export type { IProject, ITask, IMilestone };
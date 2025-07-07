import { z } from 'zod';

const TodoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

const TodoCreateSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const IdInputSchema = z.object({
  id: z.string().uuid(),
});

type TodoCreate = z.infer<typeof TodoCreateSchema>;
type Todo = z.infer<typeof TodoSchema>;

export { IdInputSchema, Todo, TodoCreate, TodoCreateSchema, TodoSchema };

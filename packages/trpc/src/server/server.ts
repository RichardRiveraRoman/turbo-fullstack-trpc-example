import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todo: t.router({
    findAll: publicProcedure.output(z.array(z.object({
      id: z.string().uuid(),
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      completed: z.boolean().default(false),
      createdAt: z.date().default(() => new Date()),
      updatedAt: z.date().default(() => new Date()),
      dueDate: z.coerce.date().optional(),
      priority: z.enum(['low', 'medium', 'high']).default('medium'),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    findOne: publicProcedure.input(z.object({
      id: z.string().uuid(),
    })).output(z.object({
      id: z.string().uuid(),
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      completed: z.boolean().default(false),
      createdAt: z.date().default(() => new Date()),
      updatedAt: z.date().default(() => new Date()),
      dueDate: z.coerce.date().optional(),
      priority: z.enum(['low', 'medium', 'high']).default('medium'),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    create: publicProcedure.input(z.object({
      id: z.string().uuid(),
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      completed: z.boolean().default(false),
      createdAt: z.date().default(() => new Date()),
      updatedAt: z.date().default(() => new Date()),
      dueDate: z.coerce.date().optional(),
      priority: z.enum(['low', 'medium', 'high']).default('medium'),
    }).omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })).output(z.object({
      id: z.string().uuid(),
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      completed: z.boolean().default(false),
      createdAt: z.date().default(() => new Date()),
      updatedAt: z.date().default(() => new Date()),
      dueDate: z.coerce.date().optional(),
      priority: z.enum(['low', 'medium', 'high']).default('medium'),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    update: publicProcedure.input(z.object({
      id: z.string().uuid(),
      data: z.object({
        id: z.string().uuid(),
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
        completed: z.boolean().default(false),
        createdAt: z.date().default(() => new Date()),
        updatedAt: z.date().default(() => new Date()),
        dueDate: z.coerce.date().optional(),
        priority: z.enum(['low', 'medium', 'high']).default('medium'),
      }).omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      }).partial(),
    })).output(z.object({
      id: z.string().uuid(),
      name: z.string().min(1, 'Name is required'),
      description: z.string().optional(),
      completed: z.boolean().default(false),
      createdAt: z.date().default(() => new Date()),
      updatedAt: z.date().default(() => new Date()),
      dueDate: z.coerce.date().optional(),
      priority: z.enum(['low', 'medium', 'high']).default('medium'),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    delete: publicProcedure.input(z.object({
      id: z.string().uuid(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;


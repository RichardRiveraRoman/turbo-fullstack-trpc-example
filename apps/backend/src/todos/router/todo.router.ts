import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import {
  IdInputSchema,
  Todo,
  TodoCreate,
  TodoCreateSchema,
  TodoSchema,
} from '../schema/todo.schema';
import { TodosService } from '../todos.service';

@Router({ alias: 'todo' })
export class TodoRouter {
  constructor(private readonly todosService: TodosService) {}

  @Query({ output: z.array(TodoSchema) })
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Query({
    input: IdInputSchema,
    output: TodoSchema,
  })
  findOne(@Input('id') id: string): Todo {
    return this.todosService.findOne(id);
  }

  @Mutation({
    input: TodoCreateSchema,
    output: TodoSchema,
  })
  create(@Input() input: TodoCreate): Todo {
    return this.todosService.create(input);
  }

  @Mutation({
    input: z.object({
      id: z.string().uuid(),
      data: TodoCreateSchema.partial(),
    }),
    output: TodoSchema,
  })
  update(
    @Input('id') id: string,
    @Input('data') data: Partial<TodoCreate>,
  ): Todo {
    return this.todosService.update(id, data);
  }

  @Mutation({
    input: IdInputSchema,
    output: z.boolean(),
  })
  delete(@Input('id') id: string): boolean {
    return this.todosService.delete(id);
  }
}

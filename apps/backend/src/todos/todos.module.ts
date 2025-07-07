import { Module } from '@nestjs/common';
import { TodoRouter } from './router/todo.router';
import { TodosService } from './todos.service';

@Module({
  providers: [TodosService, TodoRouter],
})
export class TodosModule {}

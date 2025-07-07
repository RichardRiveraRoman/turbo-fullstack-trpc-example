import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoCreate } from './schema/todo.schema';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  create(todoCreate: TodoCreate): Todo {
    const newTodo: Todo = {
      ...todoCreate,
      id: crypto.randomUUID().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  update(id: string, data: Partial<TodoCreate>): Todo {
    const todo = this.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    const updatedTodo = {
      ...todo,
      ...data,
      updatedAt: new Date(),
    };

    this.todos = this.todos.map((t) => (t.id === id ? updatedTodo : t));
    return updatedTodo;
  }

  delete(id: string): boolean {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    this.todos.splice(todoIndex, 1);
    return true;
  }
}

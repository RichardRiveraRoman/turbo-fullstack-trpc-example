"use client";

import { FormEvent, useState } from "react";
import { trpc } from "../../trpc/client";

const CreateTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const utils = trpc.useUtils();
  const mutation = trpc.todo.create.useMutation({
    onSuccess: () => {
      // When the mutation is successful, reset the form
      setName("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      // And, most importantly, tell tRPC to refetch the list of todos
      utils.todo.findAll.invalidate();
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const dueDateAsDate = dueDate ? new Date(dueDate) : undefined;

    mutation.mutate({
      name,
      description,
      // The 'completed' field has a default in the schema, so it's optional here
      dueDate: dueDateAsDate, // dueDate is now typed as Date | undefined
      priority: priority,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold">Create a New Todo</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium">
          Due Date
        </label>
        <input
          id="dueDate"
          type="datetime-local" // This input type works well with new Date()
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded-sm bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {mutation.isPending ? "Creating..." : "Create Todo"}
      </button>
    </form>
  );
};

export default CreateTodo;

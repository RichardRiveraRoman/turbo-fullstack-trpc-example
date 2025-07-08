"use client";

import { trpc } from "../trpc/client";

export default function Home() {
  const { data } = trpc.todo.findAll.useQuery();

  console.log("Data", data);

  return (
    <main>
      <h1 className="text-3xl font-bold underline">
        To view the todos got to http://localhost:5173/todos
      </h1>
    </main>
  );
}

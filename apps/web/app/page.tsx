"use client";

import { trpc } from "../trpc/client";

export default function Home() {
  const { data } = trpc.todo.findAll.useQuery();

  console.log("Data", data);

  return (
    <main>
      <h1 className="text-3xl font-bold underline"> Hello world! </h1>
    </main>
  );
}

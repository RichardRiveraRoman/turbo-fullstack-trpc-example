"use client";

import { PropsWithChildren } from "react";
import { queryClient, trpcClient, trpc } from "../trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";

const TrpcProvider = ({ children }: PropsWithChildren) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProvider;

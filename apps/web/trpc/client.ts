import { type AppRouter } from "@repo/trpc/router";
import { QueryClient } from "@tanstack/react-query";
import {
  createTRPCReact,
  CreateTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";

const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<
  AppRouter,
  object
>();

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL!,
    }),
  ],
});

export { trpc, queryClient, trpcClient };

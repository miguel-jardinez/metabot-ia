import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@meet/trpc/routers/_app";

export type AgentGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];

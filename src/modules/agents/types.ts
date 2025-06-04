import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@meet/trpc/routers/_app";

export type AgetGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];

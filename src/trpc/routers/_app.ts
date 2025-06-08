import { agentsRouter } from "@meet/modules/agents/server/procedures";
import { meetingsRouter } from "@meet/modules/meetings/server/procedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

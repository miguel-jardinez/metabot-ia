import { eq } from "drizzle-orm";

import { db } from "@meet/db";
import { agents } from "@meet/db/schema";
import { createTRPCRouter, protectedProcedure } from "@meet/trpc/init";

import { createAgent } from "../schemas";

export const agentsRouter = createTRPCRouter({
  //TODO: Change getMany to use protected procedure
  getMany: protectedProcedure.query(async () => {
    const data = await db.select()
      .from(agents);

    return data;
  }),
  getOne: protectedProcedure.input(createAgent.pick({ id: true })).query(async ({ input }) => {
    if (!input?.id) {
      throw new Error("Agent ID is required");
    }

    const [data] = await db.select()
      .from(agents)
      .where(eq(agents.id, input.id));

    return data;
  }),
  create: protectedProcedure.input(createAgent).mutation(async ({ input, ctx }) => {
    const [response] = await db
      .insert(agents)
      .values({ ...input, userId: ctx.auth.user.id })
      .returning();

    return response;
  })
});

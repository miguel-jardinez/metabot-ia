import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";

import { db } from "@meet/db";
import { agents } from "@meet/db/schema";
import { createTRPCRouter, protectedProcedure } from "@meet/trpc/init";

import { agentFilters, createAgent } from "../schemas";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.input(agentFilters).query(async ({ ctx, input }) => {
    const { page, pageSize, search } = input;

    const data = await db
      .select({
        ...getTableColumns(agents),
        meetingCount: sql<number>`1`
      })
      .from(agents)
      .where(
        and(
          eq(agents.userId, ctx.auth.user.id),
          search ? ilike(agents.name, `%${search}%`) : undefined
        )
      )
      .orderBy(desc(agents.createdAt), desc(agents.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const [total] = await db.select({ count: count() }).from(agents).where(
      and(
        eq(agents.userId, ctx.auth.user.id),
        search ? ilike(agents.name, `%${search}%`) : undefined
      )
    );

    const totalPages = Math.ceil(total.count / pageSize);

    return {
      items: data,
      total,
      totalPages: totalPages
    };
  }),
  getOne: protectedProcedure.input(createAgent.pick({ id: true })).query(async ({ input }) => {
    if (!input?.id) {
      throw new Error("Agent ID is required");
    }

    const [data] = await db.select({
      ...getTableColumns(agents),
      meetingCount: sql<number>`50`
    })
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

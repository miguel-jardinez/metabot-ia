import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";

import { db } from "@meet/db";
import { agents } from "@meet/db/schema";
import { createTRPCRouter, protectedProcedure } from "@meet/trpc/init";

import { agentFilters, agentId, agentUpdate, createAgent } from "../schemas";

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
  getOne: protectedProcedure.input(agentId).query(async ({ input, ctx }) => {
    if (!input?.id) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Agent ID is required" });
    }

    const [data] = await db.select({
      ...getTableColumns(agents),
      meetingCount: sql<number>`50`
    })
      .from(agents)
      .where(
        and(
          eq(agents.id, input.id),
          eq(agents.userId, ctx.auth.user.id)
        )
      );

    if (!data) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Client not found" });
    }

    return data;
  }),
  create: protectedProcedure.input(createAgent).mutation(async ({ input, ctx }) => {
    const [response] = await db
      .insert(agents)
      .values({ ...input, userId: ctx.auth.user.id })
      .returning();

    return response;
  }),
  delete: protectedProcedure.input(agentId).mutation(async ({ input, ctx }) => {
    const userId = ctx.auth.session.userId;
    const agentId = input.id;

    if (!agentId) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Id is required" });
    }

    const [removedAgent] = await db
      .delete(agents)
      .where(
        and(
          eq(agents.id, agentId),
          eq(agents.userId, userId)
        )
      ).returning();

    if (!removedAgent) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No agent found" });
    }

    return removedAgent;
  }),
  update: protectedProcedure.input(agentUpdate).mutation(async ({ input, ctx }) => {
    const userId = ctx.auth.session.userId;
    const agentId = input.id;

    const [updatedAgent] = await db
      .update(agents)
      .set(input)
      .where(and(
        eq(agents.id, agentId),
        eq(agents.userId, userId)
      )).returning();

    if (!updatedAgent) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No agent found" });
    }

    return updatedAgent;
  })
});

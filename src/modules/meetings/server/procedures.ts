import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike } from "drizzle-orm";

import { db } from "@meet/db";
import { meetings } from "@meet/db/schema";
import { createTRPCRouter, protectedProcedure } from "@meet/trpc/init";

import { createMeetingSchema, meetingFilterSchema, meetingIdSchema, updateMeetingSchema } from "../schemas";

export const meetingsRouter = createTRPCRouter({
  getMany: protectedProcedure.input(meetingFilterSchema).query(async ({ ctx, input }) => {
    const { page, pageSize, search } = input;

    const data = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.userId, ctx.auth.user.id),
          search ? ilike(meetings.name, `%${search}%`) : undefined
        )
      )
      .orderBy(desc(meetings.createdAt), desc(meetings.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const [total] = await db.select({ count: count() }).from(meetings).where(
      and(
        eq(meetings.userId, ctx.auth.user.id),
        search ? ilike(meetings.name, `%${search}%`) : undefined
      )
    );

    const totalPages = Math.ceil(total.count / pageSize);

    return {
      items: data,
      total,
      totalPages: totalPages
    };
  }),
  getOne: protectedProcedure.input(meetingIdSchema).query(async ({ ctx, input }) => {
    const userId = ctx.auth.user.id;

    if (!input.id) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, input.id),
          eq(meetings.userId, userId)
        )
      );

    if (!existingMeeting) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return existingMeeting;
  }),
  create: protectedProcedure.input(createMeetingSchema).mutation(async ({ input, ctx }) => {
    const [existingMeeting] = await db
      .insert(meetings)
      .values({ ...input, userId: ctx.auth.user.id })
      .returning();
  
    return existingMeeting;
  }),
  delete: protectedProcedure.input(meetingIdSchema).mutation(async ({ ctx, input }) => {
  }),
  update: protectedProcedure.input(updateMeetingSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.auth.session.userId;
    const agentId = input.id;
    
    const [updatedMeeting] = await db
      .update(meetings)
      .set(input)
      .where(and(
        eq(meetings.id, agentId),
        eq(meetings.userId, userId)
      )).returning();
    
    if (!updatedMeeting) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No agent found" });
    }
    
    return updatedMeeting;
  })
});

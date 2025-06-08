import { z } from "zod";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@meet/constants";

export const meetingIdSchema = z.object({
  id: z.string()
});

export const createMeetingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  agentId: z.string().min(1, { message: "Agent is required" })
});

export const meetingFilterSchema = z.object({ 
  page: z.number().default(DEFAULT_PAGE_NUMBER), 
  pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish()
});

export const updateMeetingSchema = createMeetingSchema.extend({
  id: z.string().min(1, { message: "id is required" })
});

export type CreateAgentSchema = z.infer<typeof createMeetingSchema>;

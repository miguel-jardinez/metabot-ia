import { z } from "zod";

export const createAgent = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  instructions: z.string().min(1, "Instructions is required")
});

export type CreateAgentSchema = z.infer<typeof createAgent>;

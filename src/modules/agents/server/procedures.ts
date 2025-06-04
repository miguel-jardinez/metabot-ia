
import { db } from "@meet/db";
import { agents } from "@meet/db/schema";
import { baseProcedure, createTRPCRouter } from "@meet/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select()
      .from(agents);

    return data;
  })
});

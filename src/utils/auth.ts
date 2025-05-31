import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@meet/db";
import * as schema from "@meet/db/schema";
 
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
  emailAndPassword:{
    enabled: true,
    maxPasswordLength: 128,
    minPasswordLength: 8
  }
});

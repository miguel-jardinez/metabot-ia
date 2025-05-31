import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@meet/db";
 
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  emailAndPassword:{
    enabled: true,
    maxPasswordLength: 128,
    minPasswordLength: 8
  }
});

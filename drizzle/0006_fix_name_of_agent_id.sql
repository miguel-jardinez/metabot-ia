ALTER TABLE "meetings" DROP CONSTRAINT "meetings_user_id_agents_id_fk";
--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "agent_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
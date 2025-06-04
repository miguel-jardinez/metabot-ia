ALTER TABLE "agents" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "instructions" text NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
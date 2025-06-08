ALTER TABLE "meetings" ALTER COLUMN "status" SET DATA TYPE "public"."meeting_status";--> statement-breakpoint
ALTER TABLE "meetings" ALTER COLUMN "status" SET DEFAULT 'upcoming';
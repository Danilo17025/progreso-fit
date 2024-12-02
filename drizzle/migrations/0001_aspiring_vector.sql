DROP INDEX IF EXISTS "roles_roleName_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE `roles` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE UNIQUE INDEX `roles_roleName_unique` ON `roles` (`roleName`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" integer NOT NULL DEFAULT CURRENT_TIMESTAMP;
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`thumbnail` text DEFAULT '' NOT NULL,
	`color` text DEFAULT '' NOT NULL,
	`external_url` text,
	`category` text DEFAULT '[]' NOT NULL,
	`case_study` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`linkedin_url` text NOT NULL
);

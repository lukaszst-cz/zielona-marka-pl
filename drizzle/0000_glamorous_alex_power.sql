CREATE TABLE `inquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`budget` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'Nowe' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`value` integer DEFAULT 0 NOT NULL,
	`stage` text DEFAULT 'Nowy kontakt' NOT NULL,
	`next_action` text DEFAULT 'Skontaktować się' NOT NULL,
	`due_date` text,
	`source` text DEFAULT 'Ręcznie' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`client_name` text NOT NULL,
	`type` text DEFAULT 'Strona firmowa' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'Planowanie' NOT NULL,
	`price` integer DEFAULT 0 NOT NULL,
	`deadline` text,
	`progress` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`website_url` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`project_id` integer,
	`status` text DEFAULT 'Do zrobienia' NOT NULL,
	`priority` text DEFAULT 'Normalny' NOT NULL,
	`due_date` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);

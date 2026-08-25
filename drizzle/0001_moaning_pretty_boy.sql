CREATE INDEX `idx_inquiries_status_created` ON `inquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_leads_stage_updated` ON `leads` (`stage`,`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_projects_published_updated` ON `projects` (`published`,`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_tasks_status_updated` ON `tasks` (`status`,`updated_at`);--> statement-breakpoint
PRAGMA optimize;

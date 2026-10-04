CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`service` text NOT NULL,
	`mode` text NOT NULL,
	`preferred_date` text NOT NULL,
	`period` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL,
	`consent_version` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);

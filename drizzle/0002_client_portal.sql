ALTER TABLE `projects` ADD `public_code` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `client_email` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `client_company` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `client_address` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `client_nip` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `scope` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `next_step` text NOT NULL DEFAULT 'Ustalenie kolejnego etapu';
ALTER TABLE `projects` ADD `client_note` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `contract_status` text NOT NULL DEFAULT 'Szkic';
ALTER TABLE `projects` ADD `contract_number` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `start_date` text;
ALTER TABLE `projects` ADD `provider_name` text NOT NULL DEFAULT 'Zielona Marka  -  Łukasz Staniewicz';
ALTER TABLE `projects` ADD `provider_address` text NOT NULL DEFAULT '';
ALTER TABLE `projects` ADD `provider_nip` text NOT NULL DEFAULT '';
UPDATE `projects`
SET `public_code` = 'ZM-' || upper(substr(hex(randomblob(6)), 1, 4)) || '-' || upper(substr(hex(randomblob(6)), 5, 4)) || '-' || upper(substr(hex(randomblob(6)), 9, 4))
WHERE `public_code` = '';
CREATE UNIQUE INDEX `idx_projects_public_code_unique` ON `projects` (`public_code`);

DROP DATABASE IF EXISTS `h23s_08`;

CREATE DATABASE `h23s_08` DEFAULT CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `h23s_08`;

CREATE TABLE `tasks` (
  `id` CHAR(36) NOT NULL,
  `author_id` CHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` CHAR(36) NOT NULL,
  `clerk_id` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `groups` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tasks_groups` (
  `task_id` CHAR(36) NOT NULL,
  `group_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`task_id`, `group_id`)
);

CREATE TABLE `group_members` (
  `group_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`group_id`, `user_id`)
)

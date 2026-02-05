-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2026 at 06:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `triumph`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` varchar(500) DEFAULT NULL,
  `author_name` varchar(255) DEFAULT NULL,
  `author_bio` longtext DEFAULT NULL,
  `summary` varchar(500) DEFAULT NULL,
  `content` longtext NOT NULL,
  `original_content` longtext DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `keys` text DEFAULT NULL,
  `banner_image` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `blog_category_id` bigint(20) UNSIGNED NOT NULL,
  `read_time` varchar(255) NOT NULL DEFAULT '5 min',
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` varchar(500) DEFAULT NULL,
  `seo_keywords` longtext DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `author_name`, `author_bio`, `summary`, `content`, `original_content`, `tags`, `keys`, `banner_image`, `user_id`, `blog_category_id`, `read_time`, `status`, `featured`, `seo_title`, `seo_description`, `seo_keywords`, `publish_date`, `created_at`, `updated_at`) VALUES
(1, 'Assisted Living for Seniors: Comfort, Care and a Better Quality of Life', 'w', 'How Assisted Living Improves Quality of Life for Seniors', 'No', '', 'How Assisted Living Improves Quality of Life for Seniors', '<p>Assisted living is aimed to support seniors who need help with daily activities while still allowing them to maintain their independence. It bridges the gap between living at home and receiving full-time medical care. The goal is simple: to improve quality of life while respecting each resident’s lifestyle, preferences and individuality.</p><h2><strong>A Safe and Supportive Living Environment</strong></h2><p>Safety is one of the top concerns for seniors and their families. As people age, the risk of falls, accidents and medical emergencies increases. Assisted living communities are designed with elderly safety in mind.</p><p>At Hollywood Royale, living spaces are thoughtfully planned to reduce the difficulty and make movement easier. Handrails, proper lighting, emergency call systems and trained staff are available around the clock, helping residents feel safe and secure. Knowing that help is always nearby provides peace of mind not only to seniors but also to their families.</p><p>This safe environment allows seniors to move freely and confidently, without the constant fear of being alone during an emergency.</p><h2><strong>Personalized Help With Daily Activities</strong></h2><p>Daily tasks that once felt easy can become tiring or difficult with age. Assisted living provides support with activities such as bathing, dressing, grooming, medication reminders and mobility assistance.</p><p>At Hollywood Royale, care is never rushed or impersonal. Assistance is tailored to each resident’s needs, ensuring they receive help only where required. This balance helps seniors maintain independence while avoiding frustration or exhaustion.</p><p>When daily routines become smoother, seniors have more energy and time to focus on enjoying their day rather than struggling through it.</p><h2><strong>Improved Physical Health and Wellness</strong></h2><p>Health is an essential foundation for a better quality of life. Assisted living supports seniors in maintaining better physical health through consistent routines, proper nutrition and access to care.</p>', NULL, '[\"Beginner\",\"Market\"]', NULL, 'blog/banners/85VXxOrLDACOBHKPRATts04d7fHogjbgbhLa0WKq.png', 1, 1, '5 min', 'draft', 0, 'w | Blog', 'w', 'Beginner', '2026-01-30', '2026-01-31 06:40:33', '2026-01-31 06:53:45');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `category_name`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Property Tips', NULL, '2026-01-31 06:39:55', '2026-01-31 06:39:55'),
(2, 'Market Trends', NULL, '2026-01-31 06:40:00', '2026-01-31 06:40:00'),
(3, 'Resident Guides', NULL, '2026-01-31 06:40:04', '2026-01-31 06:40:04'),
(4, 'Maintenance', NULL, '2026-01-31 06:40:08', '2026-01-31 06:40:08'),
(5, 'Community', NULL, '2026-01-31 06:40:12', '2026-01-31 06:40:12'),
(6, 'Industry News', NULL, '2026-01-31 06:40:16', '2026-01-31 06:40:16');

-- --------------------------------------------------------

--
-- Table structure for table `blog_comments`
--

CREATE TABLE `blog_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comment` longtext NOT NULL,
  `blog_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_images`
--

CREATE TABLE `blog_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `blog_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_likes`
--

CREATE TABLE `blog_likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blog_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(31, '0001_01_01_000000_create_users_table', 1),
(32, '0001_01_01_000001_create_cache_table', 1),
(33, '0001_01_01_000002_create_jobs_table', 1),
(34, '2026_01_20_215334_create_blog_categories_table', 1),
(35, '2026_01_20_221502_create_blogs_table', 1),
(36, '2026_01_21_160823_create_blog_images_table', 1),
(37, '2026_01_22_235228_create_blog_likes_table', 1),
(38, '2026_01_22_235231_create_blog_comments_table', 1),
(39, '2026_01_27_224258_create_properties_table', 1),
(40, '2026_01_28_051451_create_property_inquiries_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `image_url`, `image`, `title`, `location`, `description`, `created_at`, `updated_at`) VALUES
(1, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop', NULL, 'Modern Luxury Villa in Beverly Hills', 'Beverly Hills, Los Angeles', 'Stunning modern villa with panoramic city views, infinity pool, and smart home features. This 5-bedroom property features floor-to-ceiling windows, gourmet kitchen, home theater, and private garden.', '2026-01-31 06:39:16', '2026-01-31 06:39:16'),
(2, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800&auto=format&fit=crop', NULL, 'Beachfront Property in Santa Monica', 'Santa Monica, Los Angeles', 'Direct beach access from this contemporary beach house. Features include oceanfront patio, rooftop deck, 4 bedrooms, 3.5 bathrooms, and private beach cabana. Perfect for coastal living.', '2026-01-31 06:39:16', '2026-01-31 06:39:16'),
(3, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop', NULL, 'Downtown LA Penthouse with Skyline View', 'Downtown Los Angeles', 'Luxury penthouse in the heart of downtown with 360-degree city views. Features private elevator, chef\'s kitchen, wine cellar, and expansive terrace with outdoor kitchen and fire pit.', '2026-01-31 06:39:16', '2026-01-31 06:39:16'),
(4, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop', NULL, 'Hollywood Hills Modern Retreat', 'Hollywood Hills, Los Angeles', 'Architectural masterpiece nestled in Hollywood Hills. Features floor-to-ceiling glass walls, infinity pool overlooking the city, 4 bedrooms, home gym, and integrated smart home system.', '2026-01-31 06:39:16', '2026-01-31 06:39:16'),
(5, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop', NULL, 'Venice Beach Artistic Bungalow', 'Venice Beach, Los Angeles', 'Charming artistic bungalow steps away from Venice Beach boardwalk. Features custom murals, rooftop deck, 3 bedrooms, open-concept living space, and private courtyard with outdoor shower.', '2026-01-31 06:39:16', '2026-01-31 06:39:16'),
(6, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop', NULL, 'Malibu Oceanfront Estate', 'Malibu, Los Angeles', 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.', '2026-01-31 06:39:16', '2026-01-31 06:39:16');

-- --------------------------------------------------------

--
-- Table structure for table `property_inquiries`
--

CREATE TABLE `property_inquiries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `interested_property` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `interested` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2ytzh2hyndPZVBwTDiZjRKTYj0F559CSC1nqdQSv', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRVRkTzRkSWVMZHBjZ1A4ZkZSaFpCSmJkMG9lZExtR2lDWXROT2hsUyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMyOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvY3JlYXRlUG9zdCI7czo1OiJyb3V0ZSI7czoxMDoiY3JlYXRlUG9zdCI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1769793860);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT '1' COMMENT '0 means admin 1 user',
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `about_yourself` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `role`, `name`, `last_name`, `email`, `email_verified_at`, `password`, `profile_pic`, `about_yourself`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, '0', 'Krishna Singh', NULL, 'krishna@gmail.com', '2026-01-31 06:39:16', '$2y$12$lWmkSBJcl3wWtrnszi7qT.C.etbs1rrI/i46sCb0kCeaQij0k62ea', NULL, NULL, 'thC3Cl1L3g', '2026-01-31 06:39:16', '2026-01-31 06:39:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogs_user_id_foreign` (`user_id`),
  ADD KEY `blogs_blog_category_id_foreign` (`blog_category_id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_comments_blog_id_foreign` (`blog_id`),
  ADD KEY `blog_comments_user_id_foreign` (`user_id`),
  ADD KEY `blog_comments_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `blog_images`
--
ALTER TABLE `blog_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_images_blog_id_foreign` (`blog_id`);

--
-- Indexes for table `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_likes_blog_id_user_id_unique` (`blog_id`,`user_id`),
  ADD KEY `blog_likes_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_inquiries`
--
ALTER TABLE `property_inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_images`
--
ALTER TABLE `blog_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_likes`
--
ALTER TABLE `blog_likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `property_inquiries`
--
ALTER TABLE `property_inquiries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_blog_category_id_foreign` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blogs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD CONSTRAINT `blog_comments_blog_id_foreign` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_comments_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `blog_comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_images`
--
ALTER TABLE `blog_images`
  ADD CONSTRAINT `blog_images_blog_id_foreign` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD CONSTRAINT `blog_likes_blog_id_foreign` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

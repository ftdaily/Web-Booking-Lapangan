-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2025 at 04:59 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_kampus`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `room_id` int UNSIGNED NOT NULL,
  `booking_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','approved','rejected','cancelled','completed') NOT NULL DEFAULT 'pending',
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_transaksi`
--

CREATE TABLE `log_transaksi` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `role` enum('admin','mahasiswa') DEFAULT NULL,
  `action` varchar(50) NOT NULL,
  `table_name` varchar(100) DEFAULT NULL,
  `record_id` int UNSIGNED DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `log_transaksi`
--

INSERT INTO `log_transaksi` (`id`, `user_id`, `role`, `action`, `table_name`, `record_id`, `description`, `created_at`) VALUES
(1, 2, 'mahasiswa', 'LOGIN', 'users', 2, 'User logged in - Email: syifarrell2805@gmail.com - Role: mahasiswa', '2025-11-26 10:07:16'),
(2, 3, 'mahasiswa', 'REGISTER', NULL, 3, 'Mahasiswa baru - Email: Lorem@lorem.com', '2025-11-29 01:44:46'),
(3, 4, 'mahasiswa', 'REGISTER', NULL, 4, 'Mahasiswa baru - Email: admin@sporthub.com', '2025-11-29 01:48:02'),
(4, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 01:49:47'),
(5, 3, 'mahasiswa', 'LOGIN', 'users', 3, 'User logged in - Email: lorem@lorem.com - Role: mahasiswa', '2025-11-29 02:38:30'),
(6, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 02:38:51'),
(7, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 02:38:56'),
(8, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 02:39:05'),
(9, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 02:39:37'),
(10, 5, 'mahasiswa', 'REGISTER', NULL, 5, 'Mahasiswa baru - Email: farrell@farrell.com', '2025-11-29 02:40:34'),
(11, 5, 'mahasiswa', 'LOGIN', 'users', 5, 'User logged in - Email: farrell@farrell.com - Role: mahasiswa', '2025-11-29 02:40:47'),
(12, 5, 'mahasiswa', 'LOGIN', 'users', 5, 'User logged in - Email: farrell@farrell.com - Role: mahasiswa', '2025-11-29 02:43:51'),
(13, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 02:44:10'),
(14, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 02:51:11'),
(15, 6, 'mahasiswa', 'REGISTER', NULL, 6, 'Mahasiswa baru - Email: raymaru@horas.com', '2025-11-29 02:51:46'),
(16, 4, 'admin', 'APPROVE_USER', 'users', 6, 'Admin 4 approved user id 6', '2025-11-29 02:52:20'),
(17, 6, 'mahasiswa', 'LOGIN', 'users', 6, 'User logged in - Email: raymaru@horas.com - Role: mahasiswa', '2025-11-29 02:52:32'),
(18, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 03:35:08'),
(19, 6, 'mahasiswa', 'LOGIN', 'users', 6, 'User logged in - Email: raymaru@horas.com - Role: mahasiswa', '2025-11-29 04:04:01'),
(20, 4, 'admin', 'LOGIN', 'users', 4, 'User logged in - Email: admin@sporthub.com - Role: admin', '2025-11-29 04:18:00');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `description` text,
  `price_per_hour` decimal(10,2) NOT NULL DEFAULT '0.00',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(50) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `facilities` json DEFAULT (json_array())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `location`, `description`, `price_per_hour`, `is_active`, `created_at`, `updated_at`, `type`, `capacity`, `image`, `facilities`) VALUES
(1, 'Lapangan 1', 'Kampus H', '', '50000.00', 1, '2025-11-29 03:36:14', '2025-11-29 04:03:04', 'Badminton', 4, 'https://saraga.id/blog/wp-content/uploads/2024/07/3-1024x768.jpeg', '[\"AC\", \"Shower\"]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `npm` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','mahasiswa') NOT NULL DEFAULT 'mahasiswa',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `npm`, `email`, `phone`, `password`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'admin@sporthub.com', 'ADMIN', 'admin@sporthub.com', '12345678', '$2b$10$Cwy3Yxc79ZILnxscCAchl.rV79rAdiwxL8u/Y51m/cJAG9EhmOSMK', 'admin', 1, '2025-11-29 01:48:02', '2025-11-29 01:49:39'),
(5, 'farrell', 'farrell', 'farrell@farrell.com', '12345678', '$2b$10$bhTg1untEONtT7xx4h7wmubQPqiV.pCfCgVn8JuLoddCFAvknTJuG', 'mahasiswa', 1, '2025-11-29 02:40:34', '2025-11-29 02:40:34'),
(6, 'raymaru', '123123123', 'raymaru@horas.com', '123123123123', '$2b$10$7zEXnjTVbvQh3QQoT8qbl.bNXr8neeX80vh8WLIlDcFs7Dr8gkw8a', 'mahasiswa', 1, '2025-11-29 02:51:46', '2025-11-29 02:52:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bookings_user` (`user_id`),
  ADD KEY `fk_bookings_room` (`room_id`);

--
-- Indexes for table `log_transaksi`
--
ALTER TABLE `log_transaksi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `log_transaksi`
--
ALTER TABLE `log_transaksi`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table nutech-backend-nodejs-iqrahabibi.banner
CREATE TABLE IF NOT EXISTS `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(50) DEFAULT NULL,
  `banner_image` text,
  `description` text,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nutech-backend-nodejs-iqrahabibi.banner: ~0 rows (approximately)
INSERT INTO `banner` (`id`, `banner_name`, `banner_image`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(2, 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(3, 'Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(4, 'Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(5, 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(6, 'Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(7, 'Banner 7', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(8, 'Banner 8', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL),
	(9, 'Banner 9', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-10-22 02:49:50', NULL);

-- Dumping structure for table nutech-backend-nodejs-iqrahabibi.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_code` varchar(50) DEFAULT NULL,
  `service_name` varchar(50) DEFAULT NULL,
  `service_icon` varchar(50) DEFAULT NULL,
  `service_tarif` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nutech-backend-nodejs-iqrahabibi.services: ~0 rows (approximately)
INSERT INTO `services` (`id`, `service_code`, `service_name`, `service_icon`, `service_tarif`, `created_at`, `updated_at`) VALUES
	(1, 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-10-22 02:56:47', NULL),
	(2, 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, '2024-10-22 02:56:47', NULL),
	(3, 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-10-22 02:56:47', NULL),
	(4, 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-10-22 02:56:47', NULL),
	(5, 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-10-22 02:56:47', NULL),
	(6, 'MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-10-22 02:56:47', NULL),
	(7, 'TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-10-22 02:56:47', NULL),
	(8, 'PAKET_DATA', 'Paket data', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-10-22 02:56:47', NULL),
	(9, 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-10-22 02:56:47', NULL),
	(10, 'VOUCHER_MAKANAN', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-10-22 02:56:47', NULL),
	(11, 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000, '2024-10-22 02:56:47', NULL),
	(12, 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000, '2024-10-22 02:56:47', NULL);

-- Dumping structure for table nutech-backend-nodejs-iqrahabibi.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(50) DEFAULT NULL,
  `transaction_type` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nutech-backend-nodejs-iqrahabibi.transaction: ~0 rows (approximately)
INSERT INTO `transaction` (`id`, `invoice_number`, `transaction_type`, `description`, `total_amount`, `email`, `created_at`, `updated_at`) VALUES
	(5, 'INV22102024-1729572043561', 'PAYMENT', 'Pulsa', 40000, 'iqra2@gmail.com', '2024-10-22 04:40:43', NULL),
	(6, 'INV22102024-1729572081429', 'PAYMENT', 'Pulsa', 40000, 'iqra2@gmail.com', '2024-10-22 04:41:21', NULL),
	(7, 'INV22102024-1729572282857', 'PAYMENT', 'PGN Berlangganan', 50000, 'iqra2@gmail.com', '2024-10-22 04:44:42', NULL),
	(8, 'INV22102024-348', 'TOPUP', 'Top Up Balance', 5000, 'iqra2@gmail.com', '2024-10-22 04:46:17', NULL);

-- Dumping structure for table nutech-backend-nodejs-iqrahabibi.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `balance` int DEFAULT NULL,
  `profile_image` text,
  `password` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci COMMENT 'default password 12345678',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table nutech-backend-nodejs-iqrahabibi.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `balance`, `profile_image`, `password`, `created_at`, `updated_at`) VALUES
	(11, 'iqra2@gmail.com', 'iqra 3', 'habibi 3', 1495005, '06b773a6c92f54cd9cb839b41430579e.png', '$2b$10$cYgDrx8xhWsh82noFctMVemcJPgx1mwsMyYrQhzysXrj0miEymJ7i', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

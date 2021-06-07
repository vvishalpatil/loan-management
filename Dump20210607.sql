-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: loan_management
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_info`
--

DROP TABLE IF EXISTS `admin_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_info`
--

LOCK TABLES `admin_info` WRITE;
/*!40000 ALTER TABLE `admin_info` DISABLE KEYS */;
INSERT INTO `admin_info` VALUES (1,'Nikhil','patil','nikhik111','nikhil@gmail.com','nikhilnikhil');
/*!40000 ALTER TABLE `admin_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_info`
--

DROP TABLE IF EXISTS `loan_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_info` (
  `loan_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `loan_type` varchar(30) DEFAULT NULL,
  `total_loan` varchar(30) DEFAULT NULL,
  `paid_loan` varchar(30) DEFAULT '0',
  `loan_tenure` varchar(10) DEFAULT NULL,
  `tenure_completed` varchar(30) DEFAULT '0',
  `tenure_parameter` varchar(20) DEFAULT 'months',
  `interest_rate` varchar(10) DEFAULT NULL,
  `installment_amt` varchar(30) DEFAULT NULL,
  `issue_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `installment_due_date` varchar(50) DEFAULT NULL,
  `loan_status` varchar(10) NOT NULL DEFAULT 'active',
  `interest_paid` varchar(45) DEFAULT '0',
  PRIMARY KEY (`loan_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_info`
--

LOCK TABLES `loan_info` WRITE;
/*!40000 ALTER TABLE `loan_info` DISABLE KEYS */;
INSERT INTO `loan_info` VALUES (1,1,'Car Loan','200000','200000','60','60','months','12','12000','2021-02-09 09:50:05','2021-04-30','closed','120000'),(3,2,'Home Loan','1500000','525000','50','35','months','8','15000','2021-02-09 09:53:11','2021-02-28','active','350000'),(7,1,'Personal Loan','1000','1000','10','10','months','17','55.83','2021-02-22 07:21:13','2021-05-31','closed','141.6'),(19,1,'Home Loan','200000','200000','12','12','months','7','6722.22','2021-02-23 11:24:06','2021-04-30','closed','14000'),(21,1,'Car Loan','500000','500000','120','120','months','9','4097.22','2021-03-03 11:11:35','null','closed','45000'),(22,4,'Personal Loan','5000','5000','12','12','months','17','416.67','2021-03-24 06:40:24','2021-10-31','closed','850'),(23,4,'Home Loan','12000','12000','12','12','months','7','1000.0','2021-03-24 06:48:02','2021-05-31','closed','840'),(24,4,'Car Loan','5000','5000','12','12','months','9','416.67','2021-03-24 06:55:37','null','closed','450'),(25,1,'Car Loan','240000','0','24','0','months','9','10000.0','2021-03-24 07:38:31','2021-04-30','active',''),(26,1,'Home Loan','2400000','158691.58878504674','120','8','months','7','20000.0','2021-03-24 07:40:41','2021-12-31','active','99308.41'),(27,1,'Personal Loan','120000','120000','12','12','months','17','10000.0','2021-03-24 09:12:05','null','closed','20400'),(28,5,'Personal Loan','340000','0','60','0','months','17','5666.67','2021-03-24 09:17:54','2021-04-30','active',''),(29,1,'Personal Loan','500','500','12','12','months','17','41.62999999999988','2021-03-30 12:32:07','null','closed','85'),(30,1,'Personal Loan','10000','10000','12','12','months','17','975.0033333333339','2021-04-12 09:56:30','null','closed','1558.3666666666666'),(31,1,'Personal Loan','10000','10000','12','12','months','17','975.0','2021-04-12 10:08:27','null','closed','141.67');
/*!40000 ALTER TABLE `loan_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_info`
--

DROP TABLE IF EXISTS `transaction_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_info` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `loan_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` varchar(50) DEFAULT NULL,
  `paid_amount` int DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`tid`),
  KEY `FK_uid` (`user_id`),
  KEY `fk_loan_id` (`loan_id`),
  CONSTRAINT `fk_loan_id` FOREIGN KEY (`loan_id`) REFERENCES `loan_info` (`loan_id`),
  CONSTRAINT `FK_uid` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_info`
--

LOCK TABLES `transaction_info` WRITE;
/*!40000 ALTER TABLE `transaction_info` DISABLE KEYS */;
INSERT INTO `transaction_info` VALUES (4,1,1,'2021-02-17 18:30:00','installment money ',2000,''),(5,1,1,'2021-02-17 18:30:00','installment money ',2000,''),(6,1,1,'2021-02-17 18:30:00','installment money ',2000,''),(7,1,1,'2021-02-17 18:30:00','installment money ',20000,''),(8,1,1,'2021-02-17 18:30:00','installment money ',20000,''),(9,1,1,'2021-02-17 18:30:00','installment money ',20000,''),(10,1,1,'2021-02-17 18:30:00','installment money ',44000,''),(11,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(12,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(13,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(14,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(15,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(16,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(17,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(18,1,1,'2021-02-17 18:30:00','installment money ',10000,''),(19,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(20,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(21,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(22,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(23,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(24,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(25,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(26,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(27,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(28,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(29,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(30,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(31,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(32,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(33,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(34,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(35,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(36,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(37,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(38,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(39,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(40,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(41,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(42,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(43,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(44,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(45,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(46,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(47,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(48,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(49,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(50,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(51,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(52,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(53,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(54,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(55,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(56,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(57,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(58,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(59,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(60,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(61,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(62,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(63,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(64,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(65,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(66,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(67,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(68,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(69,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(70,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(71,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(72,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(73,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(74,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(75,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(76,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(77,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(78,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(79,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(80,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(81,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(82,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(83,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(84,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(85,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(86,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(87,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(88,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(89,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(90,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(91,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(92,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(93,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(94,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(95,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(96,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(97,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(98,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(99,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(100,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(101,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(102,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(103,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(104,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(105,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(106,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(107,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(108,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(109,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(110,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(111,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(112,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(113,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(114,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(115,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(116,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(117,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(118,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(119,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(120,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(121,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(122,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(123,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(124,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(125,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(126,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(127,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(128,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(129,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(130,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(131,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(132,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(133,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(134,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(135,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(136,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(137,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(138,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(139,1,1,'2021-02-18 18:30:00','installment money ',12000,''),(140,1,1,'2021-02-18 18:30:00','installment money ',12000,'yellow'),(141,1,1,'2021-02-18 18:30:00','installment money ',12000,'yellow'),(142,3,2,'2021-02-18 18:30:00','installment money ',15000,''),(143,3,2,'2021-02-18 18:30:00','installment money ',15000,''),(144,3,2,'2021-02-18 18:30:00','installment money ',15000,''),(145,3,2,'2021-02-18 18:30:00','installment money ',15000,''),(146,3,2,'2021-02-18 18:30:00','installment money ',15000,''),(147,3,2,'2021-02-18 18:30:00','installment money ',15000,''),(148,3,2,'2021-02-20 18:30:00','installment money ',15000,''),(149,3,2,'2021-02-20 18:30:00','installment money ',15000,''),(150,3,2,'2021-02-21 18:30:00','installment money ',15000,''),(151,3,2,'2021-02-22 05:33:38','installment money ',15000,''),(152,3,2,'2021-02-22 05:37:03','installment money ',15000,''),(153,3,2,'2021-02-22 05:40:39','installment money ',15000,''),(154,3,2,'2021-02-22 05:40:56','installment money ',15000,''),(155,3,2,'2021-02-22 05:41:05','installment money ',15000,''),(156,3,2,'2021-02-22 05:41:13','installment money ',15000,''),(157,3,2,'2021-02-22 05:41:29','installment money ',15000,''),(158,3,2,'2021-02-22 05:41:38','installment money ',15000,''),(159,3,2,'2021-02-22 05:41:48','installment money ',15000,''),(160,3,2,'2021-02-22 05:43:02','installment money ',15000,''),(161,3,2,'2021-02-22 05:43:12','installment money ',15000,''),(162,3,2,'2021-02-22 05:43:21','installment money ',15000,''),(163,3,2,'2021-02-22 05:43:32','installment money ',15000,''),(164,3,2,'2021-02-22 05:47:20','installment money ',15000,''),(165,3,2,'2021-02-22 05:47:54','installment money ',15000,''),(166,3,2,'2021-02-22 05:49:20','installment money ',15000,''),(167,3,2,'2021-02-22 05:49:31','installment money ',15000,''),(168,3,2,'2021-02-22 05:50:09','installment money ',15000,''),(169,3,2,'2021-02-23 10:40:47','installment money ',15000,'green'),(170,3,2,'2021-02-23 10:51:39','installment money ',15000,'green'),(171,3,2,'2021-02-23 11:03:03','installment money ',15000,''),(172,3,2,'2021-02-23 11:04:51','installment money ',15000,'green'),(173,3,2,'2021-02-23 11:08:03','installment money ',15000,'green'),(174,3,2,'2021-02-23 11:08:56','installment money ',15000,'red'),(175,3,2,'2021-02-23 11:11:29','installment money ',15000,'yellow'),(176,3,2,'2021-02-23 11:12:33','installment money ',15000,'red'),(177,1,1,'2021-03-03 11:05:32','installment money ',12000,'green'),(178,7,1,'2021-03-03 11:05:46','installment money ',56,'green'),(179,7,1,'2021-03-23 15:34:27','installment money ',944,'green'),(180,21,1,'2021-03-24 05:00:21','installment money ',4097,'green'),(181,19,1,'2021-03-24 05:05:38','installment money ',200000,'green'),(182,21,1,'2021-03-24 05:10:17','installment money ',4097,'green'),(183,21,1,'2021-03-24 05:10:38','installment money ',4097,'green'),(184,21,1,'2021-03-24 05:17:03','installment money ',4097,'green'),(185,21,1,'2021-03-24 05:31:30','installment money ',4097,'green'),(186,21,1,'2021-03-24 05:34:48','installment money ',4097,'green'),(187,21,1,'2021-03-24 05:37:50','installment money ',4097,'green'),(188,22,4,'2021-03-24 06:40:40','installment money ',417,'green'),(189,22,4,'2021-03-24 06:40:49','installment money ',417,'green'),(190,22,4,'2021-03-24 06:41:00','installment money ',417,'green'),(191,22,4,'2021-03-24 06:44:42','installment money ',417,'green'),(192,22,4,'2021-03-24 06:45:02','installment money ',3333,'green'),(193,22,4,'2021-03-24 06:47:17','installment money ',5000,'green'),(194,23,4,'2021-03-24 06:48:15','installment money ',12000,'green'),(195,24,4,'2021-03-24 06:55:59','installment money ',417,'green'),(196,24,4,'2021-03-24 07:02:32','installment money ',4583,'green'),(197,21,1,'2021-03-24 07:13:27','installment money ',4097,'green'),(198,21,1,'2021-03-24 07:13:52','installment money ',4097,'green'),(199,21,1,'2021-03-24 07:18:28','installment money ',4097,'green'),(200,21,1,'2021-03-24 07:18:40','installment money ',4097,'green'),(201,21,1,'2021-03-24 07:19:02','installment money ',4097,'green'),(202,21,1,'2021-03-24 07:21:52','installment money ',4097,'green'),(203,21,1,'2021-03-24 07:22:18','installment money ',4097,'green'),(204,21,1,'2021-03-24 07:23:03','installment money ',4097,'red'),(205,21,1,'2021-03-24 07:23:54','installment money ',4097,'red'),(206,21,1,'2021-03-24 07:24:28','installment money ',4097,'yellow'),(207,21,1,'2021-03-24 07:24:42','installment money ',4097,'green'),(208,21,1,'2021-03-24 07:27:11','installment money ',4097,'green'),(209,21,1,'2021-03-24 07:27:22','installment money ',4097,'green'),(210,21,1,'2021-03-24 07:27:36','installment money ',4097,'green'),(211,21,1,'2021-03-24 07:27:47','installment money ',4097,'green'),(212,21,1,'2021-03-24 07:27:57','installment money ',4097,'green'),(213,21,1,'2021-03-24 07:28:25','installment money ',4097,'green'),(214,21,1,'2021-03-24 07:28:54','installment money ',4097,'green'),(215,21,1,'2021-03-24 07:29:05','installment money ',4097,'green'),(216,21,1,'2021-03-24 07:29:14','installment money ',4097,'green'),(217,21,1,'2021-03-24 07:29:26','installment money ',4097,'green'),(218,21,1,'2021-03-24 07:29:39','installment money ',405764,'green'),(219,26,1,'2021-03-24 07:41:03','installment money ',20000,'green'),(220,26,1,'2021-03-24 07:41:14','installment money ',20000,'green'),(221,26,1,'2021-03-24 09:00:31','installment money ',20000,'green'),(222,26,1,'2021-03-24 09:00:49','installment money ',20000,'green'),(223,26,1,'2021-03-24 09:10:50','installment money ',20000,'green'),(224,27,1,'2021-03-24 09:12:59','installment money ',10000,'green'),(225,26,1,'2021-03-24 10:38:53','installment money ',20000,'green'),(226,26,1,'2021-03-24 10:41:08','installment money ',20000,'green'),(227,27,1,'2021-03-30 09:38:57','installment money ',10000,'green'),(228,27,1,'2021-03-30 11:01:43','installment money ',10000,'green'),(229,27,1,'2021-03-30 11:02:41','installment money ',10000,'green'),(230,27,1,'2021-03-30 11:04:09','installment money ',10000,'green'),(231,27,1,'2021-03-30 11:12:37','installment money ',10000,'green'),(232,27,1,'2021-03-30 11:14:53','installment money ',10000,'green'),(233,27,1,'2021-03-30 11:15:05','installment money ',10000,'green'),(234,27,1,'2021-03-30 11:15:56','installment money ',10000,'green'),(235,27,1,'2021-03-30 11:16:25','installment money ',10000,'green'),(236,27,1,'2021-03-30 11:17:14','installment money ',10000,'green'),(237,27,1,'2021-03-30 11:17:25','installment money ',10000,'green'),(238,27,1,'2021-03-30 11:19:50','installment money ',10000,'green'),(239,27,1,'2021-03-30 11:24:44','installment money ',10000,'green'),(240,27,1,'2021-03-30 11:24:54','installment money ',10000,'green'),(241,27,1,'2021-03-30 11:25:04','installment money ',10000,'green'),(242,27,1,'2021-03-30 11:25:15','installment money ',10000,'green'),(243,27,1,'2021-03-30 11:25:28','installment money ',10000,'green'),(244,27,1,'2021-03-30 11:25:37','installment money ',10000,'green'),(245,27,1,'2021-03-30 11:25:47','installment money ',10000,'green'),(246,27,1,'2021-03-30 11:26:05','installment money ',10000,'green'),(247,27,1,'2021-03-30 11:48:52','installment money ',10000,'green'),(248,27,1,'2021-03-30 12:01:06','installment money ',10000,'green'),(249,27,1,'2021-03-30 12:04:37','installment money ',10000,'green'),(250,27,1,'2021-03-30 12:05:59','installment money ',10000,'green'),(251,27,1,'2021-03-30 12:07:49','installment money ',10000,'green'),(252,27,1,'2021-03-30 12:07:59','installment money ',10000,'green'),(253,27,1,'2021-03-30 12:15:22','installment money ',10000,'green'),(254,27,1,'2021-03-30 12:15:59','installment money ',10000,'green'),(255,29,1,'2021-03-30 12:32:22','installment money ',42,'green'),(256,29,1,'2021-03-30 12:32:34','installment money ',42,'green'),(257,29,1,'2021-03-30 12:33:07','installment money ',42,'green'),(258,29,1,'2021-03-30 12:33:24','installment money ',42,'green'),(259,29,1,'2021-03-30 12:33:35','installment money ',42,'green'),(260,29,1,'2021-03-30 12:33:44','installment money ',42,'green'),(261,29,1,'2021-03-30 12:33:54','installment money ',42,'green'),(262,29,1,'2021-03-30 12:34:17','installment money ',42,'green'),(263,29,1,'2021-03-30 12:34:26','installment money ',42,'green'),(264,29,1,'2021-03-30 12:34:42','installment money ',42,'green'),(265,29,1,'2021-03-30 12:35:11','installment money ',42,'green'),(266,29,1,'2021-03-30 12:35:34','installment money ',42,'green'),(267,30,1,'2021-04-12 10:00:58','installment money ',975,'green'),(268,30,1,'2021-04-12 10:02:48','installment money ',975,'green'),(269,30,1,'2021-04-12 10:03:57','installment money ',975,'green'),(270,30,1,'2021-04-12 10:04:12','installment money ',975,'green'),(271,30,1,'2021-04-12 10:04:22','installment money ',975,'green'),(272,30,1,'2021-04-12 10:04:39','installment money ',975,'green'),(273,30,1,'2021-04-12 10:04:51','installment money ',975,'green'),(274,30,1,'2021-04-12 10:05:01','installment money ',975,'green'),(275,30,1,'2021-04-12 10:05:11','installment money ',975,'green'),(276,30,1,'2021-04-12 10:05:23','installment money ',975,'green'),(277,30,1,'2021-04-12 10:05:38','installment money ',975,'green'),(278,30,1,'2021-04-12 10:05:55','installment money ',975,'green'),(279,31,1,'2021-04-12 10:24:42','installment money ',975,'green'),(280,31,1,'2021-04-12 10:26:25','installment money ',9167,'green'),(281,31,1,'2021-04-12 10:27:14','installment money ',9167,'green'),(282,31,1,'2021-04-12 10:29:56','installment money ',9167,'green'),(283,31,1,'2021-04-12 10:39:40','installment money ',9167,'green'),(284,26,1,'2021-06-02 07:25:08','installment money ',20000,'green');
/*!40000 ALTER TABLE `transaction_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `dob` varchar(30) DEFAULT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'Vishal ','Patil','vishalpatil948@gmail.com','8554907837','','2021-03-24 09:02:15','Dondaicha','male','vishal111','vishalvishal'),(2,'Vivek','Thakare','vivekthakare@gmail.com','9988933838','1998-08-16','2021-03-23 16:07:01','Nagpur','male','vivek123','vivekvivek'),(3,'junaid','shaikh','junaid@gmail.com','8849355343','2021-07-02','2021-03-11 06:07:30','pune','male','junaid123','junaidjunaid'),(4,'Abrar','Momin','abrar@gmail.com','9384583833','1988-12-22','2021-03-24 06:39:50','pune','male','abrar111','abrarabrar'),(5,'udit','shrivastrava','udit@gmail.com','9384389339','1999-03-23','2021-03-24 09:16:49','surat','male','udit111','uditudit');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-07 16:13:58

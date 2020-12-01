-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: rfr_calc
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `base_rate`
--

DROP TABLE IF EXISTS `base_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base_rate` (
  `date` date NOT NULL,
  `benchmark_symbol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rate` decimal(6,4) NOT NULL,
  `is_final` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`date`,`benchmark_symbol`),
  KEY `benchmark_id_idx` (`benchmark_symbol`),
  CONSTRAINT `benchmark_baserate_sym` FOREIGN KEY (`benchmark_symbol`) REFERENCES `benchmark` (`symbol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_rate`
--

LOCK TABLES `base_rate` WRITE;
/*!40000 ALTER TABLE `base_rate` DISABLE KEYS */;
INSERT INTO `base_rate` VALUES ('2020-10-25','SYB1',2.3000,1),('2020-10-26','SYB1',1.2000,1),('2020-10-27','SYB1',1.4000,1),('2020-10-28','SYB1',1.5000,1),('2020-10-29','SYB1',2.0000,1),('2020-10-30','SYB1',1.5000,1),('2020-10-31','SYB1',1.5000,1),('2020-11-01','SYB1',1.3000,1),('2020-11-02','SYB1',1.2000,1),('2020-11-03','SYB1',1.1000,1);
/*!40000 ALTER TABLE `base_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benchmark`
--

DROP TABLE IF EXISTS `benchmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benchmark` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `symbol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `holiday_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `decimals` tinyint NOT NULL,
  `rec_day_count` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `symbol` (`symbol`),
  KEY `country` (`holiday_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benchmark`
--

LOCK TABLES `benchmark` WRITE;
/*!40000 ALTER TABLE `benchmark` DISABLE KEYS */;
INSERT INTO `benchmark` VALUES (1,'SYB1','symbol1','holiday1',1,'Act/360'),(2,'SYB2','symbol2','holiday2',2,'Act/360');
/*!40000 ALTER TABLE `benchmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `user_company_id_idx` (`user_id`),
  CONSTRAINT `user_company_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'company1',1);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal`
--

DROP TABLE IF EXISTS `deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `closing_date` date DEFAULT NULL,
  `company_id` int unsigned NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `company_id_idx` (`company_id`),
  CONSTRAINT `company_deal_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal`
--

LOCK TABLES `deal` WRITE;
/*!40000 ALTER TABLE `deal` DISABLE KEYS */;
INSERT INTO `deal` VALUES (1,'deal1','2020-11-02',1);
/*!40000 ALTER TABLE `deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holdings`
--

DROP TABLE IF EXISTS `holdings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holdings` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `total_amt` decimal(14,2) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holdings`
--

LOCK TABLES `holdings` WRITE;
/*!40000 ALTER TABLE `holdings` DISABLE KEYS */;
INSERT INTO `holdings` VALUES (1,15000.00);
/*!40000 ALTER TABLE `holdings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `country` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` date NOT NULL,
  `holiday_name` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`country`,`date`),
  KEY `benchmark_country_idx` (`country`),
  CONSTRAINT `benchmark_holidays_country` FOREIGN KEY (`country`) REFERENCES `benchmark` (`holiday_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrument` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `day_count` smallint unsigned NOT NULL,
  `day_count_basis` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `int_method` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lookback` tinyint NOT NULL DEFAULT '5',
  `obs_shift` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'WITHOUT',
  `rounding` tinyint unsigned NOT NULL DEFAULT '4',
  `cas` decimal(8,4) DEFAULT NULL,
  `margin` decimal(8,4) DEFAULT NULL,
  `floor` decimal(8,4) DEFAULT NULL,
  `cap` decimal(8,4) DEFAULT NULL,
  `payment_freq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deal_id` int unsigned NOT NULL,
  `benchmark_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `holiday_cal` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rate_pricing` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fixed_baserate` decimal(8,4) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `deal_id_idx` (`deal_id`),
  KEY `benchmark_instrument_sym_idx` (`benchmark_name`),
  CONSTRAINT `benchmark_instrument_sym` FOREIGN KEY (`benchmark_name`) REFERENCES `benchmark` (`symbol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deal_instrument_id` FOREIGN KEY (`deal_id`) REFERENCES `deal` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrument`
--

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
INSERT INTO `instrument` VALUES (1,'instrument1','ins_type1',360,'Act/360','compound',5,'WITHOUT',4,1.2000,0.5000,0.1000,4.0000,NULL,1,'SYB1','holiday1',NULL,NULL);
/*!40000 ALTER TABLE `instrument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `int_period`
--

DROP TABLE IF EXISTS `int_period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `int_period` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `tranche_id` int unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `cas` decimal(8,4) DEFAULT NULL,
  `margin` decimal(8,4) DEFAULT NULL,
  `floor` decimal(8,4) DEFAULT NULL,
  `cap` decimal(8,4) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `tranche_id_idx` (`tranche_id`),
  CONSTRAINT `tranche_id` FOREIGN KEY (`tranche_id`) REFERENCES `tranche` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `int_period`
--

LOCK TABLES `int_period` WRITE;
/*!40000 ALTER TABLE `int_period` DISABLE KEYS */;
INSERT INTO `int_period` VALUES (1,1,'2020-10-26','2020-11-01',1.2000,0.5000,0.1000,4.0000);
/*!40000 ALTER TABLE `int_period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `index` int unsigned NOT NULL,
  `int_period_id` int unsigned NOT NULL,
  `principal_bal` decimal(14,2) DEFAULT NULL,
  `benchmark_date` date NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `cal_days` tinyint unsigned NOT NULL COMMENT '# of calender days in interest period',
  `cum_int_days` tinyint unsigned NOT NULL COMMENT 'cumulative int period days',
  `cal_days_obs` tinyint unsigned DEFAULT NULL COMMENT '# of days in obs period',
  `cum_obs_days` tinyint unsigned DEFAULT NULL COMMENT 'cumulative obs period days',
  `obs_start_date` date DEFAULT NULL,
  `obs_end_date` date DEFAULT NULL,
  `base_rate` decimal(12,10) NOT NULL,
  `floor_rate` decimal(12,10) DEFAULT NULL COMMENT 'floor adjusted base rate',
  `cas` decimal(12,10) DEFAULT NULL,
  `floor` decimal(12,10) DEFAULT NULL,
  `cap` decimal(12,10) DEFAULT NULL,
  `margin` decimal(12,10) DEFAULT NULL,
  `eff_rfr` decimal(26,24) DEFAULT NULL,
  `comp_factor` decimal(24,16) DEFAULT NULL,
  `comp_rfr` decimal(12,10) DEFAULT NULL COMMENT 'Annualized cumulative compounded RFR',
  `uncomp_rfr` decimal(26,24) DEFAULT NULL COMMENT 'Unannualized cumulative compounded RFR',
  `noncum_rfr` decimal(26,24) DEFAULT NULL COMMENT 'non cumulative compounded RFR',
  `daily_rate` decimal(14,2) NOT NULL,
  `int_bassrate` decimal(14,2) NOT NULL COMMENT 'earned interest from base rate',
  `int_cas` decimal(14,2) NOT NULL COMMENT 'earned interest from CAS',
  `int_margin` decimal(14,2) NOT NULL COMMENT 'earned interest from margin',
  `int_total` decimal(14,2) NOT NULL COMMENT 'total earned interest',
  `cum_int_total` decimal(14,2) DEFAULT NULL COMMENT 'total cumulative interest',
  PRIMARY KEY (`_id`),
  KEY `int_period_id_idx` (`int_period_id`),
  CONSTRAINT `int_period_id` FOREIGN KEY (`int_period_id`) REFERENCES `int_period` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (73,1,1,15000.00,'2020-10-21','2020-10-26','2020-10-27',1,5,1,2,'2020-10-21','2020-10-22',1.3000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.003611111111111111111111,1.0036111111111111,0.2600000000,NULL,0.260000000000000000000000,1.96,10.83,50.00,20.83,81.67,317.55),(74,2,1,15000.00,'2020-10-22','2020-10-27','2020-10-28',1,5,1,2,'2020-10-22','2020-10-23',1.4000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.003888888888888888888889,1.0077929012345679,0.5611000000,NULL,0.561100000000000000000000,2.26,23.38,50.00,20.83,94.21,317.55),(75,3,1,15000.00,'2020-10-23','2020-10-28','2020-10-29',1,5,0,2,'2020-10-23','2020-10-23',1.5000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.000000000000000000000000,1.0000000000000000,0.0000000000,NULL,0.000000000000000000000000,1.70,0.00,50.00,20.83,70.83,317.55),(76,4,1,15000.00,'2020-10-23','2020-10-29','2020-10-30',1,5,0,2,'2020-10-23','2020-10-23',2.0000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.000000000000000000000000,1.0000000000000000,0.0000000000,NULL,0.000000000000000000000000,1.70,0.00,50.00,20.83,70.83,317.55),(77,1,1,15000.00,'2020-10-21','2020-10-26','2020-10-27',1,5,1,2,'2020-10-21','2020-10-22',1.2000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.003333333333333333333333,1.0033333333333333,0.2400000000,NULL,0.240000000000000000000000,1.94,10.00,50.00,20.83,80.83,316.71),(78,2,1,15000.00,'2020-10-22','2020-10-27','2020-10-28',1,5,1,2,'2020-10-22','2020-10-23',1.4000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.003888888888888888888889,1.0077929012345679,0.5611000000,NULL,0.561100000000000000000000,2.26,23.38,50.00,20.83,94.21,316.71),(79,3,1,15000.00,'2020-10-23','2020-10-28','2020-10-29',1,5,0,2,'2020-10-23','2020-10-23',1.5000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.000000000000000000000000,1.0000000000000000,0.0000000000,NULL,0.000000000000000000000000,1.70,0.00,50.00,20.83,70.83,316.71),(80,4,1,15000.00,'2020-10-23','2020-10-29','2020-10-30',1,5,0,2,'2020-10-23','2020-10-23',2.0000000000,NULL,1.2000000000,0.1000000000,4.0000000000,0.5000000000,0.000000000000000000000000,1.0000000000000000,0.0000000000,NULL,0.000000000000000000000000,1.70,0.00,50.00,20.83,70.83,316.71);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tranche`
--

DROP TABLE IF EXISTS `tranche`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tranche` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `component` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `payment_opt` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `amount` decimal(12,2) unsigned NOT NULL,
  `payment_freq` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isfixed_float` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `instrument_id` int unsigned NOT NULL,
  `holding_id` int unsigned NOT NULL,
  `uni_tranche` tinyint unsigned DEFAULT NULL,
  `do_recalc` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `instrument_id` (`instrument_id`),
  KEY `holding_id_idx` (`holding_id`),
  CONSTRAINT `holding_id` FOREIGN KEY (`holding_id`) REFERENCES `holdings` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `instrument_id` FOREIGN KEY (`instrument_id`) REFERENCES `instrument` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tranche`
--

LOCK TABLES `tranche` WRITE;
/*!40000 ALTER TABLE `tranche` DISABLE KEYS */;
INSERT INTO `tranche` VALUES (1,'comp1','opt1',15000.00,'1','yes',1,1,1,1);
/*!40000 ALTER TABLE `tranche` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `_id` int unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'user''s first name',
  `lname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'user''s last name',
  `email` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'user''s username',
  `password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `roles` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `uname_UNIQUE` (`uname`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='for storing user credentials and other user info e.g username, email, password, etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'fname','lname','anirudh.ina.aa@gmail.com','anirudh','$2b$12$iZTFolO7X019DKe1A/Bay.YklNPwXi3idIaHGsvGHsuj.BgsmH2Ty','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-03  9:12:56

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
  `symbol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rate` decimal(6,4) NOT NULL,
  `is_final` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`date`,`symbol`),
  KEY `benchmark_id_idx` (`symbol`),
  CONSTRAINT `benchmark_baserate_sym` FOREIGN KEY (`symbol`) REFERENCES `benchmark` (`symbol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_rate`
--

LOCK TABLES `base_rate` WRITE;
/*!40000 ALTER TABLE `base_rate` DISABLE KEYS */;
INSERT INTO `base_rate` VALUES ('2018-01-02','SONIA',0.4622,1),('2018-01-03','SONIA',0.4642,1),('2018-01-04','SONIA',0.4618,1),('2018-01-05','SONIA',0.4625,1),('2018-01-08','SONIA',0.4632,1),('2018-01-09','SONIA',0.4627,1),('2018-01-10','SONIA',0.4647,1),('2018-01-11','SONIA',0.4655,1),('2018-01-12','SONIA',0.4680,1),('2018-01-15','SONIA',0.4638,1),('2018-01-16','SONIA',0.4605,1),('2018-01-17','SONIA',0.4615,1),('2018-01-18','SONIA',0.4619,1),('2018-01-19','SONIA',0.4634,1),('2018-01-22','SONIA',0.4630,1),('2018-01-23','SONIA',0.4619,1),('2018-01-24','SONIA',0.4620,1),('2018-01-25','SONIA',0.4618,1),('2018-01-26','SONIA',0.4633,1),('2018-01-29','SONIA',0.4613,1),('2018-01-30','SONIA',0.4627,1),('2018-01-31','SONIA',0.4668,1),('2018-02-01','SONIA',0.4636,1),('2018-02-02','SONIA',0.4632,1),('2018-02-05','SONIA',0.4619,1),('2018-02-06','SONIA',0.4626,1),('2018-02-07','SONIA',0.4618,1),('2018-02-08','SONIA',0.4624,1),('2018-02-09','SONIA',0.4634,1),('2018-02-12','SONIA',0.4630,1),('2018-02-13','SONIA',0.4636,1),('2018-02-14','SONIA',0.4651,1),('2018-02-15','SONIA',0.4642,1),('2018-02-16','SONIA',0.4637,1),('2018-02-19','SONIA',0.4620,1),('2018-02-20','SONIA',0.4636,1),('2018-02-21','SONIA',0.4629,1),('2018-02-22','SONIA',0.4637,1),('2018-02-23','SONIA',0.4668,1),('2018-02-26','SONIA',0.4639,1),('2018-02-27','SONIA',0.4656,1),('2018-02-28','SONIA',0.4612,1),('2018-03-01','SONIA',0.4646,1),('2018-03-02','SONIA',0.4655,1),('2018-03-05','SONIA',0.4643,1),('2018-03-06','SONIA',0.4647,1),('2018-03-07','SONIA',0.4648,1),('2018-03-08','SONIA',0.4645,1),('2018-03-09','SONIA',0.4627,1),('2018-03-12','SONIA',0.4650,1),('2018-03-13','SONIA',0.4637,1),('2018-03-14','SONIA',0.4637,1),('2018-03-15','SONIA',0.4659,1),('2018-03-16','SONIA',0.4644,1),('2018-03-19','SONIA',0.4633,1),('2018-03-20','SONIA',0.4636,1),('2018-03-21','SONIA',0.4667,1),('2018-03-22','SONIA',0.4634,1),('2018-03-23','SONIA',0.4680,1),('2018-03-26','SONIA',0.4666,1),('2018-03-27','SONIA',0.4652,1),('2018-03-28','SONIA',0.4638,1),('2018-03-29','SONIA',0.4435,1),('2018-04-03','SONIA',0.4652,1),('2018-04-04','SONIA',0.4624,1),('2018-04-05','SONIA',0.4653,1),('2018-04-06','SONIA',0.4666,1),('2018-04-09','SONIA',0.4651,1),('2018-04-10','SONIA',0.4666,1),('2018-04-11','SONIA',0.4633,1),('2018-04-12','SONIA',0.4637,1),('2018-04-13','SONIA',0.4657,1),('2018-04-16','SONIA',0.4659,1),('2018-04-17','SONIA',0.4664,1),('2018-04-18','SONIA',0.4670,1),('2018-04-19','SONIA',0.4651,1),('2018-04-20','SONIA',0.4646,1),('2018-04-23','SONIA',0.4529,1),('2018-04-24','SONIA',0.4537,1),('2018-04-25','SONIA',0.4540,1),('2018-04-26','SONIA',0.4549,1),('2018-04-27','SONIA',0.4548,1),('2018-04-30','SONIA',0.4507,1),('2018-05-01','SONIA',0.4497,1),('2018-05-02','SONIA',0.4515,1),('2018-05-03','SONIA',0.4527,1),('2018-05-04','SONIA',0.4556,1),('2018-05-08','SONIA',0.4542,1),('2018-05-09','SONIA',0.4553,1),('2018-05-10','SONIA',0.4539,1),('2018-05-11','SONIA',0.4542,1),('2018-05-14','SONIA',0.4513,1),('2018-05-15','SONIA',0.4511,1),('2018-05-16','SONIA',0.4528,1),('2018-05-17','SONIA',0.4533,1),('2018-05-18','SONIA',0.4540,1),('2018-05-21','SONIA',0.4527,1),('2018-05-22','SONIA',0.4521,1),('2018-05-23','SONIA',0.4533,1),('2018-05-24','SONIA',0.4532,1),('2018-05-25','SONIA',0.4533,1),('2018-05-29','SONIA',0.4537,1),('2018-05-30','SONIA',0.4519,1),('2018-05-31','SONIA',0.4503,1),('2018-06-01','SONIA',0.4544,1),('2018-06-04','SONIA',0.4522,1),('2018-06-05','SONIA',0.4525,1),('2018-06-06','SONIA',0.4519,1),('2018-06-07','SONIA',0.4531,1),('2018-06-08','SONIA',0.4535,1),('2018-06-11','SONIA',0.4514,1),('2018-06-12','SONIA',0.4501,1),('2018-06-13','SONIA',0.4489,1),('2018-06-14','SONIA',0.4512,1),('2018-06-15','SONIA',0.4505,1),('2018-06-18','SONIA',0.4515,1),('2018-06-19','SONIA',0.4507,1),('2018-06-20','SONIA',0.4495,1),('2018-06-21','SONIA',0.4513,1),('2018-06-22','SONIA',0.4491,1),('2018-06-25','SONIA',0.4512,1),('2018-06-26','SONIA',0.4498,1),('2018-06-27','SONIA',0.4495,1),('2018-06-28','SONIA',0.4515,1),('2018-06-29','SONIA',0.4399,1),('2018-07-02','SONIA',0.4531,1),('2018-07-03','SONIA',0.4543,1),('2018-07-04','SONIA',0.4546,1),('2018-07-05','SONIA',0.4563,1),('2018-07-06','SONIA',0.4580,1),('2018-07-09','SONIA',0.4567,1),('2018-07-10','SONIA',0.4549,1),('2018-07-11','SONIA',0.4544,1),('2018-07-12','SONIA',0.4563,1),('2018-07-13','SONIA',0.4565,1),('2018-07-16','SONIA',0.4552,1),('2018-07-17','SONIA',0.4541,1),('2018-07-18','SONIA',0.4543,1),('2018-07-19','SONIA',0.4538,1),('2018-07-20','SONIA',0.4557,1),('2018-07-23','SONIA',0.4537,1),('2018-07-24','SONIA',0.4548,1),('2018-07-25','SONIA',0.4540,1),('2018-07-26','SONIA',0.4532,1),('2018-07-27','SONIA',0.4532,1),('2018-07-30','SONIA',0.4523,1),('2018-07-31','SONIA',0.4503,1),('2018-08-01','SONIA',0.4522,1),('2018-08-02','SONIA',0.6897,1),('2018-08-03','SONIA',0.7028,1),('2018-08-06','SONIA',0.7006,1),('2018-08-07','SONIA',0.7011,1),('2018-08-08','SONIA',0.7028,1),('2018-08-09','SONIA',0.7019,1),('2018-08-10','SONIA',0.7035,1),('2018-08-13','SONIA',0.7037,1),('2018-08-14','SONIA',0.7021,1),('2018-08-15','SONIA',0.7018,1),('2018-08-16','SONIA',0.7024,1),('2018-08-17','SONIA',0.7030,1),('2018-08-20','SONIA',0.7039,1),('2018-08-21','SONIA',0.7037,1),('2018-08-22','SONIA',0.7028,1),('2018-08-23','SONIA',0.7035,1),('2018-08-24','SONIA',0.7036,1),('2018-08-28','SONIA',0.7032,1),('2018-08-29','SONIA',0.7048,1),('2018-08-30','SONIA',0.7058,1),('2018-08-31','SONIA',0.7042,1),('2018-09-03','SONIA',0.7020,1),('2018-09-04','SONIA',0.7046,1),('2018-09-05','SONIA',0.7022,1),('2018-09-06','SONIA',0.7032,1),('2018-09-07','SONIA',0.7028,1),('2018-09-10','SONIA',0.7016,1),('2018-09-11','SONIA',0.7003,1),('2018-09-12','SONIA',0.7025,1),('2018-09-13','SONIA',0.7024,1),('2018-09-14','SONIA',0.7016,1),('2018-09-17','SONIA',0.7013,1),('2018-09-18','SONIA',0.7015,1),('2018-09-19','SONIA',0.7005,1),('2018-09-20','SONIA',0.6999,1),('2018-09-21','SONIA',0.7003,1),('2018-09-24','SONIA',0.7010,1),('2018-09-25','SONIA',0.6995,1),('2018-09-26','SONIA',0.6990,1),('2018-09-27','SONIA',0.7015,1),('2018-09-28','SONIA',0.6964,1),('2018-10-01','SONIA',0.7021,1),('2018-10-02','SONIA',0.7026,1),('2018-10-03','SONIA',0.7015,1),('2018-10-04','SONIA',0.7023,1),('2018-10-05','SONIA',0.7010,1),('2018-10-08','SONIA',0.7021,1),('2018-10-09','SONIA',0.7019,1),('2018-10-10','SONIA',0.6997,1),('2018-10-11','SONIA',0.6999,1),('2018-10-12','SONIA',0.7012,1),('2018-10-15','SONIA',0.7010,1),('2018-10-16','SONIA',0.7012,1),('2018-10-17','SONIA',0.7016,1),('2018-10-18','SONIA',0.7017,1),('2018-10-19','SONIA',0.6999,1),('2018-10-22','SONIA',0.6990,1),('2018-10-23','SONIA',0.7004,1),('2018-10-24','SONIA',0.7023,1),('2018-10-25','SONIA',0.6988,1),('2018-10-26','SONIA',0.7021,1),('2018-10-29','SONIA',0.7011,1),('2018-10-30','SONIA',0.7013,1),('2018-10-31','SONIA',0.7002,1),('2018-11-01','SONIA',0.7006,1),('2018-11-02','SONIA',0.7005,1),('2018-11-05','SONIA',0.7009,1),('2018-11-06','SONIA',0.7017,1),('2018-11-07','SONIA',0.7031,1),('2018-11-08','SONIA',0.7023,1),('2018-11-09','SONIA',0.7028,1),('2018-11-12','SONIA',0.7023,1),('2018-11-13','SONIA',0.7025,1),('2018-11-14','SONIA',0.7013,1),('2018-11-15','SONIA',0.7019,1),('2018-11-16','SONIA',0.7007,1),('2018-11-19','SONIA',0.7006,1),('2018-11-20','SONIA',0.7013,1),('2018-11-21','SONIA',0.7028,1),('2018-11-22','SONIA',0.7031,1),('2018-11-23','SONIA',0.7032,1),('2018-11-26','SONIA',0.7010,1),('2018-11-27','SONIA',0.7018,1),('2018-11-28','SONIA',0.7010,1),('2018-11-29','SONIA',0.7017,1),('2018-11-30','SONIA',0.7002,1),('2018-12-03','SONIA',0.7019,1),('2018-12-04','SONIA',0.7014,1),('2018-12-05','SONIA',0.7010,1),('2018-12-06','SONIA',0.7021,1),('2018-12-07','SONIA',0.7020,1),('2018-12-10','SONIA',0.7028,1),('2018-12-11','SONIA',0.7027,1),('2018-12-12','SONIA',0.7017,1),('2018-12-13','SONIA',0.7010,1),('2018-12-14','SONIA',0.7028,1),('2018-12-17','SONIA',0.7003,1),('2018-12-18','SONIA',0.7019,1),('2018-12-19','SONIA',0.7039,1),('2018-12-20','SONIA',0.7032,1),('2018-12-21','SONIA',0.7054,1),('2018-12-24','SONIA',0.7051,1),('2018-12-27','SONIA',0.7060,1),('2018-12-28','SONIA',0.7047,1),('2018-12-31','SONIA',0.6998,1),('2019-01-02','SONIA',0.7044,1),('2019-01-03','SONIA',0.7048,1),('2019-01-04','SONIA',0.7046,1),('2019-01-07','SONIA',0.7052,1),('2019-01-08','SONIA',0.7052,1),('2019-01-09','SONIA',0.7063,1),('2019-01-10','SONIA',0.7067,1),('2019-01-11','SONIA',0.7072,1),('2019-01-14','SONIA',0.7067,1),('2019-01-15','SONIA',0.7057,1),('2019-01-16','SONIA',0.7059,1),('2019-01-17','SONIA',0.7055,1),('2019-01-18','SONIA',0.7059,1),('2019-01-21','SONIA',0.7055,1),('2019-01-22','SONIA',0.7047,1),('2019-01-23','SONIA',0.7053,1),('2019-01-24','SONIA',0.7057,1),('2019-01-25','SONIA',0.7045,1),('2019-01-28','SONIA',0.7054,1),('2019-01-29','SONIA',0.7036,1),('2019-01-30','SONIA',0.7034,1),('2019-01-31','SONIA',0.7034,1),('2019-02-01','SONIA',0.7025,1),('2019-02-04','SONIA',0.7051,1),('2019-02-05','SONIA',0.7048,1),('2019-02-06','SONIA',0.7066,1),('2019-02-07','SONIA',0.7065,1),('2019-02-08','SONIA',0.7056,1),('2019-02-11','SONIA',0.7059,1),('2019-02-12','SONIA',0.7050,1),('2019-02-13','SONIA',0.7069,1),('2019-02-14','SONIA',0.7063,1),('2019-02-15','SONIA',0.7061,1),('2019-02-18','SONIA',0.7055,1),('2019-02-19','SONIA',0.7060,1),('2019-02-20','SONIA',0.7077,1),('2019-02-21','SONIA',0.7072,1),('2019-02-22','SONIA',0.7083,1),('2019-02-25','SONIA',0.7080,1),('2019-02-26','SONIA',0.7074,1),('2019-02-27','SONIA',0.7065,1),('2019-02-28','SONIA',0.7050,1),('2019-03-01','SONIA',0.7057,1),('2019-03-04','SONIA',0.7069,1),('2019-03-05','SONIA',0.7065,1),('2019-03-06','SONIA',0.7066,1),('2019-03-07','SONIA',0.7055,1),('2019-03-08','SONIA',0.7049,1),('2019-03-11','SONIA',0.7046,1),('2019-03-12','SONIA',0.7061,1),('2019-03-13','SONIA',0.7055,1),('2019-03-14','SONIA',0.7039,1),('2019-03-15','SONIA',0.7046,1),('2019-03-18','SONIA',0.7056,1),('2019-03-19','SONIA',0.7050,1),('2019-03-20','SONIA',0.7054,1),('2019-03-21','SONIA',0.7050,1),('2019-03-22','SONIA',0.7053,1),('2019-03-25','SONIA',0.7046,1),('2019-03-26','SONIA',0.7059,1),('2019-03-27','SONIA',0.7047,1),('2019-03-28','SONIA',0.7051,1),('2019-03-29','SONIA',0.7036,1),('2019-04-01','SONIA',0.7055,1),('2019-04-02','SONIA',0.7055,1),('2019-04-03','SONIA',0.7064,1),('2019-04-04','SONIA',0.7068,1),('2019-04-05','SONIA',0.7076,1),('2019-04-08','SONIA',0.7079,1),('2019-04-09','SONIA',0.7072,1),('2019-04-10','SONIA',0.7081,1),('2019-04-11','SONIA',0.7075,1),('2019-04-12','SONIA',0.7074,1),('2019-04-15','SONIA',0.7082,1),('2019-04-16','SONIA',0.7081,1),('2019-04-17','SONIA',0.7084,1),('2019-04-18','SONIA',0.7087,1),('2019-04-23','SONIA',0.7092,1),('2019-04-24','SONIA',0.7087,1),('2019-04-25','SONIA',0.7096,1),('2019-04-26','SONIA',0.7107,1),('2019-04-29','SONIA',0.7097,1),('2019-04-30','SONIA',0.7109,1),('2019-05-01','SONIA',0.7103,1),('2019-05-02','SONIA',0.7107,1),('2019-05-03','SONIA',0.7098,1),('2019-05-07','SONIA',0.7094,1),('2019-05-08','SONIA',0.7092,1),('2019-05-09','SONIA',0.7103,1),('2019-05-10','SONIA',0.7098,1),('2019-05-13','SONIA',0.7096,1),('2019-05-14','SONIA',0.7095,1),('2019-05-15','SONIA',0.7096,1),('2019-05-16','SONIA',0.7100,1),('2019-05-17','SONIA',0.7094,1),('2019-05-20','SONIA',0.7096,1),('2019-05-21','SONIA',0.7093,1),('2019-05-22','SONIA',0.7106,1),('2019-05-23','SONIA',0.7100,1),('2019-05-24','SONIA',0.7086,1),('2019-05-28','SONIA',0.7082,1),('2019-05-29','SONIA',0.7073,1),('2019-05-30','SONIA',0.7085,1),('2019-05-31','SONIA',0.7078,1),('2019-06-03','SONIA',0.7084,1),('2019-06-04','SONIA',0.7084,1),('2019-06-05','SONIA',0.7094,1),('2019-06-06','SONIA',0.7092,1),('2019-06-07','SONIA',0.7090,1),('2019-06-10','SONIA',0.7082,1),('2019-06-11','SONIA',0.7082,1),('2019-06-12','SONIA',0.7086,1),('2019-06-13','SONIA',0.7083,1),('2019-06-14','SONIA',0.7078,1),('2019-06-17','SONIA',0.7080,1),('2019-06-18','SONIA',0.7082,1),('2019-06-19','SONIA',0.7089,1),('2019-06-20','SONIA',0.7092,1),('2019-06-21','SONIA',0.7094,1),('2019-06-24','SONIA',0.7085,1),('2019-06-25','SONIA',0.7100,1),('2019-06-26','SONIA',0.7084,1),('2019-06-27','SONIA',0.7086,1),('2019-06-28','SONIA',0.7060,1),('2019-07-01','SONIA',0.7093,1),('2019-07-02','SONIA',0.7082,1),('2019-07-03','SONIA',0.7089,1),('2019-07-04','SONIA',0.7093,1),('2019-07-05','SONIA',0.7077,1),('2019-07-08','SONIA',0.7088,1),('2019-07-09','SONIA',0.7089,1),('2019-07-10','SONIA',0.7090,1),('2019-07-11','SONIA',0.7090,1),('2019-07-12','SONIA',0.7100,1),('2019-07-15','SONIA',0.7095,1),('2019-07-16','SONIA',0.7087,1),('2019-07-17','SONIA',0.7093,1),('2019-07-18','SONIA',0.7096,1),('2019-07-19','SONIA',0.7094,1),('2019-07-22','SONIA',0.7076,1),('2019-07-23','SONIA',0.7095,1),('2019-07-24','SONIA',0.7095,1),('2019-07-25','SONIA',0.7091,1),('2019-07-26','SONIA',0.7097,1),('2019-07-29','SONIA',0.7087,1),('2019-07-30','SONIA',0.7092,1),('2019-07-31','SONIA',0.7081,1),('2019-08-01','SONIA',0.7087,1),('2019-08-02','SONIA',0.7083,1),('2019-08-05','SONIA',0.7092,1),('2019-08-06','SONIA',0.7096,1),('2019-08-07','SONIA',0.7098,1),('2019-08-08','SONIA',0.7092,1),('2019-08-09','SONIA',0.7099,1),('2019-08-12','SONIA',0.7090,1),('2019-08-13','SONIA',0.7094,1),('2019-08-14','SONIA',0.7100,1),('2019-08-15','SONIA',0.7098,1),('2019-08-16','SONIA',0.7112,1),('2019-08-19','SONIA',0.7100,1),('2019-08-20','SONIA',0.7102,1),('2019-08-21','SONIA',0.7127,1),('2019-08-22','SONIA',0.7110,1),('2019-08-23','SONIA',0.7116,1),('2019-08-27','SONIA',0.7107,1),('2019-08-28','SONIA',0.7113,1),('2019-08-29','SONIA',0.7101,1),('2019-08-30','SONIA',0.7103,1),('2019-09-02','SONIA',0.7091,1),('2019-09-03','SONIA',0.7099,1),('2019-09-04','SONIA',0.7095,1),('2019-09-05','SONIA',0.7099,1),('2019-09-06','SONIA',0.7098,1),('2019-09-09','SONIA',0.7096,1),('2019-09-10','SONIA',0.7087,1),('2019-09-11','SONIA',0.7091,1),('2019-09-12','SONIA',0.7096,1),('2019-09-13','SONIA',0.7080,1),('2019-09-16','SONIA',0.7099,1),('2019-09-17','SONIA',0.7110,1),('2019-09-18','SONIA',0.7104,1),('2019-09-19','SONIA',0.7104,1),('2019-09-20','SONIA',0.7093,1),('2019-09-23','SONIA',0.7099,1),('2019-09-24','SONIA',0.7105,1),('2019-09-25','SONIA',0.7099,1),('2019-09-26','SONIA',0.7109,1),('2019-09-27','SONIA',0.7109,1),('2019-09-30','SONIA',0.7101,1),('2019-10-01','SONIA',0.7108,1),('2019-10-02','SONIA',0.7098,1),('2019-10-03','SONIA',0.7098,1),('2019-10-04','SONIA',0.7118,1),('2019-10-07','SONIA',0.7111,1),('2019-10-08','SONIA',0.7107,1),('2019-10-09','SONIA',0.7112,1),('2019-10-10','SONIA',0.7115,1),('2019-10-11','SONIA',0.7108,1),('2019-10-14','SONIA',0.7106,1),('2019-10-15','SONIA',0.7111,1),('2019-10-16','SONIA',0.7109,1),('2019-10-17','SONIA',0.7107,1),('2019-10-18','SONIA',0.7101,1),('2019-10-21','SONIA',0.7111,1),('2019-10-22','SONIA',0.7116,1),('2019-10-23','SONIA',0.7124,1),('2019-10-24','SONIA',0.7108,1),('2019-10-25','SONIA',0.7097,1),('2019-10-28','SONIA',0.7106,1),('2019-10-29','SONIA',0.7107,1),('2019-10-30','SONIA',0.7107,1),('2019-10-31','SONIA',0.7106,1),('2019-11-01','SONIA',0.7119,1),('2019-11-04','SONIA',0.7117,1),('2019-11-05','SONIA',0.7105,1),('2019-11-06','SONIA',0.7115,1),('2019-11-07','SONIA',0.7108,1),('2019-11-08','SONIA',0.7100,1),('2019-11-11','SONIA',0.7112,1),('2019-11-12','SONIA',0.7103,1),('2019-11-13','SONIA',0.7109,1),('2019-11-14','SONIA',0.7091,1),('2019-11-15','SONIA',0.7085,1),('2019-11-18','SONIA',0.7099,1),('2019-11-19','SONIA',0.7106,1),('2019-11-20','SONIA',0.7108,1),('2019-11-21','SONIA',0.7107,1),('2019-11-22','SONIA',0.7104,1),('2019-11-25','SONIA',0.7097,1),('2019-11-26','SONIA',0.7097,1),('2019-11-27','SONIA',0.7105,1),('2019-11-28','SONIA',0.7100,1),('2019-11-29','SONIA',0.7123,1),('2019-12-02','SONIA',0.7091,1),('2019-12-03','SONIA',0.7092,1),('2019-12-04','SONIA',0.7091,1),('2019-12-05','SONIA',0.7097,1),('2019-12-06','SONIA',0.7086,1),('2019-12-09','SONIA',0.7095,1),('2019-12-10','SONIA',0.7103,1),('2019-12-11','SONIA',0.7098,1),('2019-12-12','SONIA',0.7104,1),('2019-12-13','SONIA',0.7113,1),('2019-12-16','SONIA',0.7111,1),('2019-12-17','SONIA',0.7104,1),('2019-12-18','SONIA',0.7106,1),('2019-12-19','SONIA',0.7113,1),('2019-12-20','SONIA',0.7108,1),('2019-12-23','SONIA',0.7102,1),('2019-12-24','SONIA',0.7094,1),('2019-12-27','SONIA',0.7100,1),('2019-12-30','SONIA',0.7107,1),('2019-12-31','SONIA',0.7098,1),('2020-01-02','SONIA',0.7125,1),('2020-01-03','SONIA',0.7110,1),('2020-01-06','SONIA',0.7124,1),('2020-01-07','SONIA',0.7120,1),('2020-01-08','SONIA',0.7124,1),('2020-01-09','SONIA',0.7123,1),('2020-01-10','SONIA',0.7117,1),('2020-01-13','SONIA',0.7107,1),('2020-01-14','SONIA',0.7111,1),('2020-01-15','SONIA',0.7125,1),('2020-01-16','SONIA',0.7117,1),('2020-01-17','SONIA',0.7120,1),('2020-01-20','SONIA',0.7117,1),('2020-01-21','SONIA',0.7117,1),('2020-01-22','SONIA',0.7117,1),('2020-01-23','SONIA',0.7104,1),('2020-01-24','SONIA',0.7106,1),('2020-01-27','SONIA',0.7089,1),('2020-01-28','SONIA',0.7096,1),('2020-01-29','SONIA',0.7103,1),('2020-01-30','SONIA',0.7099,1),('2020-01-31','SONIA',0.7117,1),('2020-02-03','SONIA',0.7104,1),('2020-02-04','SONIA',0.7104,1),('2020-02-05','SONIA',0.7107,1),('2020-02-06','SONIA',0.7107,1),('2020-02-07','SONIA',0.7112,1),('2020-02-10','SONIA',0.7095,1),('2020-02-11','SONIA',0.7097,1),('2020-02-12','SONIA',0.7098,1),('2020-02-13','SONIA',0.7106,1),('2020-02-14','SONIA',0.7103,1),('2020-02-17','SONIA',0.7092,1),('2020-02-18','SONIA',0.7095,1),('2020-02-19','SONIA',0.7102,1),('2020-02-20','SONIA',0.7110,1),('2020-02-21','SONIA',0.7112,1),('2020-02-24','SONIA',0.7105,1),('2020-02-25','SONIA',0.7109,1),('2020-02-26','SONIA',0.7114,1),('2020-02-27','SONIA',0.7106,1),('2020-02-28','SONIA',0.7098,1),('2020-03-02','SONIA',0.7089,1),('2020-03-03','SONIA',0.7098,1),('2020-03-04','SONIA',0.7100,1),('2020-03-05','SONIA',0.7089,1),('2020-03-06','SONIA',0.7087,1),('2020-03-09','SONIA',0.7091,1),('2020-03-10','SONIA',0.7091,1),('2020-03-11','SONIA',0.2092,1),('2020-03-12','SONIA',0.2093,1),('2020-03-13','SONIA',0.2093,1),('2020-03-16','SONIA',0.2096,1),('2020-03-17','SONIA',0.2135,1),('2020-03-18','SONIA',0.2148,1),('2020-03-19','SONIA',0.2134,1),('2020-03-20','SONIA',0.0706,1),('2020-03-23','SONIA',0.0723,1),('2020-03-24','SONIA',0.0736,1),('2020-03-25','SONIA',0.0750,1),('2020-03-26','SONIA',0.0729,1),('2020-03-27','SONIA',0.0710,1),('2020-03-30','SONIA',0.0714,1),('2020-03-31','SONIA',0.0729,1),('2020-04-01','SONIA',0.0712,1),('2020-04-02','SONIA',0.0653,1),('2020-04-03','SONIA',0.0640,1),('2020-04-06','SONIA',0.0657,1),('2020-04-07','SONIA',0.0661,1),('2020-04-08','SONIA',0.0641,1),('2020-04-09','SONIA',0.0660,1),('2020-04-14','SONIA',0.0635,1),('2020-04-15','SONIA',0.0634,1),('2020-04-16','SONIA',0.0632,1),('2020-04-17','SONIA',0.0643,1),('2020-04-20','SONIA',0.0661,1),('2020-04-21','SONIA',0.0672,1),('2020-04-22','SONIA',0.0683,1),('2020-04-23','SONIA',0.0673,1),('2020-04-24','SONIA',0.0662,1),('2020-04-27','SONIA',0.0652,1),('2020-04-28','SONIA',0.0665,1),('2020-04-29','SONIA',0.0673,1),('2020-04-30','SONIA',0.0666,1),('2020-05-01','SONIA',0.0658,1),('2020-05-04','SONIA',0.0659,1),('2020-05-05','SONIA',0.0665,1),('2020-05-06','SONIA',0.0668,1),('2020-05-07','SONIA',0.0674,1),('2020-05-11','SONIA',0.0667,1),('2020-05-12','SONIA',0.0667,1),('2020-05-13','SONIA',0.0684,1),('2020-05-14','SONIA',0.0672,1),('2020-05-15','SONIA',0.0675,1),('2020-05-18','SONIA',0.0683,1),('2020-05-19','SONIA',0.0680,1),('2020-05-20','SONIA',0.0688,1),('2020-05-21','SONIA',0.0683,1),('2020-05-22','SONIA',0.0683,1),('2020-05-26','SONIA',0.0671,1),('2020-05-27','SONIA',0.0677,1),('2020-05-28','SONIA',0.0680,1),('2020-05-29','SONIA',0.0679,1),('2020-06-01','SONIA',0.0665,1),('2020-06-02','SONIA',0.0686,1),('2020-06-03','SONIA',0.0685,1),('2020-06-04','SONIA',0.0693,1),('2020-06-05','SONIA',0.0679,1),('2020-06-08','SONIA',0.0660,1),('2020-06-09','SONIA',0.0660,1),('2020-06-10','SONIA',0.0657,1),('2020-06-11','SONIA',0.0651,1),('2020-06-12','SONIA',0.0651,1),('2020-06-15','SONIA',0.0634,1),('2020-06-16','SONIA',0.0627,1),('2020-06-17','SONIA',0.0636,1),('2020-06-18','SONIA',0.0624,1),('2020-06-19','SONIA',0.0637,1),('2020-06-22','SONIA',0.0636,1),('2020-06-23','SONIA',0.0621,1),('2020-06-24','SONIA',0.0626,1),('2020-06-25','SONIA',0.0630,1),('2020-06-26','SONIA',0.0633,1),('2020-06-29','SONIA',0.0619,1),('2020-06-30','SONIA',0.0603,1),('2020-07-01','SONIA',0.0611,1),('2020-07-02','SONIA',0.0608,1),('2020-07-03','SONIA',0.0608,1),('2020-07-06','SONIA',0.0592,1),('2020-07-07','SONIA',0.0590,1),('2020-07-08','SONIA',0.0596,1),('2020-07-09','SONIA',0.0594,1),('2020-07-10','SONIA',0.0599,1),('2020-07-13','SONIA',0.0599,1),('2020-07-14','SONIA',0.0605,1),('2020-07-15','SONIA',0.0609,1),('2020-07-16','SONIA',0.0618,1),('2020-07-17','SONIA',0.0600,1),('2020-07-20','SONIA',0.0601,1),('2020-07-21','SONIA',0.0602,1),('2020-07-22','SONIA',0.0587,1),('2020-07-23','SONIA',0.0584,1),('2020-07-24','SONIA',0.0588,1),('2020-07-27','SONIA',0.0584,1),('2020-07-28','SONIA',0.0598,1),('2020-07-29','SONIA',0.0591,1),('2020-07-30','SONIA',0.0601,1),('2020-07-31','SONIA',0.0603,1),('2020-08-03','SONIA',0.0574,1),('2020-08-04','SONIA',0.0568,1),('2020-08-05','SONIA',0.0572,1),('2020-08-06','SONIA',0.0573,1),('2020-08-07','SONIA',0.0584,1),('2020-08-10','SONIA',0.0572,1),('2020-08-11','SONIA',0.0561,1),('2020-08-12','SONIA',0.0563,1),('2020-08-13','SONIA',0.0571,1),('2020-08-14','SONIA',0.0568,1),('2020-08-17','SONIA',0.0563,1),('2020-08-18','SONIA',0.0553,1),('2020-08-19','SONIA',0.0562,1),('2020-08-20','SONIA',0.0557,1),('2020-08-21','SONIA',0.0556,1),('2020-08-24','SONIA',0.0545,1),('2020-08-25','SONIA',0.0553,1),('2020-08-26','SONIA',0.0547,1),('2020-08-27','SONIA',0.0559,1),('2020-08-28','SONIA',0.0545,1),('2020-09-01','SONIA',0.0552,1),('2020-09-02','SONIA',0.0547,1),('2020-09-03','SONIA',0.0561,1),('2020-09-04','SONIA',0.0560,1),('2020-09-07','SONIA',0.0556,1),('2020-09-08','SONIA',0.0557,1),('2020-09-09','SONIA',0.0550,1),('2020-09-10','SONIA',0.0552,1),('2020-09-11','SONIA',0.0569,1),('2020-09-14','SONIA',0.0557,1),('2020-09-15','SONIA',0.0556,1),('2020-09-16','SONIA',0.0558,1),('2020-09-17','SONIA',0.0546,1),('2020-09-18','SONIA',0.0540,1),('2020-09-21','SONIA',0.0538,1),('2020-09-22','SONIA',0.0541,1),('2020-09-23','SONIA',0.0539,1),('2020-09-24','SONIA',0.0539,1),('2020-09-25','SONIA',0.0541,1),('2020-09-28','SONIA',0.0541,1);
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
  `holiday_country` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `decimals` tinyint NOT NULL,
  `rec_day_count` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `symbol` (`symbol`),
  KEY `country` (`holiday_country`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benchmark`
--

LOCK TABLES `benchmark` WRITE;
/*!40000 ALTER TABLE `benchmark` DISABLE KEYS */;
INSERT INTO `benchmark` VALUES (3,'SONIA','SONIA','UK',1,'Act/360');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `deal` ENABLE KEYS */;
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
  KEY `benchmark_country_idx` (`country`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES ('UK','2018-01-01','New Year’s Day'),('UK','2018-03-30','Good Friday'),('UK','2018-04-02','Easter Monday'),('UK','2018-05-07','Early May bank holiday'),('UK','2018-05-28','Spring bank holiday'),('UK','2018-08-27','Summer bank holiday'),('UK','2018-12-25','Christmas Day'),('UK','2018-12-26','Boxing Day'),('UK','2019-01-01','New Year’s Day'),('UK','2019-04-19','Good Friday'),('UK','2019-04-22','Easter Monday'),('UK','2019-05-06','Early May bank holiday'),('UK','2019-05-27','Spring bank holiday'),('UK','2019-08-26','Summer bank holiday'),('UK','2019-12-25','Christmas Day'),('UK','2019-12-26','Boxing Day'),('UK','2020-01-01','New Year’s Day'),('UK','2020-04-10','Good Friday'),('UK','2020-04-13','Easter Monday'),('UK','2020-05-08','Early May bank holiday (VE day)'),('UK','2020-05-25','Spring bank holiday'),('UK','2020-08-31','Summer bank holiday'),('UK','2020-12-25','Christmas Day'),('UK','2020-12-28','Boxing Day (substitute day)'),('UK','2021-01-01','New Year’s Day'),('UK','2021-04-02','Good Friday'),('UK','2021-04-05','Easter Monday'),('UK','2021-05-03','Early May bank holiday'),('UK','2021-05-31','Spring bank holiday'),('UK','2021-08-30','Summer bank holiday'),('UK','2021-12-27','Christmas Day (substitute day)');
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
  `symbol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `holiday_cal` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rate_pricing` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fixed_baserate` decimal(8,4) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `deal_id_idx` (`deal_id`),
  KEY `benchmark_instrument_sym_idx` (`symbol`),
  CONSTRAINT `benchmark_instrument_sym` FOREIGN KEY (`symbol`) REFERENCES `benchmark` (`symbol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deal_instrument_id` FOREIGN KEY (`deal_id`) REFERENCES `deal` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrument`
--

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `int_period`
--

LOCK TABLES `int_period` WRITE;
/*!40000 ALTER TABLE `int_period` DISABLE KEYS */;
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
  `cal_days` int unsigned NOT NULL COMMENT '# of calender days in interest period',
  `cum_int_days` int unsigned NOT NULL COMMENT 'cumulative int period days',
  `cal_days_obs` int unsigned DEFAULT NULL COMMENT '# of days in obs period',
  `cum_obs_days` int unsigned DEFAULT NULL COMMENT 'cumulative obs period days',
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
  `un_comp_rfr` decimal(26,24) DEFAULT NULL COMMENT 'Unannualized cumulative compounded RFR',
  `non_cum_rfr` decimal(26,24) DEFAULT NULL COMMENT 'non cumulative compounded RFR',
  `daily_all-in_rate` decimal(14,2) NOT NULL DEFAULT '0.00',
  `earn_base_int` decimal(14,2) NOT NULL COMMENT 'earned interest from base rate',
  `earn_cas_int` decimal(14,2) NOT NULL COMMENT 'earned interest from CAS',
  `earn_margin_int` decimal(14,2) NOT NULL COMMENT 'earned interest from margin',
  `earn_total_int` decimal(14,2) NOT NULL COMMENT 'total earned interest',
  `cum_int_total` decimal(14,2) DEFAULT NULL COMMENT 'total cumulative interest',
  PRIMARY KEY (`_id`),
  KEY `int_period_id_idx` (`int_period_id`),
  CONSTRAINT `int_period_id` FOREIGN KEY (`int_period_id`) REFERENCES `int_period` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=516 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
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
  `rate_pricing` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `instrument_id` int unsigned NOT NULL,
  `uni_tranche` tinyint unsigned DEFAULT NULL,
  `do_recalc` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `instrument_id` (`instrument_id`),
  CONSTRAINT `instrument_id` FOREIGN KEY (`instrument_id`) REFERENCES `instrument` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tranche`
--

LOCK TABLES `tranche` WRITE;
/*!40000 ALTER TABLE `tranche` DISABLE KEYS */;
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

-- Dump completed on 2020-11-08 21:41:19

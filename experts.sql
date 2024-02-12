-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: experts_db
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `aerolineas`
--

DROP TABLE IF EXISTS `aerolineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aerolineas` (
  `id_aerolinea` varchar(50) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `ci_ruc` varchar(14) DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `contacto` varchar(45) DEFAULT NULL,
  `modo` varchar(45) DEFAULT NULL,
  `maestra_guias_hijas` tinyint(1) DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `prefijo_awb` varchar(45) DEFAULT NULL,
  `codigo_cae` varchar(45) DEFAULT NULL,
  `estado_activo` tinyint(1) DEFAULT NULL,
  `from1` varchar(45) DEFAULT NULL,
  `to1` varchar(45) DEFAULT NULL,
  `by1` varchar(50) DEFAULT NULL,
  `to2` varchar(45) DEFAULT NULL,
  `by2` varchar(50) DEFAULT NULL,
  `to3` varchar(45) DEFAULT NULL,
  `by3` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_aerolinea`),
  UNIQUE KEY `contacto_UNIQUE` (`contacto`),
  KEY `fk_a_origenes_idx` (`from1`),
  KEY `fk_a_destinos1_idx` (`to1`),
  KEY `fk_a_destinos2_idx` (`to2`),
  KEY `fk_a_destinos3_idx` (`to3`),
  KEY `fk_a_aerolinea1_idx` (`by1`,`by2`),
  KEY `fk_a_a2_idx` (`by2`),
  KEY `fk_a_a3_idx` (`by3`),
  CONSTRAINT `fk_a_a1` FOREIGN KEY (`by1`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_a_a2` FOREIGN KEY (`by2`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_a_a3` FOREIGN KEY (`by3`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_a_destinos1` FOREIGN KEY (`to1`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_a_destinos2` FOREIGN KEY (`to2`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_a_destinos3` FOREIGN KEY (`to3`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_a_origenes` FOREIGN KEY (`from1`) REFERENCES `origenes` (`id_origenes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas`
--

LOCK TABLES `aerolineas` WRITE;
/*!40000 ALTER TABLE `aerolineas` DISABLE KEYS */;
/*!40000 ALTER TABLE `aerolineas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agencia_iata`
--

DROP TABLE IF EXISTS `agencia_iata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencia_iata` (
  `id_agencia_iata` int NOT NULL,
  `nombre` text NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `codigo_iata` varchar(45) DEFAULT NULL,
  `registro_sesa` varchar(45) DEFAULT NULL,
  `codigo_operador_cae` varchar(45) DEFAULT NULL,
  `codigo_consolidador_cae` varchar(45) DEFAULT NULL,
  `comision` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_agencia_iata`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencia_iata`
--

LOCK TABLES `agencia_iata` WRITE;
/*!40000 ALTER TABLE `agencia_iata` DISABLE KEYS */;
/*!40000 ALTER TABLE `agencia_iata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agencias_iata_asignadas`
--

DROP TABLE IF EXISTS `agencias_iata_asignadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencias_iata_asignadas` (
  `alias` varchar(45) NOT NULL,
  `id_shipper` int NOT NULL,
  `id_agencia_iata` int NOT NULL,
  PRIMARY KEY (`alias`),
  UNIQUE KEY `alias_UNIQUE` (`alias`),
  KEY `fk_a_iata_idx` (`id_agencia_iata`),
  KEY `fk_a_shipper_idx` (`id_shipper`),
  CONSTRAINT `fk_a_iata` FOREIGN KEY (`id_agencia_iata`) REFERENCES `agencia_iata` (`id_agencia_iata`),
  CONSTRAINT `fk_a_shipper` FOREIGN KEY (`id_shipper`) REFERENCES `shipper_info` (`id_shipper`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencias_iata_asignadas`
--

LOCK TABLES `agencias_iata_asignadas` WRITE;
/*!40000 ALTER TABLE `agencias_iata_asignadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `agencias_iata_asignadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cae_aduana`
--

DROP TABLE IF EXISTS `cae_aduana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cae_aduana` (
  `id_aduana` varchar(4) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_aduana`),
  UNIQUE KEY `id_aduana_UNIQUE` (`id_aduana`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cae_aduana`
--

LOCK TABLES `cae_aduana` WRITE;
/*!40000 ALTER TABLE `cae_aduana` DISABLE KEYS */;
INSERT INTO `cae_aduana` VALUES ('019','GUAYAQUIL - AEREO'),('028','GUAYAQUIL - MARITIMO'),('037','MANTA'),('046','ESMERALDAS'),('055','QUITO'),('064','PUERTO BOLIVAR'),('073','TULCAN'),('082','HUAQUILLAS'),('091','CUENCA'),('109','LOJA - MACARA'),('118','SANTA ELENA'),('127','LATACUNGA');
/*!40000 ALTER TABLE `cae_aduana` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_clientes` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `codigo_pais` varchar(45) DEFAULT NULL,
  `fitos_valor` decimal(10,0) DEFAULT NULL,
  `form_a` decimal(10,0) DEFAULT NULL,
  `transport` decimal(10,0) DEFAULT NULL,
  `termo` decimal(10,0) DEFAULT NULL,
  `mica` decimal(10,0) DEFAULT NULL,
  `handling` decimal(10,0) DEFAULT NULL,
  `cuenta_contable` varchar(45) DEFAULT NULL,
  `nombre_factura` varchar(45) DEFAULT NULL,
  `ruc_factura` varchar(45) DEFAULT NULL,
  `direccion_fatura` varchar(45) DEFAULT NULL,
  `telefono_factura` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_clientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario`
--

DROP TABLE IF EXISTS `consignatario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario` (
  `id_consignatario` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `id_embarcador` int NOT NULL,
  `id_cliente` int NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_cliente_idx` (`id_cliente`),
  KEY `fk_c_embarcador_idx` (`id_embarcador`),
  CONSTRAINT `fk_c_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_clientes`),
  CONSTRAINT `fk_c_embarcador` FOREIGN KEY (`id_embarcador`) REFERENCES `embarcadores` (`id_embarcadores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario`
--

LOCK TABLES `consignatario` WRITE;
/*!40000 ALTER TABLE `consignatario` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_cae_sice`
--

DROP TABLE IF EXISTS `consignatario_cae_sice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_cae_sice` (
  `id_consignatario` int NOT NULL,
  `consignee_nombre` varchar(45) DEFAULT NULL,
  `consignee_direccion` varchar(45) DEFAULT NULL,
  `consignee_ciudad` varchar(45) DEFAULT NULL,
  `consignee_provincia` varchar(45) DEFAULT NULL,
  `consignee_pais` varchar(45) DEFAULT NULL,
  `notify_nombre` varchar(45) DEFAULT NULL,
  `notify_direccion` varchar(45) DEFAULT NULL,
  `notify_ciudad` varchar(45) DEFAULT NULL,
  `notify_provincia` varchar(45) DEFAULT NULL,
  `notify_pais` varchar(45) DEFAULT NULL,
  `hawb_nombre` varchar(45) DEFAULT NULL,
  `hawb_direccion` varchar(45) DEFAULT NULL,
  `hawb_ciudad` varchar(45) DEFAULT NULL,
  `hawb_provincia` varchar(45) DEFAULT NULL,
  `hawb_pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_cae_sice_consignatrio_idx` (`id_consignatario`),
  CONSTRAINT `fk_cae_sice_consignatrio` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_cae_sice`
--

LOCK TABLES `consignatario_cae_sice` WRITE;
/*!40000 ALTER TABLE `consignatario_cae_sice` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_cae_sice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_facturacion`
--

DROP TABLE IF EXISTS `consignatario_facturacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_facturacion` (
  `id_consignatario` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` text,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_f_consignatario_idx` (`id_consignatario`),
  CONSTRAINT `fk_c_f_consignatario_a` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_facturacion`
--

LOCK TABLES `consignatario_facturacion` WRITE;
/*!40000 ALTER TABLE `consignatario_facturacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_facturacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_fito`
--

DROP TABLE IF EXISTS `consignatario_fito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_fito` (
  `id_consignatario` int NOT NULL,
  `fito_declared_name` text,
  `fito_forma_a` text,
  `fito_nombre` varchar(45) DEFAULT NULL,
  `fito_direccion` varchar(45) DEFAULT NULL,
  `fito_pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_f_consignatario_idx` (`id_consignatario`),
  CONSTRAINT `fk_c_f_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_fito`
--

LOCK TABLES `consignatario_fito` WRITE;
/*!40000 ALTER TABLE `consignatario_fito` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_fito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_guia_h`
--

DROP TABLE IF EXISTS `consignatario_guia_h`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_guia_h` (
  `id_consignatario` int NOT NULL,
  `gua_h_consignee` varchar(45) DEFAULT NULL,
  `guia_h_name_adress` text,
  `guia_h_notify` text,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_h_consignatario_idx` (`id_consignatario`),
  CONSTRAINT `fk_c_h_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_guia_h`
--

LOCK TABLES `consignatario_guia_h` WRITE;
/*!40000 ALTER TABLE `consignatario_guia_h` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_guia_h` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_guia_m`
--

DROP TABLE IF EXISTS `consignatario_guia_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_guia_m` (
  `id_consignatario` int NOT NULL,
  `id_destino_final` varchar(45) DEFAULT NULL,
  `guia_m_consignee` text,
  `guia_m_name_address` text,
  `guia_m_notify` text,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_m_consignatario_idx` (`id_consignatario`),
  KEY `fk_c_m_destino_idx` (`id_destino_final`),
  CONSTRAINT `fk_c_m_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`),
  CONSTRAINT `fk_c_m_destino` FOREIGN KEY (`id_destino_final`) REFERENCES `destinos` (`id_destino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_guia_m`
--

LOCK TABLES `consignatario_guia_m` WRITE;
/*!40000 ALTER TABLE `consignatario_guia_m` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_guia_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_transmision`
--

DROP TABLE IF EXISTS `consignatario_transmision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_transmision` (
  `id_consignatario` int NOT NULL,
  `consignee_nombre` varchar(45) DEFAULT NULL,
  `consignee_direccion` varchar(45) DEFAULT NULL,
  `consignee_ciudad` varchar(45) DEFAULT NULL,
  `consignee_provincia` varchar(45) DEFAULT NULL,
  `consignee_pais` varchar(45) DEFAULT NULL,
  `consignee_eueori` varchar(45) DEFAULT NULL,
  `notify_nombre` varchar(45) DEFAULT NULL,
  `notify_direccion` varchar(45) DEFAULT NULL,
  `notify_ciudad` varchar(45) DEFAULT NULL,
  `notify_provincia` varchar(45) DEFAULT NULL,
  `notify_pais` varchar(45) DEFAULT NULL,
  `notify_eueori` varchar(45) DEFAULT NULL,
  `hawb_nombre` varchar(45) DEFAULT NULL,
  `hawb_direccion` varchar(45) DEFAULT NULL,
  `hawb_ciudad` varchar(45) DEFAULT NULL,
  `hawb_provincia` varchar(45) DEFAULT NULL,
  `hawb_pais` varchar(45) DEFAULT NULL,
  `hawb_eueori` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_t_consignatario_idx` (`id_consignatario`),
  CONSTRAINT `fk_c_t_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_transmision`
--

LOCK TABLES `consignatario_transmision` WRITE;
/*!40000 ALTER TABLE `consignatario_transmision` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_transmision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinacion`
--

DROP TABLE IF EXISTS `coordinacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinacion` (
  `id_coordinacion` int NOT NULL AUTO_INCREMENT,
  `id_consignatario` int NOT NULL,
  `id_aerolinea` varchar(50) NOT NULL,
  `id_guia_madre` int NOT NULL,
  `id_tipo_embarque` varchar(45) NOT NULL,
  `id_iata_asignadas` varchar(45) NOT NULL,
  `pago` tinyint NOT NULL,
  `fecha_vuelo` date DEFAULT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `cupo_maximo` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_coordinacion`),
  KEY `fk_c_consignatario_idx` (`id_consignatario`),
  KEY `fk_c_guia_m_idx` (`id_guia_madre`),
  KEY `fk_c_tipo_embarque_idx` (`id_tipo_embarque`),
  KEY `fk_c_agencia_iata_idx` (`id_iata_asignadas`),
  KEY `fk_c_guia_aerolinea_idx` (`id_aerolinea`),
  CONSTRAINT `fk_c_agencia_iata` FOREIGN KEY (`id_iata_asignadas`) REFERENCES `agencias_iata_asignadas` (`alias`),
  CONSTRAINT `fk_c_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`),
  CONSTRAINT `fk_c_guia_aerolinea` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_c_guia_m` FOREIGN KEY (`id_guia_madre`) REFERENCES `guias_madre` (`id_guia_madre`),
  CONSTRAINT `fk_c_tipo_embarque` FOREIGN KEY (`id_tipo_embarque`) REFERENCES `tipo_embarque` (`id_tipo_embarque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinacion`
--

LOCK TABLES `coordinacion` WRITE;
/*!40000 ALTER TABLE `coordinacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `coordinacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinos`
--

DROP TABLE IF EXISTS `destinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinos` (
  `id_destino` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `aeropuerto` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `id_sesa` varchar(45) DEFAULT NULL,
  `leyenda_fito` text,
  `cobro_fitos` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_destino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinos`
--

LOCK TABLES `destinos` WRITE;
/*!40000 ALTER TABLE `destinos` DISABLE KEYS */;
/*!40000 ALTER TABLE `destinos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `embarcadores`
--

DROP TABLE IF EXISTS `embarcadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `embarcadores` (
  `id_embarcadores` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `codigo_pais` varchar(45) DEFAULT NULL,
  `handling` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_embarcadores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `embarcadores`
--

LOCK TABLES `embarcadores` WRITE;
/*!40000 ALTER TABLE `embarcadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `embarcadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guias_inicio`
--

DROP TABLE IF EXISTS `guias_inicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guias_inicio` (
  `id_guia_inicio` int NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` date NOT NULL,
  `id_aerolinea` varchar(50) DEFAULT NULL,
  `id_iata` int DEFAULT NULL,
  PRIMARY KEY (`id_guia_inicio`),
  KEY `fk_referencia_idx` (`id_iata`),
  KEY `fk_g_i_aerolinea_idx` (`id_aerolinea`),
  CONSTRAINT `fk_g_i_aerolinea` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_iata` FOREIGN KEY (`id_iata`) REFERENCES `agencia_iata` (`id_agencia_iata`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guias_inicio`
--

LOCK TABLES `guias_inicio` WRITE;
/*!40000 ALTER TABLE `guias_inicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `guias_inicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guias_madre`
--

DROP TABLE IF EXISTS `guias_madre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guias_madre` (
  `id_guia_madre` int NOT NULL AUTO_INCREMENT,
  `id_guia_inicio` int NOT NULL,
  `numero_guia` varchar(45) NOT NULL,
  `numero_coordinacion` varchar(45) DEFAULT NULL,
  `prestamo` tinyint(1) NOT NULL DEFAULT '0',
  `observaciones` text,
  `fecha_prestamo` date DEFAULT NULL,
  `devolucion` tinyint NOT NULL DEFAULT '0',
  `fecha_devolucion` date DEFAULT NULL,
  `verificar_estado_awb` tinyint NOT NULL,
  PRIMARY KEY (`id_guia_madre`),
  KEY `fk_guia_madre_idx` (`id_guia_inicio`),
  CONSTRAINT `fk_g_m_inicio` FOREIGN KEY (`id_guia_inicio`) REFERENCES `guias_inicio` (`id_guia_inicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guias_madre`
--

LOCK TABLES `guias_madre` WRITE;
/*!40000 ALTER TABLE `guias_madre` DISABLE KEYS */;
/*!40000 ALTER TABLE `guias_madre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `origenes`
--

DROP TABLE IF EXISTS `origenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origenes` (
  `id_origenes` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `id_pais` varchar(45) NOT NULL,
  `id_aduana` varchar(45) NOT NULL,
  PRIMARY KEY (`id_origenes`),
  UNIQUE KEY `id_origenes_UNIQUE` (`id_origenes`),
  KEY `fk_paises_idx` (`id_pais`),
  KEY `fk_id_aduana_idx` (`id_aduana`),
  CONSTRAINT `fk_id_aduana` FOREIGN KEY (`id_aduana`) REFERENCES `cae_aduana` (`id_aduana`),
  CONSTRAINT `fk_paises` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
/*!40000 ALTER TABLE `origenes` DISABLE KEYS */;
INSERT INTO `origenes` VALUES ('GYE','GUAYAQUIL','EC','019'),('LTX','LATACUNGA','EC','127'),('UIO','QUITO','EC','055');
/*!40000 ALTER TABLE `origenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paises`
--

DROP TABLE IF EXISTS `paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paises` (
  `id_pais` varchar(45) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `pais_id` int DEFAULT NULL,
  `id_acuerdo` int DEFAULT NULL,
  PRIMARY KEY (`id_pais`),
  UNIQUE KEY `id_pais_UNIQUE` (`id_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paises`
--

LOCK TABLES `paises` WRITE;
/*!40000 ALTER TABLE `paises` DISABLE KEYS */;
INSERT INTO `paises` VALUES ('EC','ECUADOR',1113,3);
/*!40000 ALTER TABLE `paises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper_info`
--

DROP TABLE IF EXISTS `shipper_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipper_info` (
  `id_shipper` int NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_shipper`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper_info`
--

LOCK TABLES `shipper_info` WRITE;
/*!40000 ALTER TABLE `shipper_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipper_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_carga`
--

DROP TABLE IF EXISTS `tipo_carga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_carga` (
  `id_tipo_carga` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_carga`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_carga`
--

LOCK TABLES `tipo_carga` WRITE;
/*!40000 ALTER TABLE `tipo_carga` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_carga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_embalaje`
--

DROP TABLE IF EXISTS `tipo_embalaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_embalaje` (
  `id_tipo_embalaje` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_embalaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_embalaje`
--

LOCK TABLES `tipo_embalaje` WRITE;
/*!40000 ALTER TABLE `tipo_embalaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_embalaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_embarque`
--

DROP TABLE IF EXISTS `tipo_embarque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_embarque` (
  `id_tipo_embarque` varchar(45) NOT NULL,
  `descripcion` text,
  `id_tipo_carga` varchar(45) NOT NULL,
  `id_tipo_embalaje` varchar(45) NOT NULL,
  `regimen` varchar(45) DEFAULT NULL,
  `mercancia` varchar(45) DEFAULT NULL,
  `harmonised_comidity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_embarque`),
  KEY `fk_t_e_carga_idx` (`id_tipo_carga`),
  KEY `fk_t_e_embalaje_idx` (`id_tipo_embalaje`),
  CONSTRAINT `fk_t_e_carga` FOREIGN KEY (`id_tipo_carga`) REFERENCES `tipo_carga` (`id_tipo_carga`),
  CONSTRAINT `fk_t_e_embalaje` FOREIGN KEY (`id_tipo_embalaje`) REFERENCES `tipo_embalaje` (`id_tipo_embalaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_embarque`
--

LOCK TABLES `tipo_embarque` WRITE;
/*!40000 ALTER TABLE `tipo_embarque` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_embarque` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< Updated upstream
-- Dump completed on 2024-02-05 22:19:12
=======
-- Dump completed on 2024-02-03 18:40:33
>>>>>>> Stashed changes

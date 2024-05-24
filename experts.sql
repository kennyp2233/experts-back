-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: experts_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `acuerdos_arancelarios`
--

DROP TABLE IF EXISTS `acuerdos_arancelarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acuerdos_arancelarios` (
  `id_acuerdo` int NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  PRIMARY KEY (`id_acuerdo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acuerdos_arancelarios`
--

LOCK TABLES `acuerdos_arancelarios` WRITE;
/*!40000 ALTER TABLE `acuerdos_arancelarios` DISABLE KEYS */;
INSERT INTO `acuerdos_arancelarios` VALUES (1,'ATPDEA '),(2,'EUR1'),(3,'GSTP'),(4,'SGP-CA (CANADA) '),(5,'SGP-FR (FEDERACION RUSA) '),(6,'SGP-UE (UNION EUROPEA) '),(7,'SGP-US (ESTADOS UNIDOS) ');
/*!40000 ALTER TABLE `acuerdos_arancelarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `a_pk_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aerolineas`
--

DROP TABLE IF EXISTS `aerolineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aerolineas` (
  `id_aerolinea` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `ci_ruc` varchar(14) DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `contacto` varchar(45) DEFAULT NULL,
  `modo` tinyint NOT NULL,
  `maestra_guias_hijas` tinyint(1) NOT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `prefijo_awb` varchar(45) DEFAULT NULL,
  `codigo_cae` varchar(45) DEFAULT NULL,
  `estado_activo` tinyint(1) NOT NULL,
  `from1` int DEFAULT NULL,
  `to1` int DEFAULT NULL,
  `by1` int DEFAULT NULL,
  `to2` int DEFAULT NULL,
  `by2` int DEFAULT NULL,
  `to3` int DEFAULT NULL,
  `by3` int DEFAULT NULL,
  `afiliado_cass` tinyint(1) NOT NULL,
  `guias_virtuales` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_aerolinea`),
  UNIQUE KEY `contacto_UNIQUE` (`contacto`),
  KEY `fk_a_origenes_idx` (`from1`),
  KEY `fk_a_a1_idx` (`by1`),
  KEY `fk_a_a2_idx` (`by2`),
  KEY `fk_a_a3_idx` (`by3`),
  KEY `fk_a_destino1_idx` (`to1`),
  KEY `fk_a_destino2_idx` (`to2`),
  KEY `fk_a_destino3_idx` (`to3`),
  CONSTRAINT `fk_a_a1` FOREIGN KEY (`by1`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_a_a2` FOREIGN KEY (`by2`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_a_a3` FOREIGN KEY (`by3`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_a_destino1` FOREIGN KEY (`to1`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_a_destino2` FOREIGN KEY (`to2`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_a_destino3` FOREIGN KEY (`to3`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_a_origenes` FOREIGN KEY (`from1`) REFERENCES `origenes` (`id_origen`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas`
--

LOCK TABLES `aerolineas` WRITE;
/*!40000 ALTER TABLE `aerolineas` DISABLE KEYS */;
INSERT INTO `aerolineas` VALUES (1,'ACG AIR CARGO GERMANY','1792402956001','GEBÄUDE 1335||D-55483 HAHN AIRPORT||GERMANY||','496543508462',NULL,NULL,'GERMANY',NULL,1,1,'6U','730','6807',1,9,1,1,1,1,1,1,0,0);
/*!40000 ALTER TABLE `aerolineas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aerolineas_codigos_plantillas`
--

DROP TABLE IF EXISTS `aerolineas_codigos_plantillas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aerolineas_codigos_plantillas` (
  `id_aerolinea` int NOT NULL,
  `costo_guia_abrv` varchar(45) DEFAULT NULL,
  `combustible_abrv` varchar(45) DEFAULT NULL,
  `seguridad_abrv` varchar(45) DEFAULT NULL,
  `aux_calculo_abrv` varchar(45) DEFAULT NULL,
  `iva_abrv` varchar(45) DEFAULT NULL,
  `otros_abrv` varchar(45) DEFAULT NULL,
  `aux1_abrv` varchar(45) DEFAULT NULL,
  `aux2_abrv` varchar(45) DEFAULT NULL,
  `costo_guia_valor` decimal(10,2) DEFAULT NULL,
  `combustible_valor` decimal(10,2) DEFAULT NULL,
  `seguroidad_valor` decimal(10,2) DEFAULT NULL,
  `aux_calculo_valor` decimal(10,2) DEFAULT NULL,
  `otros_valor` decimal(10,2) DEFAULT NULL,
  `aux1_valor` decimal(10,2) DEFAULT NULL,
  `aux2_valor` decimal(10,2) DEFAULT NULL,
  `plantilla_guia_madre` varchar(45) DEFAULT NULL,
  `plantilla_formato_aerolinea` varchar(45) DEFAULT NULL,
  `plantilla_reservas` varchar(45) DEFAULT NULL,
  `tarifa_rate` decimal(10,2) DEFAULT NULL,
  `pca` decimal(10,4) DEFAULT NULL,
  `combustible_mult` tinyint DEFAULT NULL,
  `seguridad_mult` tinyint DEFAULT NULL,
  `aux_calc_mult` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_aerolinea`),
  CONSTRAINT `fk_a_c_p` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas_codigos_plantillas`
--

LOCK TABLES `aerolineas_codigos_plantillas` WRITE;
/*!40000 ALTER TABLE `aerolineas_codigos_plantillas` DISABLE KEYS */;
INSERT INTO `aerolineas_codigos_plantillas` VALUES (1,'AWC','FSC','SCC',NULL,NULL,NULL,NULL,NULL,15.00,1.28,NULL,NULL,NULL,NULL,NULL,'GMFFF730',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `aerolineas_codigos_plantillas` ENABLE KEYS */;
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
  `comision` decimal(10,2) DEFAULT NULL,
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
  `id_a_i_a` int NOT NULL AUTO_INCREMENT,
  `alias` varchar(45) NOT NULL,
  `id_shipper` int NOT NULL,
  `id_agencia_iata` int NOT NULL,
  PRIMARY KEY (`id_a_i_a`),
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
  `id_cae_aduana` int NOT NULL AUTO_INCREMENT,
  `codigo_aduana` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_cae_aduana`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cae_aduana`
--

LOCK TABLES `cae_aduana` WRITE;
/*!40000 ALTER TABLE `cae_aduana` DISABLE KEYS */;
INSERT INTO `cae_aduana` VALUES (1,19,'GUAYAQUIL - AEREO'),(6,28,'GUAYAQUIL - MARITIMO'),(7,37,'MANTA'),(8,46,'ESMERALDAS'),(9,55,'QUITO'),(10,64,'PUERTO BOLIVAR'),(11,73,'TULCAN'),(12,82,'HUAQUILLAS'),(13,91,'CUENCA'),(14,109,'LOJA - MACARA'),(15,118,'SANTA ELENA'),(16,127,'LATACUNGA');
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
  `id_destino` int DEFAULT NULL,
  `guia_m_consignee` text,
  `guia_m_name_address` text,
  `guia_m_notify` text,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_c_m_consignatario_idx` (`id_consignatario`),
  KEY `fk_c_m_destino_idx` (`id_destino`),
  CONSTRAINT `fk_c_m_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`),
  CONSTRAINT `fk_c_m_destino` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`)
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
  `id_aerolinea_coordinacion` int NOT NULL,
  `id_guia_madre` int NOT NULL,
  `id_tipo_embarque` int NOT NULL,
  `id_iata_asignadas` int NOT NULL,
  `pago` tinyint NOT NULL,
  `fecha_vuelo` date DEFAULT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `cupo_maximo` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_coordinacion`),
  KEY `fk_c_guia_m_idx` (`id_guia_madre`),
  KEY `fk_c_aerolinea_idx` (`id_aerolinea_coordinacion`),
  KEY `fk_c_a_i_a_idx` (`id_iata_asignadas`),
  KEY `fk_c_tipo_embarque_idx` (`id_tipo_embarque`),
  CONSTRAINT `fk_c_a_i_a` FOREIGN KEY (`id_iata_asignadas`) REFERENCES `agencias_iata_asignadas` (`id_a_i_a`),
  CONSTRAINT `fk_c_aerolinea` FOREIGN KEY (`id_aerolinea_coordinacion`) REFERENCES `coordinacion_aerolinea` (`id_coordinacion`),
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
-- Table structure for table `coordinacion_aerolinea`
--

DROP TABLE IF EXISTS `coordinacion_aerolinea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinacion_aerolinea` (
  `id_coordinacion` int NOT NULL,
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
  `from1` int DEFAULT NULL,
  `to1` int DEFAULT NULL,
  `by1` int DEFAULT NULL,
  `to2` int DEFAULT NULL,
  `by2` int DEFAULT NULL,
  `to3` int DEFAULT NULL,
  `by3` int DEFAULT NULL,
  PRIMARY KEY (`id_coordinacion`),
  KEY `fk_c_a_orignenes_idx` (`from1`),
  KEY `fk_c_a_a1_idx` (`by1`),
  KEY `fk_c_a_a2_idx` (`by2`),
  KEY `fk_c_a_a3_idx` (`by3`),
  KEY `fk_c_a_destino3_idx` (`to3`),
  KEY `fk_c_a_destino2_idx` (`to2`),
  KEY `fk_c_a_destino1_idx` (`to1`),
  CONSTRAINT `fk_c_a_a1` FOREIGN KEY (`by1`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_c_a_a2` FOREIGN KEY (`by2`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_c_a_a3` FOREIGN KEY (`by3`) REFERENCES `aerolineas` (`id_aerolinea`),
  CONSTRAINT `fk_c_a_coordinacion` FOREIGN KEY (`id_coordinacion`) REFERENCES `coordinacion` (`id_coordinacion`),
  CONSTRAINT `fk_c_a_destino1` FOREIGN KEY (`to1`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_c_a_destino2` FOREIGN KEY (`to2`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_c_a_destino3` FOREIGN KEY (`to3`) REFERENCES `destinos` (`id_destino`),
  CONSTRAINT `fk_c_a_orignenes` FOREIGN KEY (`from1`) REFERENCES `origenes` (`id_origen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinacion_aerolinea`
--

LOCK TABLES `coordinacion_aerolinea` WRITE;
/*!40000 ALTER TABLE `coordinacion_aerolinea` DISABLE KEYS */;
/*!40000 ALTER TABLE `coordinacion_aerolinea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinacion_aerolineas_c_p`
--

DROP TABLE IF EXISTS `coordinacion_aerolineas_c_p`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinacion_aerolineas_c_p` (
  `id_coordinacion` int NOT NULL,
  `costo_guia_abrv` varchar(45) DEFAULT NULL,
  `combustible_abrv` varchar(45) DEFAULT NULL,
  `seguridad_abrv` varchar(45) DEFAULT NULL,
  `aux_calculo_abrv` varchar(45) DEFAULT NULL,
  `iva_abrv` varchar(45) DEFAULT NULL,
  `otros_abrv` varchar(45) DEFAULT NULL,
  `aux1_abrv` varchar(45) DEFAULT NULL,
  `aux2_abrv` varchar(45) DEFAULT NULL,
  `costo_guia_valor` decimal(10,2) DEFAULT NULL,
  `combustible_valor` decimal(10,2) DEFAULT NULL,
  `seguroidad_valor` decimal(10,2) DEFAULT NULL,
  `aux_calculo_valor` decimal(10,2) DEFAULT NULL,
  `otros_valor` decimal(10,2) DEFAULT NULL,
  `aux1_valor` decimal(10,2) DEFAULT NULL,
  `aux2_valor` decimal(10,2) DEFAULT NULL,
  `plantilla_guia_madre` varchar(45) DEFAULT NULL,
  `plantilla_formato_aerolinea` varchar(45) DEFAULT NULL,
  `plantilla_reservas` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_coordinacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinacion_aerolineas_c_p`
--

LOCK TABLES `coordinacion_aerolineas_c_p` WRITE;
/*!40000 ALTER TABLE `coordinacion_aerolineas_c_p` DISABLE KEYS */;
/*!40000 ALTER TABLE `coordinacion_aerolineas_c_p` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinacion_clientes`
--

DROP TABLE IF EXISTS `coordinacion_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinacion_clientes` (
  `id_coordinacion` int NOT NULL,
  `id_consignatario` int NOT NULL,
  PRIMARY KEY (`id_coordinacion`),
  KEY `fk_g_m_consignatario_idx` (`id_consignatario`),
  KEY `fk_c_c_coordinacion_idx` (`id_coordinacion`),
  CONSTRAINT `fk_c_c_coordinacion` FOREIGN KEY (`id_coordinacion`) REFERENCES `coordinacion` (`id_coordinacion`),
  CONSTRAINT `fk_g_m_consignatario` FOREIGN KEY (`id_consignatario`) REFERENCES `consignatario` (`id_consignatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinacion_clientes`
--

LOCK TABLES `coordinacion_clientes` WRITE;
/*!40000 ALTER TABLE `coordinacion_clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `coordinacion_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinos`
--

DROP TABLE IF EXISTS `destinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinos` (
  `id_destino` int NOT NULL AUTO_INCREMENT,
  `codigo_destino` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `aeropuerto` varchar(45) DEFAULT NULL,
  `id_pais` int NOT NULL,
  `sesa_id` varchar(45) DEFAULT NULL,
  `leyenda_fito` text,
  `cobro_fitos` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_destino`),
  KEY `fk_d_pais_idx` (`id_pais`),
  CONSTRAINT `fk_d_pais` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinos`
--

LOCK TABLES `destinos` WRITE;
/*!40000 ALTER TABLE `destinos` DISABLE KEYS */;
INSERT INTO `destinos` VALUES (1,'EZE','EZE','AEROPUERTO INTERNACIONAL MINISTRO PISTARINI',41,'1008',NULL,0),(2,'ABQ','ALBUQUERQUE','ALBUQUERQUE',89,'0','NINGUNA',0),(3,'ALC','ALICANTE','ALICANTE',61,'0','\"IMMEDIATELY PRIOR TO THEIR EXPORT, HAVE BEEN OFFICIALLY INSPECTED AND FOUND FREE FROM BEMISIA TABACI GENN AND LIRIOMYZA SATIVAE (BLANCHARD); AMAUROMYZA MACULOZA (MALLOCH)\"',0),(4,'ALK','AUCKLAND','AUCKLAND',79,'1008','NINGUNA',0),(5,'ALA','ALAMATY','ALAMATY (ALA)',70,'1358','\"IMMEDIATELY PRIOR TO THEIR EXPORT, HAVE BEEN OFFICIALLY INSPECTED AND FOUND FREE FROM BEMISIA TABACI GENN\"',0),(6,'AMS','AMSTERDAM','AMSTERDAM HOLLAND',78,'1104','CONSIGNMENT COMPLIES WITH ANNEX VII, POINT 28 B, OF REGULATION (EU) 2019/2072, IMMEDIATELY PRIOR TO THEIR EXPORT, HAVE BEEN OFFICIALLY INSPECTED AND FOUND FREE FROM LIRIOMYZA SATIVAE (BLANCHARD) AND AMAUROMYZA MACULOSA (MALLOCH).CONSIGNMENT COMPLIES WITH ANNEX VII, POINT 25 B, OF REGULATION (EU) 2019/2072, NO SIGNS OF SPODOPTERA ERIDANIA (CRAMER), SPODOPTERA FRUGIPERDA SMITH, OR SPODOPTERA LITURA (FABRICIUS) HAVE BEEN OBSERVED AT THE PLACE OF PRODUCTION SINCE THE BEGINNING OF THE LAST COMPLETE CYCLE OF VEGETATION\n ',0),(7,'ARN','ARLANDA','ARLANDA',86,'0','\"IMMEDIATELY PRIOR TO THEIR EXPORT, HAVE BEEN OFFICIALLY INSPECTED AND FOUND FREE FROM BEMISIA TABACI GENN AND LIRIOMYZA SATIVAE (BLANCHARD); AMAUROMYZA MACULOZA (MALLOCH)\"',0),(8,'ATL','ATLANTA','ATLANTA',89,'956','NINGUNA',0),(9,'AVN','YEREVAN','YEREVAN',5,'0','NINGUNA',1);
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
  `handling` decimal(10,2) DEFAULT NULL,
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
-- Table structure for table `fincas`
--

DROP TABLE IF EXISTS `fincas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fincas` (
  `id_finca` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `alias` varchar(45) NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `tipo_documento` varchar(45) DEFAULT NULL,
  `genera_guias_certificadas` tinyint DEFAULT NULL,
  `i_general_telefono` varchar(45) DEFAULT NULL,
  `i_general_email` varchar(45) DEFAULT NULL,
  `i_general_ciudad` varchar(45) DEFAULT NULL,
  `i_general_provincia` varchar(45) DEFAULT NULL,
  `i_general_pais` varchar(45) DEFAULT NULL,
  `i_general_cod_sesa` varchar(45) DEFAULT NULL,
  `i_general_cod_pais` varchar(45) DEFAULT NULL,
  `dim_x` decimal(10,2) DEFAULT NULL,
  `dim_y` decimal(10,2) DEFAULT NULL,
  `dim_z` decimal(10,2) DEFAULT NULL,
  `excel_plantilla` text,
  `a_nombre` text,
  `a_codigo` varchar(45) DEFAULT NULL,
  `a_direccion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_finca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fincas`
--

LOCK TABLES `fincas` WRITE;
/*!40000 ALTER TABLE `fincas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fincas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fincas_choferes`
--

DROP TABLE IF EXISTS `fincas_choferes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fincas_choferes` (
  `id_finca` int NOT NULL,
  `chofer` text,
  KEY `fk_f_c_finca_idx` (`id_finca`),
  CONSTRAINT `fk_f_c_finca` FOREIGN KEY (`id_finca`) REFERENCES `fincas` (`id_finca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fincas_choferes`
--

LOCK TABLES `fincas_choferes` WRITE;
/*!40000 ALTER TABLE `fincas_choferes` DISABLE KEYS */;
/*!40000 ALTER TABLE `fincas_choferes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fincas_productos`
--

DROP TABLE IF EXISTS `fincas_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fincas_productos` (
  `id_finca` int NOT NULL,
  `codigo` varchar(45) NOT NULL,
  `descripcion` text NOT NULL,
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `fk_f_p_finca_idx` (`id_finca`),
  CONSTRAINT `fk_f_p_finca` FOREIGN KEY (`id_finca`) REFERENCES `fincas` (`id_finca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fincas_productos`
--

LOCK TABLES `fincas_productos` WRITE;
/*!40000 ALTER TABLE `fincas_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `fincas_productos` ENABLE KEYS */;
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
  `id_aerolinea` int DEFAULT NULL,
  `id_iata` int DEFAULT NULL,
  PRIMARY KEY (`id_guia_inicio`),
  KEY `fk_referencia_idx` (`id_iata`),
  KEY `fk_g_i_a_idx` (`id_aerolinea`),
  CONSTRAINT `fk_g_i_a` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`),
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
  `numero_guia` bigint NOT NULL,
  `numero_coordinacion` varchar(45) DEFAULT NULL,
  `prestamo` tinyint(1) NOT NULL DEFAULT '0',
  `observaciones` text,
  `fecha_prestamo` date DEFAULT NULL,
  `devolucion` tinyint NOT NULL DEFAULT '0',
  `fecha_devolucion` date DEFAULT NULL,
  `verificar_estado_awb` tinyint NOT NULL,
  PRIMARY KEY (`id_guia_madre`),
  UNIQUE KEY `numero_guia_UNIQUE` (`numero_guia`),
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
  `id_origen` int NOT NULL AUTO_INCREMENT,
  `codigo_origen` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `aeropuerto` varchar(45) NOT NULL,
  `id_pais` int NOT NULL,
  `id_cae_aduana` int NOT NULL,
  PRIMARY KEY (`id_origen`),
  KEY `fk_o_paises_idx` (`id_pais`),
  KEY `fk_o_cae_aduana_idx` (`id_cae_aduana`),
  CONSTRAINT `fk_o_cae_aduana` FOREIGN KEY (`id_cae_aduana`) REFERENCES `cae_aduana` (`id_cae_aduana`),
  CONSTRAINT `fk_o_paises` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
/*!40000 ALTER TABLE `origenes` DISABLE KEYS */;
INSERT INTO `origenes` VALUES (1,'GYE','GUAYAQUIL','JOSE JOAQUIN DE OLMEDO',58,1),(8,'LTX','LATACUNGA','AEROPUERTO INT\'L COTOPAXI EC',58,16),(9,'UIO','QUITO','MARISCAL SUCRE QUITO',58,9);
/*!40000 ALTER TABLE `origenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paises`
--

DROP TABLE IF EXISTS `paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paises` (
  `id_pais` int NOT NULL AUTO_INCREMENT,
  `siglas_pais` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `pais_id` int DEFAULT NULL,
  `id_acuerdo` int DEFAULT NULL,
  PRIMARY KEY (`id_pais`),
  UNIQUE KEY `siglas_pais_UNIQUE` (`siglas_pais`),
  KEY `fk_p_acuerdo_idx` (`id_acuerdo`),
  CONSTRAINT `fk_p_acuerdo` FOREIGN KEY (`id_acuerdo`) REFERENCES `acuerdos_arancelarios` (`id_acuerdo`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paises`
--

LOCK TABLES `paises` WRITE;
/*!40000 ALTER TABLE `paises` DISABLE KEYS */;
INSERT INTO `paises` VALUES (5,'AM','ARMENIA',14,5),(40,'AN','NETHERLANDS ANTILLES',8,5),(41,'AR','ARGENTINA',14,5),(42,'AU','AUSTRALIA',14,5),(43,'AZ','AZERBAIJAN',16,5),(44,'BA','BOSNIA AND HERZEGOVINA',17,5),(45,'BB','BARBADOS',18,5),(46,'BE','BELGICA',20,5),(47,'BO','BOLIVIA',28,5),(48,'BR','BRAZIL',29,5),(49,'BY','BELARUS',34,5),(50,'CA','CANADA',36,5),(51,'CH','SWITZERLAND',41,5),(52,'CL','REPUBLICA DE CHILE',44,5),(53,'CO','COLOMBIA',47,5),(54,'CR','COSTA RICA',48,5),(55,'CU','CUBA',49,5),(56,'CZ','CZECH REPUBLIC',53,5),(57,'DE','GERMANY',1112,5),(58,'EC','ECUADOR',1113,5),(59,'EE','ESTONIA',61,5),(60,'EG','EGYPT',62,5),(61,'ES','ESPAÑA',64,5),(62,'FR','FRANCE',71,6),(64,'GE','GEORGIA',74,5),(65,'HR','CROATIA',92,5),(66,'IT','ITALY',103,5),(67,'JP','JAPAN',106,5),(68,'KG','KYRGYZSTAN',108,5),(69,'KW','KUWAIT',115,5),(70,'KZ','KAZAKHSTAN',117,5),(71,'LT','LITUANIA',71,5),(74,'LU','LUXEMBOURG',126,5),(75,'LV','LATVIA',126,6),(76,'MY','MALAYSIA',0,5),(77,'NI','NICARAGUA',155,5),(78,'NL','PAISES BAJOS',156,2),(79,'NZ','NEW ZEALAND',161,5),(80,'PA','PANAMA',163,5),(81,'PE','PERU',164,5),(82,'PL','POLONIA',14,6),(83,'PT','PORTUGAL',173,5),(84,'RO','RUMANIA',44,5),(85,'RU','RUSSIAN FEDERATION',179,5),(86,'SE','SWEDEN',185,5),(87,'TR','TURKEY',16,5),(88,'UA','UKRAINE',216,5),(89,'US','UNITED STATES OF AMERICA',220,5),(90,'UY','URUGUAY',221,5),(91,'UZ','UZBEKISTAN',16,6),(92,'VE','VENEZUELA',225,5),(115,'KENI','KENI',1,1),(118,'KENI2','KENI',1,3);
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
  `id_tipo_carga` int NOT NULL AUTO_INCREMENT,
  `tipo_carga` varchar(45) NOT NULL,
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
  `id_tipo_embalaje` int NOT NULL AUTO_INCREMENT,
  `tipo_embajale` varchar(45) NOT NULL,
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
  `id_tipo_embarque` int NOT NULL AUTO_INCREMENT,
  `codigo_embarque` varchar(45) NOT NULL,
  `descripcion` text,
  `id_tipo_carga` int NOT NULL,
  `id_tipo_embalaje` int NOT NULL,
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

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass` varchar(60) NOT NULL,
  `pic` blob,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'kennyp2233','kenny.pinchao@epn.edu.ec','$2b$10$BVhU9F4Ha/mxoRjuHkNMR.r2he6DcIDdKjR.jgpZ5THuLVGq35.te',NULL),(2,'jorgeluis','jorgeluis41234@gmail.com','$2b$10$phSw1B1CJBbI1eO2zWdwSO.q1ufDpkmhinemz9NUcsAhoJny622Iq',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 13:05:54

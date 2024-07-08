-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: experts_db
-- ------------------------------------------------------
-- Server version	8.0.38

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
  `nombre` varchar(255) NOT NULL,
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
  `nombre` varchar(255) DEFAULT NULL,
  `ci_ruc` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `contacto` varchar(255) DEFAULT NULL,
  `id_modo` int DEFAULT NULL,
  `maestra_guias_hijas` tinyint(1) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `prefijo_awb` varchar(255) DEFAULT NULL,
  `codigo_cae` varchar(255) DEFAULT NULL,
  `estado_activo` tinyint(1) DEFAULT '1',
  `from1` int DEFAULT NULL,
  `to1` int DEFAULT NULL,
  `by1` int DEFAULT NULL,
  `to2` int DEFAULT NULL,
  `by2` int DEFAULT NULL,
  `to3` int DEFAULT NULL,
  `by3` int DEFAULT NULL,
  `afiliado_cass` tinyint(1) DEFAULT '0',
  `guias_virtuales` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_aerolinea`),
  UNIQUE KEY `contacto_UNIQUE` (`contacto`),
  KEY `fk_a_origenes_idx` (`from1`),
  KEY `fk_a_a1_idx` (`by1`),
  KEY `fk_a_a2_idx` (`by2`),
  KEY `fk_a_a3_idx` (`by3`),
  KEY `fk_a_destino1_idx` (`to1`),
  KEY `fk_a_destino2_idx` (`to2`),
  KEY `fk_a_destino3_idx` (`to3`),
  KEY `fk_a_modo_idx` (`id_modo`),
  CONSTRAINT `aerolineas_ibfk_1` FOREIGN KEY (`id_modo`) REFERENCES `catalogo_modo_aerolinea` (`id_modo`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_2` FOREIGN KEY (`from1`) REFERENCES `origenes` (`id_origen`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_3` FOREIGN KEY (`to1`) REFERENCES `destinos` (`id_destino`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_4` FOREIGN KEY (`by1`) REFERENCES `aerolineas` (`id_aerolinea`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_5` FOREIGN KEY (`to2`) REFERENCES `destinos` (`id_destino`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_6` FOREIGN KEY (`by2`) REFERENCES `aerolineas` (`id_aerolinea`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_7` FOREIGN KEY (`to3`) REFERENCES `destinos` (`id_destino`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_ibfk_8` FOREIGN KEY (`by3`) REFERENCES `aerolineas` (`id_aerolinea`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas`
--

LOCK TABLES `aerolineas` WRITE;
/*!40000 ALTER TABLE `aerolineas` DISABLE KEYS */;
INSERT INTO `aerolineas` VALUES (1,'ACG AIR CARGO GERMANY','1792402956001','GEBÄUDE 1335||D-55483 HAHN AIRPORT||GERMANY||','496543508462','',NULL,'GERMANY',NULL,1,1,'6U','730','6807',1,1,1,1,1,1,1,1,0,0);
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
  `costo_guia_abrv` varchar(255) DEFAULT NULL,
  `combustible_abrv` varchar(255) DEFAULT NULL,
  `seguridad_abrv` varchar(255) DEFAULT NULL,
  `aux_calculo_abrv` varchar(255) DEFAULT NULL,
  `iva_abrv` varchar(255) DEFAULT NULL,
  `otros_abrv` varchar(255) DEFAULT NULL,
  `aux1_abrv` varchar(255) DEFAULT NULL,
  `aux2_abrv` varchar(255) DEFAULT NULL,
  `costo_guia_valor` float DEFAULT NULL,
  `combustible_valor` float DEFAULT NULL,
  `seguridad_valor` float DEFAULT NULL,
  `aux_calculo_valor` float DEFAULT NULL,
  `otros_valor` float DEFAULT NULL,
  `aux1_valor` float DEFAULT NULL,
  `aux2_valor` float DEFAULT NULL,
  `plantilla_guia_madre` varchar(255) DEFAULT NULL,
  `plantilla_formato_aerolinea` varchar(255) DEFAULT NULL,
  `plantilla_reservas` varchar(255) DEFAULT NULL,
  `tarifa_rate` float DEFAULT NULL,
  `pca` float DEFAULT NULL,
  `combustible_mult` int DEFAULT NULL,
  `seguridad_mult` int DEFAULT NULL,
  `aux_calc_mult` int DEFAULT NULL,
  `iva_valor` float DEFAULT NULL,
  PRIMARY KEY (`id_aerolinea`),
  KEY `fk_a_c_p_mult_idx` (`combustible_mult`),
  KEY `fk_a_c_p_mult1_idx` (`seguridad_mult`),
  KEY `fk_a_c_p_mult2_idx` (`aux_calc_mult`),
  CONSTRAINT `aerolineas_codigos_plantillas_ibfk_1` FOREIGN KEY (`combustible_mult`) REFERENCES `catalogo_multiplicador_aerolinea` (`id_multiplicador`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_codigos_plantillas_ibfk_2` FOREIGN KEY (`seguridad_mult`) REFERENCES `catalogo_multiplicador_aerolinea` (`id_multiplicador`) ON UPDATE CASCADE,
  CONSTRAINT `aerolineas_codigos_plantillas_ibfk_3` FOREIGN KEY (`aux_calc_mult`) REFERENCES `catalogo_multiplicador_aerolinea` (`id_multiplicador`) ON UPDATE CASCADE,
  CONSTRAINT `fk_a_c_p` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aerolineas_codigos_plantillas`
--

LOCK TABLES `aerolineas_codigos_plantillas` WRITE;
/*!40000 ALTER TABLE `aerolineas_codigos_plantillas` DISABLE KEYS */;
INSERT INTO `aerolineas_codigos_plantillas` VALUES (1,'AWC','FSC','SCC','',NULL,NULL,NULL,NULL,15,1.28,NULL,NULL,NULL,NULL,NULL,'GMFFF730',NULL,NULL,NULL,NULL,1,1,1,NULL);
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
  `codigo_aduana` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
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
-- Table structure for table `catalogo_modo_aerolinea`
--

DROP TABLE IF EXISTS `catalogo_modo_aerolinea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_modo_aerolinea` (
  `id_modo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_modo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_modo_aerolinea`
--

LOCK TABLES `catalogo_modo_aerolinea` WRITE;
/*!40000 ALTER TABLE `catalogo_modo_aerolinea` DISABLE KEYS */;
INSERT INTO `catalogo_modo_aerolinea` VALUES (1,'EN PIEZAS'),(2,'FULLS');
/*!40000 ALTER TABLE `catalogo_modo_aerolinea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_multiplicador_aerolinea`
--

DROP TABLE IF EXISTS `catalogo_multiplicador_aerolinea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_multiplicador_aerolinea` (
  `id_multiplicador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_multiplicador`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_multiplicador_aerolinea`
--

LOCK TABLES `catalogo_multiplicador_aerolinea` WRITE;
/*!40000 ALTER TABLE `catalogo_multiplicador_aerolinea` DISABLE KEYS */;
INSERT INTO `catalogo_multiplicador_aerolinea` VALUES (1,'GROSS WEIGHT'),(2,'CHARGEABLE WEIGHT');
/*!40000 ALTER TABLE `catalogo_multiplicador_aerolinea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_productos_s_c`
--

DROP TABLE IF EXISTS `catalogo_productos_s_c`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_productos_s_c` (
  `id_opcion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_opcion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_productos_s_c`
--

LOCK TABLES `catalogo_productos_s_c` WRITE;
/*!40000 ALTER TABLE `catalogo_productos_s_c` DISABLE KEYS */;
INSERT INTO `catalogo_productos_s_c` VALUES (1,'SIMPLE'),(2,'COMPUESTO');
/*!40000 ALTER TABLE `catalogo_productos_s_c` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_productos_unidad_medida`
--

DROP TABLE IF EXISTS `catalogo_productos_unidad_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_productos_unidad_medida` (
  `id_medida` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_medida`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_productos_unidad_medida`
--

LOCK TABLES `catalogo_productos_unidad_medida` WRITE;
/*!40000 ALTER TABLE `catalogo_productos_unidad_medida` DISABLE KEYS */;
INSERT INTO `catalogo_productos_unidad_medida` VALUES (1,'BUNCHES'),(2,'KG'),(3,'STEMS');
/*!40000 ALTER TABLE `catalogo_productos_unidad_medida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_tipo_documento`
--

DROP TABLE IF EXISTS `catalogo_tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_tipo_documento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_tipo_documento`
--

LOCK TABLES `catalogo_tipo_documento` WRITE;
/*!40000 ALTER TABLE `catalogo_tipo_documento` DISABLE KEYS */;
INSERT INTO `catalogo_tipo_documento` VALUES (1,'RUC'),(2,'CEDULA'),(3,'PASAPORTE'),(4,'CATASTRO'),(5,'OTROS');
/*!40000 ALTER TABLE `catalogo_tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_clientes` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `cliente_codigo_pais` varchar(45) DEFAULT NULL,
  `fitos_valor` decimal(10,2) DEFAULT NULL,
  `form_a` decimal(10,2) DEFAULT NULL,
  `transport` decimal(10,2) DEFAULT NULL,
  `termo` decimal(10,2) DEFAULT NULL,
  `mica` decimal(10,2) DEFAULT NULL,
  `handling` decimal(10,2) DEFAULT NULL,
  `cuenta_contable` varchar(45) DEFAULT NULL,
  `nombre_factura` varchar(45) DEFAULT NULL,
  `ruc_factura` varchar(45) DEFAULT NULL,
  `direccion_factura` varchar(45) DEFAULT NULL,
  `telefono_factura` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_clientes`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'ABBU FLOWER','9999999999999',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ALEKCEY',NULL,'MOSCOW RUSIA',NULL);
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
  CONSTRAINT `fk_c_embarcador` FOREIGN KEY (`id_embarcador`) REFERENCES `embarcadores` (`id_embarcador`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `consignee_documento` varchar(45) DEFAULT NULL,
  `consignee_siglas_pais` varchar(45) DEFAULT NULL,
  `notify_nombre` varchar(45) DEFAULT NULL,
  `notify_direccion` varchar(45) DEFAULT NULL,
  `notify_documento` varchar(45) DEFAULT NULL,
  `notify_siglas_pais` varchar(45) DEFAULT NULL,
  `hawb_nombre` varchar(45) DEFAULT NULL,
  `hawb_direccion` varchar(45) DEFAULT NULL,
  `hawb_documento` varchar(45) DEFAULT NULL,
  `hawb_siglas_pais` varchar(45) DEFAULT NULL,
  `consignee_tipo_documento` int DEFAULT NULL,
  `notify_tipo_documento` int DEFAULT NULL,
  `hawb_tipo_documento` int DEFAULT NULL,
  PRIMARY KEY (`id_consignatario`),
  KEY `fk_cae_sice_consignatrio_idx` (`id_consignatario`),
  KEY `fk_c_s_doc1_idx` (`consignee_tipo_documento`),
  KEY `fk_c_s_doc2_idx` (`notify_tipo_documento`),
  KEY `fk_c_s_doc3_idx` (`hawb_tipo_documento`),
  CONSTRAINT `fk_c_s_doc1` FOREIGN KEY (`consignee_tipo_documento`) REFERENCES `catalogo_tipo_documento` (`id_tipo_documento`),
  CONSTRAINT `fk_c_s_doc2` FOREIGN KEY (`notify_tipo_documento`) REFERENCES `catalogo_tipo_documento` (`id_tipo_documento`),
  CONSTRAINT `fk_c_s_doc3` FOREIGN KEY (`hawb_tipo_documento`) REFERENCES `catalogo_tipo_documento` (`id_tipo_documento`),
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
  `factura_nombre` varchar(45) DEFAULT NULL,
  `factura_ruc` varchar(45) DEFAULT NULL,
  `factura_direccion` text,
  `factura_telefono` varchar(45) DEFAULT NULL,
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
  `guia_h_consignee` varchar(45) DEFAULT NULL,
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
-- Table structure for table `consignatario_tipo_documento`
--

DROP TABLE IF EXISTS `consignatario_tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_tipo_documento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consignatario_tipo_documento`
--

LOCK TABLES `consignatario_tipo_documento` WRITE;
/*!40000 ALTER TABLE `consignatario_tipo_documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `consignatario_tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consignatario_transmision`
--

DROP TABLE IF EXISTS `consignatario_transmision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consignatario_transmision` (
  `id_consignatario` int NOT NULL,
  `consignee_nombre_trans` varchar(45) DEFAULT NULL,
  `consignee_direccion_trans` varchar(45) DEFAULT NULL,
  `consignee_ciudad_trans` varchar(45) DEFAULT NULL,
  `consignee_provincia_trans` varchar(45) DEFAULT NULL,
  `consignee_pais_trans` varchar(45) DEFAULT NULL,
  `consignee_eueori_trans` varchar(45) DEFAULT NULL,
  `notify_nombre_trans` varchar(45) DEFAULT NULL,
  `notify_direccion_trans` varchar(45) DEFAULT NULL,
  `notify_ciudad_trans` varchar(45) DEFAULT NULL,
  `notify_provincia_trans` varchar(45) DEFAULT NULL,
  `notify_pais_trans` varchar(45) DEFAULT NULL,
  `notify_eueori_trans` varchar(45) DEFAULT NULL,
  `hawb_nombre_trans` varchar(45) DEFAULT NULL,
  `hawb_direccion_trans` varchar(45) DEFAULT NULL,
  `hawb_ciudad_trans` varchar(45) DEFAULT NULL,
  `hawb_provincia_trans` varchar(45) DEFAULT NULL,
  `hawb_pais_trans` varchar(45) DEFAULT NULL,
  `hawb_eueori_trans` varchar(45) DEFAULT NULL,
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
  `codigo_destino` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `aeropuerto` varchar(255) DEFAULT NULL,
  `id_pais` int DEFAULT NULL,
  `sesa_id` varchar(255) DEFAULT NULL,
  `leyenda_fito` text,
  `cobro_fitos` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_destino`),
  KEY `fk_d_pais_idx` (`id_pais`),
  CONSTRAINT `destinos_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `id_embarcador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `ci` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `embarcador_codigo_pais` varchar(45) DEFAULT NULL,
  `handling` decimal(10,2) DEFAULT NULL,
  `estado` tinyint DEFAULT '1',
  PRIMARY KEY (`id_embarcador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `embarcadores`
--

LOCK TABLES `embarcadores` WRITE;
/*!40000 ALTER TABLE `embarcadores` DISABLE KEYS */;
INSERT INTO `embarcadores` VALUES (1,'A','1232','ASDA','0982372511','kenny.pinchao@epn.edu.ec','SANGOLQUÍ','PICHINCHA','ECUADOR','4',2.00,1);
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
  `codigo_origen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `aeropuerto` varchar(255) DEFAULT NULL,
  `id_pais` int NOT NULL,
  `id_cae_aduana` int NOT NULL,
  PRIMARY KEY (`id_origen`),
  KEY `fk_o_paises_idx` (`id_pais`),
  KEY `fk_o_cae_aduana_idx` (`id_cae_aduana`),
  CONSTRAINT `origenes_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `origenes_ibfk_2` FOREIGN KEY (`id_cae_aduana`) REFERENCES `cae_aduana` (`id_cae_aduana`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `siglas_pais` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `pais_id` int DEFAULT NULL,
  `id_acuerdo` int DEFAULT NULL,
  PRIMARY KEY (`id_pais`),
  UNIQUE KEY `siglas_pais_UNIQUE` (`siglas_pais`),
  UNIQUE KEY `siglas_pais` (`siglas_pais`),
  KEY `fk_p_acuerdo_idx` (`id_acuerdo`),
  CONSTRAINT `paises_ibfk_1` FOREIGN KEY (`id_acuerdo`) REFERENCES `acuerdos_arancelarios` (`id_acuerdo`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paises`
--

LOCK TABLES `paises` WRITE;
/*!40000 ALTER TABLE `paises` DISABLE KEYS */;
INSERT INTO `paises` VALUES (5,'AM','ARMENIA',14,5),(40,'AN','NETHERLANDS ANTILLES',8,5),(41,'AR','ARGENTINA',14,5),(42,'AU','AUSTRALIA',14,5),(43,'AZ','AZERBAIJAN',16,5),(44,'BA','BOSNIA AND HERZEGOVINA',17,5),(45,'BB','BARBADOS',18,5),(46,'BE','BELGICA',20,5),(47,'BO','BOLIVIA',28,5),(48,'BR','BRAZIL',29,5),(49,'BY','BELARUS',34,5),(50,'CA','CANADA',36,5),(51,'CH','SWITZERLAND',41,5),(52,'CL','REPUBLICA DE CHILE',44,5),(53,'CO','COLOMBIA',47,5),(54,'CR','COSTA RICA',48,5),(55,'CU','CUBA',49,5),(56,'CZ','CZECH REPUBLIC',53,5),(57,'DE','GERMANY',1112,5),(58,'EC','ECUADOR',1113,5),(59,'EE','ESTONIA',61,5),(60,'EG','EGYPT',62,5),(61,'ES','ESPAÑA',64,5),(62,'FR','FRANCE',71,6),(64,'GE','GEORGIA',74,5),(65,'HR','CROATIA',92,5),(66,'IT','ITALY',103,5),(67,'JP','JAPAN',106,5),(68,'KG','KYRGYZSTAN',108,5),(69,'KW','KUWAIT',115,5),(70,'KZ','KAZAKHSTAN',117,5),(71,'LT','LITUANIA',71,5),(74,'LU','LUXEMBOURG',126,5),(75,'LV','LATVIA',126,6),(76,'MY','MALAYSIA',0,5),(77,'NI','NICARAGUA',155,5),(78,'NL','PAISES BAJOS',156,2),(79,'NZ','NEW ZEALAND',161,5),(80,'PA','PANAMA',163,5),(81,'PE','PERU',164,5),(82,'PL','POLONIA',14,6),(83,'PT','PORTUGAL',173,5),(84,'RO','RUMANIA',44,5),(85,'RU','RUSSIAN FEDERATION',179,5),(86,'SE','SWEDEN',185,5),(87,'TR','TURKEY',16,5),(88,'UA','UKRAINE',216,5),(89,'US','UNITED STATES OF AMERICA',220,5),(90,'UY','URUGUAY',221,5),(91,'UZ','UZBEKISTAN',16,6),(92,'VE','VENEZUELA',225,5);
/*!40000 ALTER TABLE `paises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `codigo_producto` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre_botanico` varchar(255) DEFAULT NULL,
  `especie` varchar(255) DEFAULT NULL,
  `id_medida` int DEFAULT NULL,
  `precio_unitario` float DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `id_opcion` int DEFAULT NULL,
  `stems_por_full` int DEFAULT NULL,
  `id_sesa` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_p_unidad_medida_idx` (`id_medida`),
  KEY `fk_p_opcion_idx` (`id_opcion`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_medida`) REFERENCES `catalogo_productos_unidad_medida` (`id_medida`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_opcion`) REFERENCES `catalogo_productos_s_c` (`id_opcion`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (3,'A','AA','A','AA','A',1,1,1,1,1,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
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
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_carga`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_carga`
--

LOCK TABLES `tipo_carga` WRITE;
/*!40000 ALTER TABLE `tipo_carga` DISABLE KEYS */;
INSERT INTO `tipo_carga` VALUES (2,'CARGA GENERAL PELIGROSA'),(3,'CONSOLIDADA'),(4,'CONTENEDOR'),(5,'CONTENERIZADA PELIGROSA'),(6,'ESPECIAL'),(7,'GRANEL SOLIDO'),(8,'LIQUIDO'),(9,'OTROS TIPOS DE CARGA'),(10,'REFRIGERADA PELIGROSA'),(11,'REFRIGERADO'),(12,'VEHICULOS'),(13,'CARGA GENERAL');
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
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_embalaje`)
) ENGINE=InnoDB AUTO_INCREMENT=469 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_embalaje`
--

LOCK TABLES `tipo_embalaje` WRITE;
/*!40000 ALTER TABLE `tipo_embalaje` DISABLE KEYS */;
INSERT INTO `tipo_embalaje` VALUES (9,'AEROSOL'),(10,'AMPOLLA, PROTEGIDA'),(11,'AMPOLLA. SIN PROTEGER'),(12,'ANILLO'),(13,'ARCON'),(14,'ARCON MARINO'),(15,'ARMARIO ROPERO, MOVIL'),(16,'ATADO'),(17,'ATAUD'),(18,'ATOMIZADOR'),(19,'BALA, COMPRIMIDA'),(20,'BALA, SIN COMPRIMIR'),(21,'BALDE (BUCKET)'),(22,'BALÓN, PROTEGIDO'),(23,'BALON, SIN PROTEGER'),(24,'BANDEJA (TRAY) O PAQUETE DE BANDEJAS (TRAY PACK)'),(25,'BARRA'),(26,'BARRAS, EN HAZ/ATADO/FAJO'),(27,'BARRICA (BUTT)'),(28,'BARRIL (BARREL)'),(29,'BARRILETE (KEG)'),(30,'BARRILITO'),(31,'BAUL (TRUNCK)'),(32,'BOBINA (BOBBIN)'),(33,'BOBINA (COIL)'),(34,'BOBINA (SPINDLE)'),(35,'BOLSA'),(36,'BOLSA DE HOJAS SUPERPUESTAS'),(37,'BOLSITA (SACHET)'),(38,'BOMBONA DE GAS'),(39,'BOTE DE HOJALATA'),(40,'BOTELLA, PROTEGIDA, BULBOSA'),(41,'BOTELLA, PROTEGIDA, CILINDRICA'),(42,'BOTELLA, SIN PROTEGER, BULBOSA'),(43,'BOTELLA, SIN PROTEGER, CILINDRICA'),(44,'CAJA (BOX)'),(45,'CAJA (CASE)'),(46,'CAJA DE FOSFOROS'),(47,'CAJA-NIDO'),(48,'CAJETILLA'),(49,'CAJON'),(50,'CAJON ARMADO'),(51,'CAJON DE BOTELLAS, BOTELLERO'),(52,'CAJON DE CERVEZA'),(53,'CAJON DE FRUTA'),(54,'CAJON DE LECHE'),(55,'CAJON DE TE'),(56,'CAJON PLANO'),(57,'CANASTA'),(58,'CANTARO (PITCHER)'),(59,'CARRETE (REEL)'),(60,'CARTON'),(61,'CESTA (BASKET)'),(62,'CHAPA'),(63,'CHAPAS, EN HAZ/ATADO/FAJO'),(64,'CILINDRO'),(65,'COFRE (COFFER)'),(66,'COFRE (FOOTLOCKER)'),(67,'CUBA'),(68,'CUBA (CASK)'),(69,'CUBA (HOGSHEAD)'),(70,'CUBETA (PAIL)'),(71,'CUBO (BIN)'),(72,'CUBO (CUP)'),(73,'DAMAJUANA, PROTEGIDA'),(74,'DAMAJUANA, SIN PROTEGER'),(75,'ENVASADO AL VACIO'),(76,'ESTERA'),(77,'FAJOS (TRUSS)'),(78,'FARDO (PACKAGE)'),(79,'FRASCA'),(80,'FRASCO'),(81,'FUNDA'),(82,'GARRAFA, PROTEGIDA'),(83,'GARRAFA, SIN PROTEGER'),(84,'GAS LICUADO A GRANEL (A TEMPERATURA/PRESION ANORMALES)'),(85,'GAS, A GRANEL (A 1031 MBAR A 15 degrees C)'),(86,'HAZ (BUNDLE)'),(87,'HOJA'),(88,'HOJAS, EN HAZ/ATADO/FAJO'),(89,'JARRA (JUG)'),(90,'JAULA'),(91,'JAULA ABIERTA'),(92,'JERRICAN, RECTANGULAR'),(93,'JERRICAN,CILINDRICO'),(94,'LAMINA'),(95,'LAMINA DESLIZADORA (SLIPSHEET)'),(96,'LATA'),(97,'LATA, CILINDRICA'),(98,'LATA, RECTANGULAR'),(99,'LECHERA'),(100,'LINGOTE'),(101,'LINGOTES, EN HAZ/ATADO/FAJO'),(102,'LIQUIDO, A GRANEL'),(103,'LONA'),(104,'MALETA'),(105,'MARCO'),(106,'NASA'),(107,'PAQUETE (PARCEL)'),(108,'PELICULA PLASTICA (FILMPACK)'),(109,'PELICULA TERMORRETRACTIL'),(110,'RED (NET)'),(111,'ROLLO (BOLT)'),(112,'ROLLO (ROLL)'),(113,'SACO'),(114,'SACO DE PAREDES MULTIPLES'),(115,'SACO DE RED (REDNET)'),(116,'SACO DE YUTE'),(117,'SAQUITO (POUCH)'),(118,'SIN ENVASAR O SIN EMPAQUETAR'),(119,'SOBRE'),(120,'SOLIDO A GRANEL, PARTICULAS FINAS (POLVOS)'),(121,'SOLIDO A GRANEL, PARTICULAS GRANDES (NODULOS)'),(122,'SOLIDO A GRANEL, PARTICULAS GRANULARES (GRANOS)'),(123,'TABLA'),(124,'TABLA, EN HAZ/ATADO/FAJO'),(125,'TABLON'),(126,'TABLONES, EN HAZ/ATADO/FAJO O TUBOS (PIPES), EN HAZ/ATADO/FAJO'),(127,'TAMBOR'),(128,'TANQUE'),(129,'TANQUE, CILINDRICO'),(130,'TANQUE, RECTANGULAR'),(131,'TARRO'),(132,'TONEL'),(133,'TRONCO'),(134,'TRONCO, EN HAZ/ATADO/FAJO'),(135,'TUBO (PIPE)'),(136,'TUBO (TUBE)'),(137,'TUBO, PLEGABLE (TUBE, COLLAPSIBLE)'),(138,'TUBOS (TUBES), EN HAZ/ATADO/FAJO'),(139,'VARILLA'),(140,'VARILLAS, EN HAZ/ATADO/FAJO'),(141,'VASIJA'),(142,'VIGA'),(143,'VIGA, EN HAZ/ATADO/FAJO'),(144,'BOTELLA ENFUNDADA'),(145,'BIDONES'),(146,'BOBINAS'),(147,'BOLSAS'),(148,'BOTELLAS'),(149,'BULLET(BALAS)'),(150,'BULTOS'),(151,'CARTONES'),(152,'CILINDROS'),(153,'COMPLETELY KNOCK DOWN (CKD)'),(154,'NUMERO DE UNIDADES(UNIDAD JUNAC)'),(155,'CONTENEDOR'),(156,'CUBETA'),(157,'FARDOS'),(158,'GRANEL'),(159,'JABAS'),(160,'LOTES'),(161,'PALETAS (PALLETES O PARIHUELAS)'),(162,'PAQUETES'),(163,'PLATAFORMAS'),(164,'POTES'),(165,'ROLLOS(JUMBOS)'),(166,'MODULOS'),(167,'BAUL'),(168,'SACOS(UNIDAD JUNAC)'),(169,'BARRIL'),(170,'CAJAS(UNIDAD JUNAC)'),(171,'TARIMA'),(172,'ARCAS'),(173,'BALDES'),(174,'FURGON'),(175,'ENVASE'),(176,'FUNDAS'),(177,'BULTO EN CONTAINER'),(178,'CUNETES'),(179,'CANECAS'),(180,'JAULAS'),(181,'CUBAS'),(182,'BULTO SECO'),(183,'GARRAFA'),(184,'DAMAJUANA'),(185,'RASTRAS'),(186,'CONTEINER VACIO'),(187,'SOBRES'),(188,'CABEZA DE GANADO'),(189,'CABEZA DE PORCINO'),(190,'HUACALES'),(191,'TONELES'),(192,'BULTO LIQUIDO'),(193,'LINGUETES'),(194,'LENIA'),(195,'SUELTO'),(196,'EQUIPAJE'),(197,'LIFTVANS'),(198,'CONTENEDOR ABIERTO'),(199,'VARIOS'),(200,'PIEZA'),(201,'POMAS'),(202,'VEHICULO PRIVADO'),(203,'PARIHUELA'),(204,'CARRETES'),(205,'ROLL/ON OFF'),(206,'CARNE DE GANADO'),(207,'VARREDERAS'),(208,'CARRETE'),(209,'JERGONES'),(210,'TUBO'),(211,'ARCON'),(212,'TANQUES'),(213,'UNIDAD'),(214,'CHANCLETAS'),(215,'VANS'),(216,'VEHICULO'),(217,'VAN EMPAQUETADO'),(218,'TAMBORES DRUM'),(219,'ATADOS'),(220,'RACIMOS DE VERDE'),(221,'KILOVATIO HORA POR 10**3 (1000 KWH) O KILOVATIO HORA POR 10**6'),(222,'KILOVATIO HORA'),(223,'ATADOS'),(224,'BIDONES'),(225,'BOBINAS'),(226,'BOLSAS'),(227,'BOTELLAS'),(228,'BULLET (BALAS)'),(229,'BULTOS'),(230,'CARTONES'),(231,'CILINDROS / LATAS'),(232,'COMPLETELY KNOCK DOWN (CKD)'),(233,'NUMERO DE UNIDADES (UNIDAD JUNAC)'),(234,'CONTENEDOR'),(235,'CUBETA'),(236,'FARDOS'),(237,'GRANEL'),(238,'JABAS'),(239,'LOTES'),(240,'PALETAS (PALLETES O PARIHUELAS)'),(241,'PAQUETES'),(242,'PLATAFORMAS'),(243,'POTES'),(244,'ROLLOS (JUMBOS)'),(245,'MODULOS'),(246,'BAUL'),(247,'SACOS (UNIDAD JUNAC)'),(248,'BARRIL'),(249,'CAJAS (UNIDAD JUNAC)'),(250,'CARRETES'),(251,'CANECAS'),(252,'CUNETES'),(253,'DAMAJUANA'),(254,'FURGON'),(255,'FUNDAS'),(256,'GARRAFA'),(257,'HUACALES'),(258,'JERGONES'),(259,'JAULAS'),(260,'LINGUETES'),(261,'LIFTVANS'),(262,'PARIHUELA'),(263,'POMAS'),(264,'PIEZA'),(265,'ROLL/ON-OFF'),(266,'RASTRAS'),(267,'SOBROS'),(268,'TAMBORES'),(269,'TONELES'),(270,'TANQUES'),(271,'UNIDAD'),(272,'VARADERAS'),(273,'BALDES'),(274,'CANVAS/LONA'),(275,'SIN CORRELACION DE EMBALAJE'),(276,'ARMARIO ROPERO, MOVIL'),(277,'BANDEJA DE MADERA, DE UN NIVEL SIN TAPA'),(278,'BANDEJA DE MADERA, DE DOS NIVELES SIN TAPA'),(279,'BANDEJA DE PLASTICO DE DOS NIVELES SIN TAPA'),(280,'BANDEJA DE POLIESTIRENO DE UN NIVEL SIN TAPA'),(281,'BANDEJA PLASTICO DE UN NIVEL SIN TAPA'),(282,'BANDEJA, DE CARTON, DE DOS NIVELES, SIN TAPA'),(283,'BANDEJA, DE CARTON, DE UN NIVEL, SIN TAPA'),(284,'BARRENO'),(285,'BIDON DE ACERO'),(286,'BIDON DE ACERO PARTE SUPERIOR FIJA'),(287,'BIDON DE ACERO PARTE SUPERIOR REMOVIBLE'),(288,'BIDON DE ALUMINIO'),(289,'BIDON DE ALUMINIO PARTE SUPERIOR FIJA'),(290,'BIDON DE ALUMINIO PARTE SUPERIOR REMOVIBLE'),(291,'BIDON DE CARTON'),(292,'BIDON DE CONTRACHAPADO'),(293,'BIDON DE HIERRO'),(294,'BIDON DE MADERA'),(295,'BIDON DE PLASTICO'),(296,'BIDON DE PLASTICO PARTE SUPERIOR FIJA'),(297,'BIDON DE PLASTICO PARTE SUPERIOR REMOVIBLE'),(298,'BLISTER DOBLE'),(299,'CAJA CHEP (COMMONWEALTH HANDLING QUIPMENT POOL) EUROBOX'),(300,'CAJA CON BASE DE PALETA'),(301,'CAJA CON BASE DE PALETA DE MADERA'),(302,'CAJA CON BASE DE PALETA DE METAL'),(303,'CAJA CON BASE PALETA DE PLASTICO'),(304,'CAJA CON BASES DE PALETA DE CARTON'),(305,'CAJA DE ACERO'),(306,'CAJA DE ALUMINO'),(307,'CAJA DE CARTON PARA GRANELES'),(308,'CAJA DE CONTRACHAPADO'),(309,'CAJA DE MADERA DE PANELES ESTANCOS AL POLVO'),(310,'CAJA DE MADERA MULTICAPA'),(311,'CAJA DE MADERA NATURAL'),(312,'CAJA DE MADERA ORDINARIA'),(313,'CAJA DE MADERA RECONSTRUIDA'),(314,'CAJA DE PANELES DE FIBRA'),(315,'CAJA DE PLASTICO'),(316,'CAJA DE PLASTICO EXPANDIDO'),(317,'CAJA DE PLASTICO RIGIDO'),(318,'CAJA ISOTERMICA'),(319,'CAJA PARA LIQUIDOS'),(320,'CAJON DE ACERO'),(321,'CAJON DE CARTON MULTICAPA'),(322,'CAJON DE MADERA PARA GRANELES'),(323,'CAJON DE PLASTICO MULTICAPA'),(324,'CAJON DE PLASTICO PARA GRANELES'),(325,'CANASTILLA'),(326,'CAPSULA'),(327,'CARRETE'),(328,'CARTA (CARD)'),(329,'CARTUCHO'),(330,'CELDA SIN TECHO PARA TRANSPORTE DE ANIMALES'),(331,'CESTO CON ASA DE CARTON'),(332,'CESTO CON ASA DE MADERA'),(333,'CESTO CON ASA DE PLASTICO'),(334,'COFRE PEQUENO (FOOTLOCKER)'),(335,'CONO'),(336,'CONTENEDOR (LIFTVAN)'),(337,'CONTENEDOR DE TIPO VANPACK'),(338,'CONTENEDOR NO ESPECIFICADO EXCEPTO COMO EQUIPO DE TRANSPORTE'),(339,'CUBA CON TAPA'),(340,'CUBA MEDIUANA'),(341,'DEFINICION COMUN'),(342,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON BIDON EXTERIOR DE ACERO'),(343,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON BIDON EXTERIOR DE ALUMINIO'),(344,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON BIDON EXTERIOR DE CARTON'),(345,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON BIDON EXTERIOR DE CONTRACHAPADO'),(346,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON BIDON EXTERIOR DE MADERA'),(347,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON BIDON EXTERIOR DE PLASTICO RIGIDO'),(348,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON CAJA EXTERIOR DE CONTACHAPADO'),(349,'EMBALAJE COMPUESTO, RECIPIENTE DE PLASTICO CON CAJA EXTERIOR DE PLASTICO'),(350,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON BIDON DE ALUMINIO'),(351,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON BIDON EXTERIOR CONTRACHAPADO'),(352,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON BIDON EXTERIOR DE CARTON'),(353,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON CAJA EXTERIOR DE ACERO'),(354,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON CAJA EXTERIOR DE ALUMINIO'),(355,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON CAJA EXTERIOR DE CARTON'),(356,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON CAJA EXTERIOR DE MADERA'),(357,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON CESTO DE MIMBRE'),(358,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON EMBALAJE EXTERIOR DE PLASTICO EXPANDIDO'),(359,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON EMBALAJE EXTERIOR DE PLASTICO RIGIDO'),(360,'EMBALAJE COMPUESTO, RECIPIENTE DE VIDRIO CON VIDON EXTERIOR DE ACERO'),(361,'EMBALAJE DE CARTON CON ORIFICIOS DE PRENSION'),(362,'EMBALAJE DE VENTANA'),(363,'EMBALAJE EXPOSITOR DE CARTON'),(364,'EMBALAJE EXPOSITOR DE MADERA'),(365,'EMBALAJE EXPOSITOR DE METAL'),(366,'EMBALAJE EXPOSITOR DE PLASTICO'),(367,'EMBALAJE FORRADO DE PAPEL'),(368,'EMBALAJE TUBULAR'),(369,'ENVASE COMPUESTO DE RECIPIENTE DE VIDRIO'),(370,'ENVASE COMPUESTO RECIPIENTE DE PLASTICO'),(371,'ENVASE PARA ALIMENTOS (FOODTAINER)'),(372,'ESTANTE'),(373,'FUNDA DE ACERDO'),(374,'GENERADOR DE AEROSOL'),(375,'HOJA REVESTIMIENTO DE PLASTICO'),(376,'JAULA CHEP (COMMONWELTH HANDLING EQUIPMENT POOL)'),(377,'JAULA/BIDON DESLIZANTE'),(378,'JERRICAM DE ACERO PARTE SUPERIOR AMOVIBLE'),(379,'JERRICAN DE ACERO'),(380,'JERRICAN DE ACERO PARTE SUPERIOR FIJA'),(381,'JERRICAN DE PLASTICO'),(382,'JERRICAN DE PLASTICO PARTE SUPERIOR AMOVIBLE'),(383,'JERRICAN DE PLASTICO PARTE SUPERIOR FIJA'),(384,'LAMINA CALANDRADA (SLAB)'),(385,'LATA CON ASA Y PICO'),(386,'LOTE'),(387,'MANGA'),(388,'NO EMBALADO NI ACONDICIONADO UNIDAD UNICA'),(389,'NO EMBALADO NI ACONDICIONADO VARIAS UNIDADES'),(390,'NO ENJAULADO (ANIMAL)'),(391,'PALETA'),(392,'PALETA CAJA (POLLET BOX)'),(393,'PALETA MODULAR, ANILLOS DE 80 X 120'),(394,'PALETA MODULAR, AROS DE 80 X 200 CM'),(395,'PALETA MODULKAR, ANILLOS DE 80 X 60 CM'),(396,'PALETA, 200X 220 CM'),(397,'PALETA, FUNDA TERMORETRACTIL'),(398,'PATIN, RAMPA (SKID)'),(399,'RECIPIENTE DE CARTON'),(400,'RECIPIENTE DE MADERA'),(401,'RECIPIENTE DE METAL'),(402,'RECIPIENTE DE PAPEL'),(403,'RECIPIENTE DE VIDRIO'),(404,'RECIPIENTE FORRADO DE PLASTICO'),(405,'RECIPIENTE INTERMEDIO DE MATERIAL COMPUESTO CON RECIPIENTE INTERIOR DE PLASTICO FLEXIBLE PRESURIZADO'),(406,'RECIPIENTE INTERMEDIO DE MATERIAL COMPUESTO CON RECIPIENTE INTERIOR DE PLASTICO RIGIDO PRESURIZADO'),(407,'RECIPIENTE INTERMEDIO PARA GRANELES'),(408,'RECIPIENTE INTERMEDIO PARA GRANELES CONTRACHAPADO'),(409,'RECIPIENTE INTERMEDIO PARA GRANELES CONTRACHAPADO CON FORRO'),(410,'RECIPIENTE INTERMEDIO PARA GRANELES DE ACERO'),(411,'RECIPIENTE INTERMEDIO PARA GRANELES DE ACERO PARA PRESIONES SUPERIORES A 10 KPA (0,1 BAR)'),(412,'RECIPIENTE INTERMEDIO PARA GRANELES DE CARTON'),(413,'RECIPIENTE INTERMEDIO PARA GRANELES DE MADERA'),(414,'RECIPIENTE INTERMEDIO PARA GRANELES DE MADERA CON FORRO'),(415,'RECIPIENTE INTERMEDIO PARA GRANELES DE MADERA RECONSTRUIDA'),(416,'RECIPIENTE INTERMEDIO PARA GRANELES DE MADERA RECONSTRUIDA CON FORRO'),(417,'RECIPIENTE INTERMEDIO PARA GRANELES DE MATERIAL COMPUESTO'),(418,'RECIPIENTE INTERMEDIO PARA GRANELES DE METAL DISTINTO DEL ACERO'),(419,'RECIPIENTE INTERMEDIO PARA GRANELES DE PAPEL MULTICAPA'),(420,'RECIPIENTE INTERMEDIO PARA GRANELES DE PAPEL MULTICAPA HIDROFUGO'),(421,'RECIPIENTE INTERMEDIO PARA GRANELES DE PELICULA PLASTICA'),(422,'RECIPIENTE INTERMEDIO PARA GRANELES DE PLASTICO RIGIDO'),(423,'RECIPIENTE INTERMEDIO PARA GRANELES DE PLASTICO RIGIDO CON ELEMENTOS ESTRUCTURALES'),(424,'RECIPIENTE INTERMEDIO PARA GRANELES DE PLASTICO RIGIDO CON ELEMENTOS ESTRUCTURALES PRESURIZADO'),(425,'RECIPIENTE INTERMEDIO PARA GRANELES DE PLASTICO RIGIDO EXENTO PRESURIZADO'),(426,'RECIPIENTE INTERMEDIO PARA GRANELES DE TEJIDO DE PLASTICO CON FORRO'),(427,'RECIPIENTE INTERMEDIO PARA GRANELES DE TEJIDO DE PLASTICO CON REVESTIMIENTO INTERIOR'),(428,'RECIPIENTE INTERMEDIO PARA GRANELES DE TEJIDO DE PLASTICO CON REVESTIMIENTO INTERIOR Y FORRO'),(429,'RECIPIENTE INTERMEDIO PARA GRANELES DE TEJIDO DE PLASTICO SIN REVESTIMIENTO INTERIOR NI FORRO'),(430,'RECIPIENTE INTERMEDIO PARA GRANELES DE TELA CON FORRO'),(431,'RECIPIENTE INTERMEDIO PARA GRANELES DE TELA CON REVESTIMIENTO INTERIOR'),(432,'RECIPIENTE INTERMEDIO PARA GRANELES DE TELA CON REVESTIMIENTO INTERIOR Y FORRO'),(433,'RECIPIENTE INTERMEDIO PARA GRANELES DE TELA SIN REVESTIMIENTO INTERIOR NI FORRO'),(434,'RECIPIENTE INTERMEDIO PARA GRANELES FLEXIBLES'),(435,'RECIPIENTE INTERMEDIO PARA GRANELES LIQUIDOS DE ACERO'),(436,'RECIPIENTE INTERMEDIO PARA GRANELES LIQUIDOS DE ALUMINIO'),(437,'RECIPIENTE INTERMEDIO PARA GRANELES LIQUIDOS DE PLASTICO RIGIDO EXENTO'),(438,'RECIPIENTE INTERMEDIO PARA GRANELES LIQUIDOS METALICO'),(439,'RECIPIENTE INTERMEDIO PARA GRANELES METALICOS'),(440,'RECIPIENTE INTERMEDIO PARA GRANELES METALICOS PARA PRESIONES SUPERIORES A 10 KPA (0,1 BAR)'),(441,'RECIPIENTE INTERMEDIO PARA GRANELES SOLIDOS DE MATERIAL COMPUESTO DE PLASTICO FLEXIBLE'),(442,'RECIPIENTE INTERMEDIO PARA GRANELES SOLIDOS DE PLASTICOS RIGIDO CON ELEMENTOS ESTRUCTURALES'),(443,'RECIPIENTE INTERMEDIO PARA GRANELES SOLIDOS DE PLASTICOS RIGIDO EXENTO'),(444,'RECIPIENTE INTERMEDIO PARA GRANELES DE ALUMINIO'),(445,'RECIPIENTE INTERMEDIO PARA GRANELES DE ALUMINIO PARA PRESIONES SUPERIORES A 10 KPA (0,1 BAR)'),(446,'RECIPIENTE PLASTICO'),(447,'RED TUBULAR DE PLASTICO'),(448,'RED TUBULAR DE TELA'),(449,'SACO DE GRAN TAMANO'),(450,'SACO DE PAPEL'),(451,'SACO DE PAPEL MULTICAPA'),(452,'SACO DE PAPEL MULTICAPA HIDROFUGO'),(453,'SACO DE PELICULA DE PLASTICO'),(454,'SACO DE TEJIDO DE PLASTICO ESTANCO AL POLVO'),(455,'SACO DE TEJIDO DE PLASTICO HIDROFUGO'),(456,'SACO DE TEJIDO DE PLASTICO SIN REVESTIMIENTO INTERIOR NI FORRO'),(457,'SACO DE TEJIDO PLASTICO'),(458,'SACO DE TELA'),(459,'SACO DE TELA ESTANCO AL POLVO'),(460,'SACO DE TELA SIN REVESTIMIENTO NI FORRO'),(461,'SACO FLEXIBLE'),(462,'SIN OBJETO'),(463,'SURTIDO'),(464,'TONEL DE MADERA'),(465,'TONEL DE MADERA CON BITOQUE'),(466,'TONEL DE MAERA DE PARTE SUPERIOR FIJA'),(467,'TUBO CON BOQUILLA'),(468,'TUBOS EN HAZ/ATADO/FAJO');
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
  `codigo_embarque` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `id_tipo_carga` int NOT NULL,
  `id_tipo_embalaje` int NOT NULL,
  `regimen` varchar(45) DEFAULT NULL,
  `mercancia` varchar(45) DEFAULT NULL,
  `harmonised_comidity` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_embarque`),
  KEY `fk_t_e_carga_idx` (`id_tipo_carga`),
  KEY `fk_t_e_embalaje_idx` (`id_tipo_embalaje`),
  CONSTRAINT `fk_t_e_embalaje` FOREIGN KEY (`id_tipo_embalaje`) REFERENCES `tipo_embalaje` (`id_tipo_embalaje`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_embarque`
--

LOCK TABLES `tipo_embarque` WRITE;
/*!40000 ALTER TABLE `tipo_embarque` DISABLE KEYS */;
INSERT INTO `tipo_embarque` VALUES (2,'ARMAS DE FUEGO','DISARMED FIREARMS\nNOT RESTRICTED',13,9,NULL,NULL,NULL),(3,'ARTESANIAS','ECUATORIAN HANDICRAFTS\nARRACHED DOCUMENTS\nNOT RESTRICTED',13,9,NULL,NULL,NULL),(4,'FLORES','FRESH FLOWERS\nPERISHABLES\nARRACHED DOCUMENTS',13,44,'40','FRESH FLOWERS',NULL);
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
  `usuario` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `pic` longblob,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `email` (`email`)
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

-- Dump completed on 2024-07-08  7:44:31

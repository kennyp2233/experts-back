"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const experts_db_1 = require("../db/experts.db");
class Aerolineas extends sequelize_typescript_1.Model {
}
/*
la tabla
'id_aerolinea', 'int', 'NO', 'PRI', NULL, 'auto_increment'
'nombre', 'varchar(50)', 'YES', '', NULL, ''
'alias', 'varchar(50)', 'YES', '', NULL, ''
'ci_ruc', 'varchar(14)', 'YES', '', NULL, ''
'direccion', 'text', 'YES', '', NULL, ''
'telefono', 'varchar(45)', 'YES', '', NULL, ''
'email', 'varchar(45)', 'YES', '', NULL, ''
'ciudad', 'varchar(45)', 'YES', '', NULL, ''
'pais', 'varchar(45)', 'YES', '', NULL, ''
'contacto', 'varchar(45)', 'YES', '', NULL, ''
'modo', 'varchar(45)', 'YES', '', NULL, ''
'maestra_guias_hijas', 'tinyint(1)', 'YES', '', NULL, ''
'codigo', 'varchar(45)', 'YES', '', NULL, ''
'prefijo_awb', 'varchar(45)', 'YES', '', NULL, ''
'codigo_cae', 'varchar(45)', 'YES', '', NULL, ''
'estado_activo', 'tinyint(1)', 'YES', '', NULL, ''

*/
Aerolineas.init({
    id_aerolinea: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    alias: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    ci_ruc: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    telefono: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    ciudad: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    pais: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    contacto: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    modo: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    maestra_guias_hijas: {
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false
    },
    codigo: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    prefijo_awb: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    codigo_cae: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    estado_activo: {
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: experts_db_1.sequelize,
    modelName: 'Aerolineas'
});
exports.default = Aerolineas;

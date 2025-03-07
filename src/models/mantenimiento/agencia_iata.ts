import { Model, DataTypes } from 'sequelize';
import { AgenciaIata, AgenciaIataAtributosCreacion } from '@typesApp/mantenimiento/agencia_iata.types';

import sequelize from '@db/experts.db';

const AgenciaIata = sequelize.define<Model<AgenciaIata, AgenciaIataAtributosCreacion>>('agencias_iata', {
    id_agencia_iata: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    alias_shipper: {
        type: DataTypes.STRING,
        unique: true,
    },
    nombre_shipper: {
        type: DataTypes.STRING,
    },
    ruc_shipper: {
        type: DataTypes.STRING(13),
    },
    direccion_shipper: {
        type: DataTypes.STRING,
    },
    telefono_shipper: {
        type: DataTypes.STRING,
    },
    ciudad_shipper: {
        type: DataTypes.STRING,
    },
    pais_shipper: {
        type: DataTypes.STRING,
    },
    nombre_carrier: {
        type: DataTypes.STRING,
    },
    ruc_carrier: {
        type: DataTypes.STRING,
    },
    direccion_carrier: {
        type: DataTypes.STRING,
    },
    telefono_carrier: {
        type: DataTypes.STRING,
    },
    ciudad_carrier: {
        type: DataTypes.STRING,
    },
    pais_carrier: {
        type: DataTypes.STRING,
    },
    iata_code_carrier: {
        type: DataTypes.STRING,
    },
    registro_exportador: {
        type: DataTypes.STRING,
    },
    codigo_operador: {
        type: DataTypes.STRING,
    },
    codigo_consolidador: {
        type: DataTypes.STRING,
    },
    comision: {
        type: DataTypes.DOUBLE,
    },
    estado_agencia_iata: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

export default AgenciaIata;
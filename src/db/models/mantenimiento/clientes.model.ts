import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { Cliente, ClienteCreationAttributes } from '@typesApp/entities/mantenimiento/ClientesTypes';

const Clientes = sequelize.define<Model<Cliente, ClienteCreationAttributes>>('clientes', {
    id_clientes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    codigo_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fitos_valor: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    form_a: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    transport: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    termo: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    mica: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    handling: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    cuenta_contable: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre_factura: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ruc_factura: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion_factura: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono_factura: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'clientes',
    freezeTableName: true,
});

export default Clientes;
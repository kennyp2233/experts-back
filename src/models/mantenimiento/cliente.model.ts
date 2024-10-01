import { Model, DataTypes } from 'sequelize';
import { Cliente, ClienteAtributosCreacion } from '@typesApp/mantenimiento/cliente.type';

import sequelize from 'src/config/experts.db';



const Cliente = sequelize.define<Model<Cliente, ClienteAtributosCreacion>>('clientes', {
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
    cliente_codigo_pais: {
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
});

export default Cliente;
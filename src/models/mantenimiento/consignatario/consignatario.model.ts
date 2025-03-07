import { Model, DataTypes } from 'sequelize';
import { Consignatario, ConsignatarioCreationAttributes } from '@typesApp/mantenimiento/consignatario/consignatario.type';

import sequelize from 'src/config/experts.db';

import Embarcador from '../embarcador.model';
import Cliente from '../cliente.model';

const Consignatarios = sequelize.define<Model<Consignatario, ConsignatarioCreationAttributes>>('consignatario', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_consignatario: {
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
    id_embarcador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Embarcador,
            key: Embarcador.primaryKeyAttribute,
        },
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: Cliente.primaryKeyAttribute,
        },
        onDelete: 'RESTRICT',
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

});

export default Consignatarios;
import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { Consignatario, ConsignatarioCreationAttributes } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

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
            model: 'embarcadores',
            key: 'id_embarcador',
        },
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id_clientes',
        },
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

}, {
    tableName: 'consignatario',
    freezeTableName: true,
});

export default Consignatarios;
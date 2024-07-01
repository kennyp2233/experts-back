import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { ConsignatarioTransmision } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

const ConsignatarioTransmisions = sequelize.define<Model<ConsignatarioTransmision>>('consignatario_transmision', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'consignatarios',
            key: 'id_consignatario',
        },
    },
    consignee_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_provincia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_eueori: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_provincia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_eueori: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_provincia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_eueori: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    tableName: 'consignatario_transmision',
    freezeTableName: true,
});

export default ConsignatarioTransmisions;
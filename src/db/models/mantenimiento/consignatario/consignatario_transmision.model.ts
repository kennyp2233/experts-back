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
    consignee_nombre_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_direccion_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_ciudad_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_provincia_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_pais_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_eueori_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_nombre_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_direccion_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_ciudad_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_provincia_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_pais_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_eueori_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_nombre_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_direccion_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_ciudad_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_provincia_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_pais_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_eueori_trans: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    tableName: 'consignatario_transmision',
    freezeTableName: true,
});

export default ConsignatarioTransmisions;
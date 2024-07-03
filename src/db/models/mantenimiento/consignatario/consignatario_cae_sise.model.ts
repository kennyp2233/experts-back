import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { ConsignatarioCaeSice } from '@typesApp/entities/mantenimiento/consignatario/ConsignatarioTypes';

const ConsignatarioCaeSices = sequelize.define<Model<ConsignatarioCaeSice>>('consignatario_cae_sice', {
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
    consignee_documento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_siglas_pais: {
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
    notify_documento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notify_siglas_pais: {
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
    hawb_documento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hawb_siglas_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    consignee_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tipo_documento',
            key: 'id_tipo_documento',
        }
    },
    notify_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tipo_documento',
            key: 'id_tipo_documento',
        }
    },
    hawb_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tipo_documento',
            key: 'id_tipo_documento',
        }
    },
}, {
    tableName: 'consignatario_cae_sice',
    freezeTableName: true,
});

export default ConsignatarioCaeSices;
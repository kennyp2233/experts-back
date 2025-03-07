import { Model, DataTypes } from 'sequelize';
import { ConsignatarioCaeSice } from '@typesApp/mantenimiento/consignatario/consignatario.type';

import sequelize from 'src/config/experts.db';

import Consignatarios from './consignatario.model';
import TipoDocumento from '@models/catalogos/consignatario/consignatario_tipo_documento.model';

const ConsignatarioCaeSices = sequelize.define<Model<ConsignatarioCaeSice>>('consignatario_cae_sice', {
    id_consignatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Consignatarios,
            key: Consignatarios.primaryKeyAttribute,
        },
        onDelete: 'CASCADE',
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
            model: TipoDocumento,
            key: TipoDocumento.primaryKeyAttribute,
        }
    },
    notify_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: TipoDocumento,
            key: TipoDocumento.primaryKeyAttribute,
        }
    },
    hawb_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: TipoDocumento,
            key: TipoDocumento.primaryKeyAttribute,
        }
    },
});

export default ConsignatarioCaeSices;
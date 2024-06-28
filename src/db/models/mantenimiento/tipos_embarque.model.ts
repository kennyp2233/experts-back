import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { TipoEmbarque, TipoEmbarqueCreationAttributes } from '@typesApp/entities/mantenimiento/TiposEmbarqueTypes';

const TiposEmbarque = sequelize.define<Model<TipoEmbarque, TipoEmbarqueCreationAttributes>>('tipo_embarque', {
    id_tipo_embarque: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_embarque: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_tipo_carga: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tipo_carga',
            key: 'id_tipo_carga',
        },
    },
    id_tipo_embalaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tipo_embalaje',
            key: 'id_tipo_embalaje',
        },
    },
    regimen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mercancia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    harmonised_comidity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        freezeTableName: true,
        tableName: 'tipo_embarque',
    });

export default TiposEmbarque;
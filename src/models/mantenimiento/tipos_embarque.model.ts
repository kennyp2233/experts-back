import { Model, DataTypes } from 'sequelize';
import { TipoEmbarque, TipoEmbarqueAtributosCreacion } from '@typesApp/mantenimiento/tipo_embarque.type';

import sequelize from '@db/experts.db';

import TipoCarga from '@models/catalogos/tipo_embarque/tipo_carga.model';
import TipoEmbalaje from '@models/catalogos/tipo_embarque/tipo_embalaje.model';

const TipoEmbarque = sequelize.define<Model<TipoEmbarque, TipoEmbarqueAtributosCreacion>>('tipo_embarque', {
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
            model: TipoCarga,
            key: TipoCarga.primaryKeyAttribute,
        },
    },
    id_tipo_embalaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: TipoEmbalaje,
            key: TipoEmbalaje.primaryKeyAttribute,
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
});

export default TipoEmbarque;
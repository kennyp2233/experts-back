import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { TipoEmbalaje, TipoEmbalajeCreationAttributes } from '@typesApp/entities/catalogos/tipo_embarque/TipoEmbalajeTypes';

const TipoEmbalaje = sequelize.define<Model<TipoEmbalaje, TipoEmbalajeCreationAttributes>>('tipo_embalaje', {
    id_tipo_embalaje: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    tableName: 'tipo_embalaje',
});

export default TipoEmbalaje;
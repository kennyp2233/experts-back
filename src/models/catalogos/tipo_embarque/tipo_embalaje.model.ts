import { Model, DataTypes } from 'sequelize';
import sequelize from 'src/config/experts.db';
import { TipoEmbalaje, TipoEmbalajeAtributosCreacion } from '@typesApp/catalogos/tipo_embarque/tipo_embalaje.type';

const TipoEmbalaje = sequelize.define<Model<TipoEmbalaje, TipoEmbalajeAtributosCreacion>>('tipo_embalaje', {
    id_tipo_embalaje: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TipoEmbalaje;
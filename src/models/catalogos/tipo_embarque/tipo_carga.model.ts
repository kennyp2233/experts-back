import { Model, DataTypes } from 'sequelize';
import sequelize from 'src/config/experts.db';
import { TipoCarga, TipoCargaAtributosCreacion } from '@typesApp/catalogos/tipo_embarque/tipo_carga.type';

const TipoCarga = sequelize.define<Model<TipoCarga, TipoCargaAtributosCreacion>>('tipo_carga', {
    id_tipo_carga: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TipoCarga;
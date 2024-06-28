import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { TipoCarga, TypoCargaCreationAttributes } from '@typesApp/entities/catalogos/tipo_embarque/TipoCargaType';

const TipoCarga = sequelize.define<Model<TipoCarga, TypoCargaCreationAttributes>>('tipo_carga', {
    id_tipo_carga: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    tableName: 'tipo_carga',
});

export default TipoCarga;
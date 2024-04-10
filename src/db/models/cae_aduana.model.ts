import { Model, DataTypes } from 'sequelize';
import sequelize from '../experts.db';
import { CaeAduanaCreationAttributes, CaeAduana } from '@typesApp/entities/CaeAduanaTypes';

const CaeAduanas = sequelize.define<Model<CaeAduana, CaeAduanaCreationAttributes>>('cae_aduana', {
    id_cae_aduana: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_aduana: {
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'cae_aduana',  // especifica explícitamente el nombre de la tabla
    freezeTableName: true,  // desactiva la pluralización automática
});

export default CaeAduanas;
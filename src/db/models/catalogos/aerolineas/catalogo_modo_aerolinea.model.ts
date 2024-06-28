import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../experts.db';

import { CatalogoModo, CatalogoModoCreationAttributes } from '@typesApp/entities/catalogos/aerolineas/CatalogoModo';

const CatalogoModoAerolinea = sequelize.define<Model<CatalogoModo, CatalogoModoCreationAttributes>>('catalogo_modo_aerolinea', {
    id_modo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'catalogo_modo_aerolinea',  // especifica explícitamente el nombre de la tabla
    freezeTableName: true,  // desactiva la pluralización automática
});

export default CatalogoModoAerolinea;
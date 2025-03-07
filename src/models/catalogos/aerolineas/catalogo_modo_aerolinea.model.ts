import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { CatalogoModo, CatalogoModoCreationAttributes } from '@typesApp/catalogos/aerolineas/catalogo_modo.type';

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
});

export default CatalogoModoAerolinea;
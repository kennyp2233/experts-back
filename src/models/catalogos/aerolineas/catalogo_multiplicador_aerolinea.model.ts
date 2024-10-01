import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { CatalogoMultiplicador, CatalogoMultiplicadorCreationAttributes } from '@typesApp/catalogos/aerolineas/catalogo_multiplicador.type';

const CatalogoMultiplicadorAerolinea = sequelize.define<Model<CatalogoMultiplicador, CatalogoMultiplicadorCreationAttributes>>('catalogo_multiplicador_aerolinea', {
    id_multiplicador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default CatalogoMultiplicadorAerolinea;
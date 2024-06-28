import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../experts.db';

import { CatalogoMultiplicador, CatalogoMultiplicadorCreationAttributes } from '@typesApp/entities/catalogos/aerolineas/CatalogoMultiplicadorTypes';

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
},
    {
        tableName: 'catalogo_multiplicador_aerolinea',  // especifica explícitamente el nombre de la tabla
        freezeTableName: true,  // desactiva la pluralización automática
    });

export default CatalogoMultiplicadorAerolinea;
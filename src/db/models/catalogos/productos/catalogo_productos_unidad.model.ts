import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../experts.db';

import { CatalogoProductosUnidad, CatalogoProductosUnidadCreationAttributes } from '@typesApp/entities/catalogos/productos/CatalogoProductosUnidadTypes';

const CatalogoProductosUnidad = sequelize.define<Model<CatalogoProductosUnidad, CatalogoProductosUnidadCreationAttributes>>('catalogo_productos_unidad_medida', {
    id_medida: {
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
        tableName: 'catalogo_productos_unidad_medida',  // especifica explícitamente el nombre de la tabla
        freezeTableName: true,  // desactiva la pluralización automática
    });

export default CatalogoProductosUnidad;

import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';

import { CatalogoProductosUnidad, CatalogoProductosUnidadCreationAttributes } from '@typesApp/catalogos/productos/catalogo_producto_unidad.type';

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

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../experts.db';

import { CatalogoProductoOpciones, CatalogoProductoOpcionesCreationAttributes } from '@typesApp/entities/catalogos/productos/CatalogoProductoOpcionesTypes';

const CatalogoProductoOpciones = sequelize.define<Model<CatalogoProductoOpciones, CatalogoProductoOpcionesCreationAttributes>>('catalogo_productos_s_c', {
    id_opcion: {
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
        tableName: 'catalogo_productos_s_c',  // especifica explícitamente el nombre de la tabla
        freezeTableName: true,  // desactiva la pluralización automática
    });

export default CatalogoProductoOpciones;
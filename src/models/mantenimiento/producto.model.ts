import { Model, DataTypes } from 'sequelize';
import { ProductoAtributosCreacion, Producto } from '@typesApp/mantenimiento/producto.type';

import sequelize from 'src/config/experts.db';

import CatalogoProductoOpciones from '@models/catalogos/productos/catalogo_productos_opciones.model';
import CatalogoProductosUnidad from '@models/catalogos/productos/catalogo_productos_unidad.model';

const Producto = sequelize.define<Model<Producto, ProductoAtributosCreacion>>('productos', {
    id_producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_producto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre_botanico: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_medida: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: CatalogoProductosUnidad,
            key: CatalogoProductosUnidad.primaryKeyAttribute
        },
    },
    precio_unitario: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    id_opcion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: CatalogoProductoOpciones,
            key: CatalogoProductoOpciones.primaryKeyAttribute
        },
    },
    stems_por_full: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_sesa: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default Producto;
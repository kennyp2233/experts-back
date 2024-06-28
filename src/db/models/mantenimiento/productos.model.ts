import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { ProductoCreationAttributes, Producto } from '@typesApp/entities/mantenimiento/ProductosTypes';

const Productos = sequelize.define<Model<Producto, ProductoCreationAttributes>>('productos', {
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
            model: 'catalogo_productos_unidad_medida',
            key: 'id_medida'
        }
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
            model: 'catalogo_productos_s_c',
            key: 'id_opcion'
        }
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

export default Productos;
import { Model, DataTypes } from 'sequelize';
import { ProductosMiProCreationAttributes, ProductosMiPro } from '@typesApp/mantenimiento/productos/producto_mi_pro.type';

import sequelize from 'src/config/experts.db';

import Producto from '../producto.model';
const ProductosMiPro = sequelize.define<Model<ProductosMiPro, ProductosMiProCreationAttributes>>('productos_mi_pro', {
    id_productos_mi_pro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: Producto.primaryKeyAttribute,
        },
        onDelete: 'CASCADE',
    },
    mipro_acuerdo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mipro_djocode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mipro_tariffcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default ProductosMiPro;
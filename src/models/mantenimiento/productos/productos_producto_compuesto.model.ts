import { Model, DataTypes } from 'sequelize';
import { ProductosCompuesto, ProductosCompuestoCreationAttributes } from '@typesApp/mantenimiento/productos/producto_compuesto.type';

import sequelize from 'src/config/experts.db';

import Producto from '../producto.model';

const ProductosCompuesto = sequelize.define<Model<ProductosCompuesto, ProductosCompuestoCreationAttributes>>('productos_producto_compuesto', {
    id_producto_compuesto: {
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
    producto_compuesto_destino: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    producto_compuesto_declaracion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
export default ProductosCompuesto;
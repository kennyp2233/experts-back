import { Model, DataTypes } from 'sequelize';
import { ProductosAranceles, ProductosArancelesCreationAttributes } from '@typesApp/mantenimiento/productos/producto_arancel.type';

import sequelize from 'src/config/experts.db';

import Producto from '../producto.model';

const ProductosAranceles = sequelize.define<Model<ProductosAranceles, ProductosArancelesCreationAttributes>>('productos_aranceles', {
    id_productos_aranceles: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: Producto.primaryKeyAttribute
        },
        onDelete: 'CASCADE',
    },
    aranceles_destino: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aranceles_codigo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    tableName: 'productos_aranceles',
});
export default ProductosAranceles;
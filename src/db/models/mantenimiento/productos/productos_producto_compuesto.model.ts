import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { ProductosCompuesto, ProductosCompuestoCreationAttributes } from '@typesApp/entities/mantenimiento/productos/ProductosCompuestoTypes';
const ProductosCompuesto = sequelize.define<Model<ProductosCompuesto, ProductosCompuestoCreationAttributes>>('productos_producto_compuesto', {
    id_producto_compuesto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'productos',
            key: 'id_producto'
        }
    },
    producto_compuesto_destino: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    producto_compuesto_declaracion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    tableName: 'productos_producto_compuesto',
});
export default ProductosCompuesto;
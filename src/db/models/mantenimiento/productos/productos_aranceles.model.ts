import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { ProductosAranceles, ProductosArancelesCreationAttributes } from '@typesApp/entities/mantenimiento/productos/ProductosArancelesTypes';
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
            model: 'productos',
            key: 'id_producto'
        }
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
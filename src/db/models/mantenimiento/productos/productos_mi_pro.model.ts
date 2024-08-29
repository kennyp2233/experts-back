import { Model, DataTypes } from 'sequelize';
import sequelize from '@db/experts.db';
import { ProductosMiProCreationAttributes, ProductosMiPro } from '@typesApp/entities/mantenimiento/productos/ProductosMiProTypes';
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
            model: 'productos',
            key: 'id_producto'
        }
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
}, {
    freezeTableName: true,
    tableName: 'productos_mi_pro',
});
export default ProductosMiPro;
import { Model, DataTypes } from "sequelize";
import { FincaProducto, FincaProductoCreationAttributes } from "@typesApp/mantenimiento/fincas/finca_producto.type";

import sequelize from "src/config/experts.db";

import Finca from "../finca.model";
import Producto from "../producto.model";

const FincaProductos = sequelize.define<Model<FincaProducto, FincaProductoCreationAttributes>>("fincas_productos", {
    id_fincas_productos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_finca: {
        type: DataTypes.INTEGER,
        references: {
            model: Finca,
            key: Finca.primaryKeyAttribute,
        },
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: Producto.primaryKeyAttribute,
        },
    },
});

export default FincaProductos;
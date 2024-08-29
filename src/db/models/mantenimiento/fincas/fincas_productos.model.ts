import { Model, DataTypes } from "sequelize";
import sequelize from "@db/experts.db";
import { FincaProducto, FincaProductoCreationAttributes } from "@typesApp/entities/mantenimiento/fincas/FincaProductosTypes";

const FincaProductos = sequelize.define<Model<FincaProducto, FincaProductoCreationAttributes>>("fincas_productos", {
    id_fincas_productos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_finca: {
        type: DataTypes.INTEGER,
        references: {
            model: "fincas",
            key: "id_finca",
        },
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: "productos",
            key: "id_producto",
        },
    },
});

export default FincaProductos;
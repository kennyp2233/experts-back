import { Model, DataTypes } from "sequelize";
import { Bodeguero, BodegueroAtributosCreacion } from "@typesApp/mantenimiento/bodegueros.type";

import sequelize from "@db/experts.db";

const Bodeguero = sequelize.define<Model<Bodeguero, BodegueroAtributosCreacion>>('bodegueros', {
    id_bodeguero: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    ci: {
        type: DataTypes.STRING(10)
    },
    clave_bodega: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default Bodeguero;
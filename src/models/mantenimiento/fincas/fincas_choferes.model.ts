import { Model, DataTypes } from "sequelize";
import { FincaChoferesCreationAttributes, FincaChoferes } from "@typesApp/mantenimiento/fincas/finca_chofer.type";

import sequelize from "src/config/experts.db";

import Finca from "../finca.model";
import Chofer from "../chofer.model";

const FincaChoferes = sequelize.define<Model<FincaChoferes, FincaChoferesCreationAttributes>>("fincas_choferes", {
    id_fincas_choferes: {
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
    id_chofer: {
        type: DataTypes.INTEGER,
        references: {
            model: Chofer,
            key: Chofer.primaryKeyAttribute,
        }
    },
});

export default FincaChoferes;
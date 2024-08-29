import { Model, DataTypes } from "sequelize";
import sequelize from "@db/experts.db";
import { FincaChoferesCreationAttributes, FincaChoferes } from "@typesApp/entities/mantenimiento/fincas/FincaChoferesTypes";

const FincaChoferes = sequelize.define<Model<FincaChoferes, FincaChoferesCreationAttributes>>("fincas_choferes", {
    id_fincas_choferes: {
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
    id_chofer: {
        type: DataTypes.INTEGER,
        references: {
            model: "choferes",
            key: "id_chofer",
        }
    },
});

export default FincaChoferes;
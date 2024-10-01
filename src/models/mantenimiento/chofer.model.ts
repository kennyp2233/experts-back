import { Model, DataTypes } from "sequelize";
import { Chofer, ChoferAtributosCreacion } from "@typesApp/mantenimiento/chofer.type";

import sequelize from "@db/experts.db";


const Chofer = sequelize.define<Model<Chofer, ChoferAtributosCreacion>>('choferes', {
    id_chofer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_chofer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ruc_chofer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placas_camion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono_chofer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    camion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado_chofer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

export default Chofer;
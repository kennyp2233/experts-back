import { Model, DataTypes } from "sequelize";
import sequelize from "@db/experts.db";
import { Chofer, ChoferCreationAttributes } from "@typesApp/entities/mantenimiento/ChoferTypes";

const Choferes = sequelize.define<Model<Chofer, ChoferCreationAttributes>>('choferes', {
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

export default Choferes;
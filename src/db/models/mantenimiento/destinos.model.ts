import { Destino, DestinoCreationAttributes } from "@typesApp/entities/mantenimiento/DestinoTypes";
import sequelize from "@db/experts.db";
import { Model, DataTypes } from "sequelize";
import Paises from "./paises.model";

const Destinos = sequelize.define<Model<Destino, DestinoCreationAttributes>>('destinos', {
    id_destino: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_destino: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    aeropuerto: {
        type: DataTypes.STRING,
    },
    id_pais: {
        type: DataTypes.INTEGER,
        references: {
            model: Paises,
            key: 'id_pais',
        },
    },
    sesa_id: {
        type: DataTypes.STRING,
    },
    leyenda_fito: {
        type: DataTypes.STRING,
    },
    cobro_fitos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Destinos;
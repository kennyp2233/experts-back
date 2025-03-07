import { Model, DataTypes } from "sequelize";
import { Destino, DestinoAtributosCreacion } from "@typesApp/mantenimiento/destino.type";

import sequelize from "src/config/experts.db";

import Paises from "./pais.model";

const Destino = sequelize.define<Model<Destino, DestinoAtributosCreacion>>('destinos', {
    id_destino: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_destino: {
        type: DataTypes.STRING,
        allowNull: true, // Cambiado de defaultValue: null
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true, // Cambiado de defaultValue: null
    },
    aeropuerto: {
        type: DataTypes.STRING,
    },
    id_pais: {
        type: DataTypes.INTEGER,
        references: {
            model: Paises,
            key: Paises.primaryKeyAttribute,
        },
        allowNull: true, // Agregado
    },
    sesa_id: {
        type: DataTypes.STRING,
    },
    leyenda_fito: {
        type: DataTypes.TEXT,
    },
    cobro_fitos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
export default Destino;
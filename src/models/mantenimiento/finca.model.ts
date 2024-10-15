import { Model, DataTypes } from "sequelize";
import { FincaAtributosCreacion, Finca } from "@typesApp/mantenimiento/finca.type";

import sequelize from "@db/experts.db";


import TipoDocumento from "@models/catalogos/consignatario/consignatario_tipo_documento.model";

const Finca = sequelize.define<Model<Finca, FincaAtributosCreacion>>("fincas", {
    id_finca: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_finca: {
        type: DataTypes.STRING,
    },
    codigo_finca: {
        type: DataTypes.STRING,
    },
    ruc_finca: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_tipo_documento: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoDocumento,
            key: TipoDocumento.primaryKeyAttribute,
        },
    },
    genera_guias_certificadas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    i_general_telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    i_general_email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    i_general_ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    i_general_provincia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    i_general_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    i_general_cod_sesa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    i_general_cod_pais: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dim_x: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dim_y: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dim_z: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    excel_plantilla: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    a_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    a_codigo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    a_direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Finca;
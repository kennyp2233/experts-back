import { Model, DataTypes } from "sequelize";
import { SubAgencia,SubAgenciaAtributosCreacion } from "@typesApp/mantenimiento/subagencia.type";
import sequelize from "@db/experts.db";

const SubAgencia = sequelize.define<Model<SubAgencia,SubAgenciaAtributosCreacion>>('subagencias',{
    id_subagencia:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    ci_ruc:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    ciudad:{
        type: DataTypes.STRING
    },
    pais:{
        type: DataTypes.STRING
    },
    provincia:{
        type: DataTypes.STRING
    },
    representante:{
        type: DataTypes.STRING
    },
    comision:{
        type: DataTypes.FLOAT
    },
    estado:{
        type: DataTypes.BOOLEAN
    }
});

export default SubAgencia;
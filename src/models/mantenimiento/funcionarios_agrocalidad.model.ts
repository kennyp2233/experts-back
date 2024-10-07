import { Model, DataTypes } from "sequelize";
import { FuncionarioAgrocalidad, FuncionarioAgrocalidadAtributosCreacion } from "@typesApp/mantenimiento/funcionario_agrocalidad.type";
import sequelize from "@db/experts.db";

const FuncionarioAgrocalidad = sequelize.define<Model<FuncionarioAgrocalidad, FuncionarioAgrocalidadAtributosCreacion>>('funcionarios_agrocalidad', {
    id_funcionario_agrocalidad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default FuncionarioAgrocalidad;
import sequelize from "@db/experts.db";
import { DataTypes, Model } from "sequelize";

type ValoresAgenciaAttributes = {
    id: number;
    nombre: string;
    valor: number;
}

type ValoresAgenciaCreationAttributes = Omit<ValoresAgenciaAttributes, 'id'>;

const ValoresAgencia = sequelize.define<Model<ValoresAgenciaAttributes, ValoresAgenciaCreationAttributes>>('valores_agencia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    valor: {
        type: DataTypes.NUMBER,
    },
});

export default ValoresAgencia;
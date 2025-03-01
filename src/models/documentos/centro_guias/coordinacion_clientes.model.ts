import sequelize from "@db/experts.db";
import DocumentoCoordinacion from "./documento_coordinacion.model";
import Cliente from "@models/mantenimiento/cliente.model";
import { DataTypes, Model } from "sequelize";

type CoordinacionClientesAttributes = {
    id_coordinacion: number;
    id_cliente: number;
}

type CoordinacionClientesCreationAttributes = Omit<CoordinacionClientesAttributes, 'id_coordinacion'>;

const CoordinacionClientes = sequelize.define<Model<CoordinacionClientesAttributes, CoordinacionClientesCreationAttributes>>('coordinacion_clientes', {
    id_coordinacion: {
        type: DataTypes.INTEGER,
        references: {
            model: DocumentoCoordinacion,
            key: 'id',
        },
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: Cliente.primaryKeyAttribute,
        },
    },
}, {
    timestamps: false,
});



export default CoordinacionClientes;
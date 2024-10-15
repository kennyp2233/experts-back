import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@db/experts.db';

export interface DocumentoBaseStockAttributes {
    id: number;
    nombre: string;
}

export interface DocumentoBaseStockCreationAttributes extends Optional<DocumentoBaseStockAttributes, 'id'> { }

const DocumentoBaseStock = sequelize.define<Model<DocumentoBaseStockAttributes, DocumentoBaseStockCreationAttributes>>('documento_base_stock', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
});

export default DocumentoBaseStock;
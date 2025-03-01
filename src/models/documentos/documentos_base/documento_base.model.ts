import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '@db/experts.db';
import Aerolineas from '@models/mantenimiento/aerolinea.model';
import AgenciaIata from '@models/mantenimiento/agencia_iata';
import DocumentoBaseStock from '@models/catalogos/documentos/documento_base_stock';
import GuiaMadre from './guia_madre.model';

export interface DocumentoBaseAttributes {
    id: number;
    fecha: string;
    id_aerolinea: number;
    id_referencia: number;
    id_stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface DocumentoBaseCreationAttributes extends Optional<DocumentoBaseAttributes, 'id' | 'updatedAt' | 'createdAt'> { }

const DocumentoBase = sequelize.define<Model<DocumentoBaseAttributes, DocumentoBaseCreationAttributes>>('documentos_base', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    id_aerolinea: {
        type: DataTypes.INTEGER,
        references: {
            model: Aerolineas,
            key: Aerolineas.primaryKeyAttribute,
        }
    },
    id_referencia: {
        type: DataTypes.INTEGER,
        references: {
            model: AgenciaIata,
            key: AgenciaIata.primaryKeyAttribute,
        }
    },
    id_stock: {
        type: DataTypes.INTEGER,
        references: {
            model: DocumentoBaseStock,
            key: DocumentoBaseStock.primaryKeyAttribute,
        }
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
});


export default DocumentoBase;

DocumentoBase.belongsTo(Aerolineas, { foreignKey: 'id_aerolinea', as: 'aerolinea' });
DocumentoBase.belongsTo(AgenciaIata, { foreignKey: 'id_referencia', as: 'referencia' });
DocumentoBase.belongsTo(DocumentoBaseStock, { foreignKey: 'id_stock', as: 'stock' });
// Relaciona el documento base con las guias madres
DocumentoBase.hasMany(GuiaMadre, { foreignKey: 'id_documento_base', as: 'guias_madre' });
GuiaMadre.belongsTo(DocumentoBase, { foreignKey: 'id_documento_base', as: 'documento_base' });

Aerolineas.hasMany(DocumentoBase, { foreignKey: 'id_aerolinea', as: 'documentos_base' });


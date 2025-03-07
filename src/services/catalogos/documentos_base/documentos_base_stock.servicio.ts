import DocumentoBaseStock from "@models/catalogos/documentos/documento_base_stock";

import { DocumentoBaseStockAttributes, DocumentoBaseStockCreationAttributes } from "@models/catalogos/documentos/documento_base_stock";

import sequelize from "@db/experts.db";

export async function getDocumentosBaseStock(): Promise<DocumentoBaseStockAttributes[]> {
    return DocumentoBaseStock.findAll() as any;
}

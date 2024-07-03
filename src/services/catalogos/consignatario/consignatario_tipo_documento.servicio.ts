import tipoDocumento from "@dbModels/catalogos/consignatario/consignatario_tipo_documento.model";
import { TipoDocumento, TipoDocumentoCreationAttributes } from "@typesApp/entities/catalogos/consignatario/TipoDocumentoTypes";

export async function getTiposDocumento() {
    const tiposDocumentoList = await tipoDocumento.findAll(
        {
            order: [['nombre', 'ASC']] // Ordena por 'codigo_embarque' en orden ascendente
        }
    );
    return tiposDocumentoList.map((tipoDocumento) => tipoDocumento.toJSON()) as TipoDocumento[];
}
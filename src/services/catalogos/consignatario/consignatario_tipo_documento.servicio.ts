import TiposDocumento from "@models/catalogos/consignatario/consignatario_tipo_documento.model";
import { TipoDocumento } from "@typesApp/catalogos/consignatario/tipo_documento.type";

export async function getTiposDocumento() {
    const tiposDocumentoList = await TiposDocumento.findAll(
        {
            order: [['nombre', 'ASC']] // Ordena por 'codigo_embarque' en orden ascendente
        }
    );
    return tiposDocumentoList.map((tipoDocumento) => tipoDocumento.toJSON()) as TipoDocumento[];
}
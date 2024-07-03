export type TipoDocumento = {
    id_tipo_documento: number;
    nombre: string;
}

export type TipoDocumentoCreationAttributes = Omit<TipoDocumento, 'id_tipo_documento'>;
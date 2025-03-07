export type TipoDocumento = {
    id_tipo_documento: number;
    nombre: string;
}

export type TipoDocumentoAtributosCreacion = Omit<TipoDocumento, 'id_tipo_documento'>;
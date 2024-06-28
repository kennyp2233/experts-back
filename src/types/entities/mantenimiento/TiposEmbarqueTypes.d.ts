export type TipoEmbarque = {
    id_tipo_embarque: number;
    codigo_embarque?: string;
    nombre?: string;
    //Cae-sice
    id_tipo_carga?: number;
    id_tipo_embalaje?: number;
    regimen?: string;
    mercancia?: string;
    //eu
    harmonised_comidity?: string;
}

export type TipoEmbarqueCreationAttributes = Omit<TipoEmbarque, 'id_tipo_embarque'>;
export type TipoCarga = {
    id_tipo_carga: number;
    nombre: string;
}

export type TipoCargaAtributosCreacion = Omit<TipoCarga, 'id_tipo_carga'>;
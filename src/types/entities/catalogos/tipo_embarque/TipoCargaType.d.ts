export type TipoCarga = {
    id_tipo_carga: number;
    nombre: string;
}

export type TypoCargaCreationAttributes = Omit<TipoCarga, 'id_tipo_carga'>;
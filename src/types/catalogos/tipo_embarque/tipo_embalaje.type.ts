export type TipoEmbalaje = {
    id_tipo_embalaje: number;
    nombre: string;
}

export type TipoEmbalajeAtributosCreacion = Omit<TipoEmbalaje, 'id_tipo_embalaje'>;
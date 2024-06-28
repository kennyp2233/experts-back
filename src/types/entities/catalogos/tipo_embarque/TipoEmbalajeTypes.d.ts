export type TipoEmbalaje = {
    id_tipo_embalaje: number;
    nombre: string;
}

export type TipoEmbalajeCreationAttributes = Omit<TipoEmbalaje, 'id_tipo_embalaje'>;
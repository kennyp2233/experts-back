export type CatalogoProductosUnidad = {
    id_medida: number;
    nombre: string;
}

export type CatalogoProductosUnidadCreationAttributes = Omit<CatalogoProductosUnidad, 'id_medida'>;
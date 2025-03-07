export type Destino = {
    id_destino: number;
    codigo_destino: string;
    nombre: string;
    aeropuerto?: string;
    id_pais: number;
    sesa_id?: string;
    leyenda_fito?: string;
    cobro_fitos: boolean;
}

export type DestinoAtributosCreacion = Omit<Destino, 'id_destino'>;
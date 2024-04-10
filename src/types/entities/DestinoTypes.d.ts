export type Destino = {
    id_destino: number;
    codigo_destino: string;
    nombre: string;
    aeropuerto?: string;
    pais?: string;
    id_sesa?: string;
    leyenda_fito?: string;
    cobro_fitos?: boolean;
}

export type DestinoCreationAttributes = Omit<Destino, 'id_destino'>;
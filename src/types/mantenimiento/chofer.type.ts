export type Chofer = {
    id_chofer: number;
    nombre_chofer: string;
    ruc_chofer: string;
    placas_camion?: string;
    telefono_chofer?: string;
    camion?: string;
    estado_chofer: boolean;
};

export type ChoferAtributosCreacion = Omit<Chofer, 'id_chofer'>;
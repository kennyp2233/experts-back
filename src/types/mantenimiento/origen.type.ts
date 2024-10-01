export type Origen = {
    id_origen: number;
    codigo_origen: string;
    nombre: string;
    aeropuerto: string;
    id_pais: number;
    id_cae_aduana: number;
}

export type OrigenCreationAttributes = Omit<Origen, 'id_origen'>;

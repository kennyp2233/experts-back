export type Pais = {
    id_pais: number;
    siglas_pais: string;
    nombre: string;
    pais_id?: number | null;
    id_acuerdo?: number | null;
}

export type PaisCreationAttributes = Omit<Pais, 'id_pais'>;
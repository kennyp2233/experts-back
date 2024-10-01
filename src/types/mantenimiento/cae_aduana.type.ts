export type CaeAduana = {
    id_cae_aduana: number;
    codigo_aduana: number;
    nombre: string;
}

export type CaeAduanaAtributosCreacion = Omit<CaeAduana, 'id_cae_aduana'>;
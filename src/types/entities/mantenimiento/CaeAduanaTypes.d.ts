export type CaeAduana = {
    id_cae_aduana: number;
    codigo_aduana: number;
    nombre: string;
}

export type CaeAduanaCreationAttributes = Omit<CaeAduana, 'id_cae_aduana'>;
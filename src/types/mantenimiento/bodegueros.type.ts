export type Bodeguero = {
    id_bodeguero: number;
    nombre: string;
    ci: string;
    clave_bodega: string;
    estado: boolean;
}

export type BodegueroAtributosCreacion = Omit<Bodeguero, 'id_bodeguero'>;
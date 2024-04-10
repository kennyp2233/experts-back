export type Aerolinea = {
    id_aerolinea: number;
    nombre?: string;
    ci_ruc?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    ciudad?: string;
    pais?: string;
    contacto?: string;
    modo?: string;
    maestra_guias_hijas?: boolean;
    codigo?: string;
    prefijo_awb?: string;
    codigo_cae?: string;
    estado_activo?: boolean;
    from1?: number;
    to1?: number;
    by1?: number;
    to2?: number;
    by2?: number;
    to3?: number;
    by3?: number;
}

export type AerolineaCreationAttributes = Omit<Aerolinea, 'id_aerolinea'>;

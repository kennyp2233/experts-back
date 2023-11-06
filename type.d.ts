
export interface AerolineaAttributesI {
    id_aerolinea: number;
    alias: string;
    nombre: string;
    ci_ruc: string;
    direccion: string;
    telefono: string;
    email: string;
    ciudad: string;
    pais: string;
    contacto: string;
    modo: string;
    maestra_guias_hijas: boolean;
    codigo: string;
    prefijo_awb: string;
    codigo_cae: string;
    estado_activo: boolean;
}

export interface AerolineaCreationAttributesI extends Optional<AerolineaAttributesI, "id_aerolinea"> { }


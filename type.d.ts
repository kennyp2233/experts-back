import exp from "constants";

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



export interface OrigenesAttributes {
    id_origenes: number;
    nombre: string;
    id_pais: number;
    id_aduana: number;
}

export interface OrigenesCreationAttributes extends Optional<OrigenesAttributes, "id_origenes"> { }
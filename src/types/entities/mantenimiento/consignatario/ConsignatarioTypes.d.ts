export type Consignatario = {
    id_consignatario: number;
    nombre: string;
    ruc?: string;
    direccion?: string;
    id_embarcador: number;
    id_cliente: number;
    telefono?: string;
    email?: string;
    ciudad?: string;
    pais?: string;
}

export type ConsignatarioCreationAttributes = Omit<Consignatario, 'id_consignatario'>;

export type ConsignatarioCaeSice = {
    id_consignatario: number;
    consignee_nombre?: string;
    consignee_direccion?: string;
    consignee_ciudad?: string;
    consignee_provincia?: string;
    consignee_pais?: string;
    notify_nombre?: string;
    notify_direccion?: string;
    notify_ciudad?: string;
    notify_provincia?: string;
    notify_pais?: string;
    hawb_nombre?: string;
    hawb_direccion?: string;
    hawb_ciudad?: string;
    hawb_provincia?: string;
    hawb_pais?: string;
}

export type ConsignatarioFacturacion = {
    id_consignatario: number;
    nombre?: string;
    ruc?: string;
    direccion?: string;
}

export type ConsignatarioFito = {
    id_consignatario: number;
    fito_declared_name?: string;
    fito_forma_a?: string;
    fito_nombre?: string;
    fito_direccion?: string;
    fito_pais?: string;
}

export type ConsignatarioGuiaH = {
    id_consignatario: number;
    guia_h_consignee?: string;
    guia_h_name_adress?: string;
    guia_h_notify?: string;
}

export type ConsignatarioGuiaM = {
    id_consignatario: number;
    id_destino?: number;
    guia_m_consignee?: string;
    guia_m_name_address?: string;
    guia_m_notify?: string;
}

export type ConsignatarioTransmision = {
    id_consignatario: number;
    consignee_nombre?: string;
    consignee_direccion?: string;
    consignee_ciudad?: string;
    consignee_provincia?: string;
    consignee_pais?: string;
    consignee_eueori?: string;
    notify_nombre?: string;
    notify_direccion?: string;
    notify_ciudad?: string;
    notify_provincia?: string;
    notify_pais?: string;
    notify_eueori?: string;
    hawb_nombre?: string;
    hawb_direccion?: string;
    hawb_ciudad?: string;
    hawb_provincia?: string;
    hawb_pais?: string;
    hawb_eueori?: string;
}

